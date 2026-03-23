const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
            min: 0
        },

        image: {
            type: String,
            default: ""
        },

        category: {
            type: String,
            required: true
        },

        isFeatured: {
            type: Boolean,
            default: false
        },

        averageRating: {
            type: Number,
            default: 0
        },

        totalRatings: {
            type: Number,
            default: 0
        },

        comments: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "user",
                    required: true
                },

                text: {
                    type: String
                },
                rating: {
                    type: Number,
                    min: 1,
                    max: 5,
                    required: true
                },

                createdAt: {
                    type: Date,
                    default: Date.now
                }
            }
        ]
    },
    { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);