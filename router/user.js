const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../schemas/user");
const route = require("express").Router();
const { protectedRoute } = require("../middleware/auth");
const upload = require("../db/multer");
const uploadToCloudinary = require("../middleware/cloudinaryUploader");
const fileDeleter = require("../middleware/filedeleter");

// ✅ Generate Tokens
function generateToken(userId) {
    const accessToken = jwt.sign({ userId }, process.env.JWT, { expiresIn: "100m" });
    const refreshToken = jwt.sign({ userId }, process.env.RJWT, { expiresIn: "100d" });
    return { accessToken, refreshToken };
}

async function storeRefreshToken(userId, refreshToken) {
    // Store for 100 days (same as JWT)
    await User.findByIdAndUpdate(userId, { refreshToken }, { new: true });
}

// ✅ Set Cookies
function setCookies(res, accessToken, refreshToken) {
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    };

    res.cookie("accessToken", accessToken, {
        ...options,
        maxAge: 100 * 60 * 1000, // 15 minutes
    });

    res.cookie("refreshToken", refreshToken, {
        ...options,
        maxAge: 100 * 24 * 60 * 60 * 1000, // 100 days
    });
}

// 🧩 Signup Route
route.post("/signup", upload.single("image"), async (req, res) => {
    try {
        const { email, name, password, gender } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        let cloudinaryResponse = null;
        if (req.file) {
            cloudinaryResponse = await uploadToCloudinary(req.file.buffer, "profile");
        }

        const image = cloudinaryResponse?.secure_url || "";
        const newUser = new User({ email, name, password, gender, image });
        const user = await newUser.save();
        const { accessToken, refreshToken } = generateToken(user._id);
        await storeRefreshToken(user._id, refreshToken);
        setCookies(res, accessToken, refreshToken);

        res.status(201).json({
            message: "User created successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                image: user.image,
                role: user.role,
                token: accessToken
            },
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in signup route" });
    }
});

// 🔐 Login Route
route.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const { accessToken, refreshToken } = generateToken(user._id);
        await storeRefreshToken(user._id, refreshToken);
        setCookies(res, accessToken, refreshToken);

        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                email: user.email,
                name: user.name,
                isAdmin: user.isAdmin,
                token: accessToken,
            },
        });
    } catch (error) {
        console.error("Login Error:", error.message);
        res.status(500).json({ message: "no internet or server error" });
    }
});

// 🚪 Logout Route
route.post("/logout", async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ message: "unauthorized missing access-token" });
        }

        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");

        res.json({ message: "Logout successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in logout route" });
    }
});

// 🔁 Refresh Token Route
route.post("/refreshtoken", async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if (!token) {
            return res.status(404).json({ message: "No refresh token provided" });
        }

        const decoded = jwt.verify(token, process.env.RJWT);
        const isUser = await User.findById(decoded?.userId);

        if (!isUser) {
            return res.status(404).json({ message: "user not found" });
        }
        const storedToken = isUser.refreshToken;

        if (storedToken !== token) {
            return res.status(401).json({ message: "Refresh token mismatch" });
        }

        const accessToken = jwt.sign(
            { userId: decoded.userId },
            process.env.JWT,
            { expiresIn: "15m" }
        );

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 15 * 60 * 1000,
        });

        res.status(200).json({ message: "Access token refreshed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in refresh token route" });
    }
});

// 👤 User Profile (Protected)
route.get("/", protectedRoute, async (req, res) => {
    try {
        res.json(req.user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in user profile route" });
    }
});

route.put("/update_address", protectedRoute, async (req, res) => {
    try {
        const user = req.user?._id;
        const data = req.body;
        const _user_ = await User.findById(user);

        if (!_user_) return res.status(404).json({ message: "user not found" });
        if (data?.street) _user_.address.street = data.street;
        if (data?.city) _user_.address.city = data.city;
        if (data?.home) _user_.address.home = data.home;
        if (data?.phone) _user_.address.phone = data.phone;
        if (data?.house) _user_.address.house = data.house;
        
        const ___user___ = await _user_.save();
        res.status(200).json(___user___);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in update address route" });
    }
});


route.put("/update_profile", protectedRoute, upload.single("image"), async (req, res) => {
    try {
        const user = req.user;
        const data = req.body;

        let cloudinaryResponse = null;
        const file = req.file;

        if (file) {
            fileDeleter(user?.image);
            cloudinaryResponse = await uploadToCloudinary(file.buffer, "profile");
        }

        // EMAIL VALIDATION
        if (data?.email) {
            if (data.email !== user.email) {
                return res.status(401).json({ message: "Old email is incorrect" });
            }
        }

        // PASSWORD VALIDATION
        let password = user?.password;
        if (data?.oldPassword && data?.password) {
            const isMatch = await bcrypt.compare(data.oldPassword, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Old password is incorrect" });
            }
            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(data.password, salt);
        }

        const newData = {
            image: file ? cloudinaryResponse?.secure_url : user?.image,
            password,
            name: data?.name || user?.name,
            email: data?.email || user?.email,
        };

        const updatedUser = await User.findByIdAndUpdate(user._id, newData, { new: true });
        res.status(200).json(updatedUser);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in update profile route" });
    }
});

module.exports = route;
