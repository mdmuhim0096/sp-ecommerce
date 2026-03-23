const Cupon = require("../schemas/cupon");
const { protectedRoute } = require("../middleware/auth");
const route = require("express").Router();

// ✅ Fetch active coupon for a user
route.get("/getcupon", protectedRoute, async (req, res) => {
    try {
        const cupon = await Cupon.findOne({ userId: req.user._id, isActive: true });

        if (!cupon) {
            return res.status(404).json({ message: "No active coupon found" });
        }

        // auto-deactivate if expired
        if (cupon.expirationDate < new Date()) {
            cupon.isActive = false;
            await cupon.save();
            return res.status(410).json({ message: "Coupon has expired" });
        }

        res.json(cupon);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error in get coupon route" });
    }
});


// ✅ Validate a coupon code
route.post("/validatecupon", protectedRoute, async (req, res) => {
    try {
        const { code } = req.body;
        if (!code) {
            return res.status(400).json({ message: "Coupon code is required" });
        }

        const cupon = await Cupon.findOne({
            userId: req.user._id,
            code,
            isActive: true,
        });

        if (!cupon) {
            return res.status(404).json({ message: "Coupon not found or inactive" });
        }

        if (cupon.expirationDate < new Date()) {
            cupon.isActive = false;
            await cupon.save();
            return res.status(410).json({ message: "Coupon has expired" });
        }

        res.json({
            message: "Coupon is valid",
            code: cupon.code,
            discountPercentage: cupon.discountPercentage,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error in coupon validation route" });
    }
});

module.exports = route;
