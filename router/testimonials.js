const route = require("express").Router();
const Testimonials = require("../schemas/testimonials");
const { protectedRoute } = require("../middleware/auth");

route.get("/", protectedRoute, async (req, res) => {
    try {
        const testimonials = await Testimonials.find().populate("user");
        if (!testimonials) return res.status(404).json({ message: "not found" });
        res.json(testimonials);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error in testimonials router" });
    }
});

module.exports = route;