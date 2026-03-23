// const User = require("../schemas/user");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// const protectedRoute = async (req, res, next) => {
//     const accessToken = req.cookies.accessToken;
//     if (!accessToken) {
//         return res.status(401).json({ message: "Unauthorized - Access token expired" });
//     }
//     try {
//         const decode = jwt.verify(accessToken, process.env.JWT);
//         const user = await User.findById(decode.userId);
//         if (!user) {
//             return res.status(401).json({ message: "user not found" });
//         }
//         req.user = user;
//         next();
//     } catch (error) {
//         if (error.name === "TokenExpiredError") {
//             return res.status(401).jos({ message: "Unauthorized - Access token expired" })
//         }
//     }
// };

// const isAdmin = async (req, res, next) => {
//     try {
//         if (req.user && req.user?.isAdmin === true) {
//             next();
//         } else {
//             return;
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "error in isAdmin router" })
//     }
// };

// module.exports = { protectedRoute, isAdmin };



const User = require("../schemas/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const protectedRoute = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        return res.status(401).json({ message: "Unauthorized - No access token" });
    }
    try {
        const decode = jwt.verify(accessToken, process.env.JWT);
        const user = await User.findById(decode.userId);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        req.user = user;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            // ✅ Fixed: was ".jos()" (typo) — now correctly ".json()"
            return res.status(401).json({ message: "Unauthorized - Access token expired" });
        }
        return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
};

const isAdmin = async (req, res, next) => {
    try {
        if (req.user && req.user?.isAdmin === true) {
            next();
        } else {
            // ✅ Fixed: was "return;" with no response — request would hang forever
            return res.status(403).json({ message: "Forbidden - Admins only" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error in isAdmin middleware" });
    }
};

module.exports = { protectedRoute, isAdmin };