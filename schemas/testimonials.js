const mongoose = require("mongoose");

const testimonials = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },

    feedbackText: {
        type: String,
    },

    productName: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true });

const testimonialsModel = mongoose.model("testimonials", testimonials);

module.exports = testimonialsModel;