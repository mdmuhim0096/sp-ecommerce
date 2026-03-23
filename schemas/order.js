const mongoose = require("mongoose");

const Order = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },

    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product",
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            price: {
                type: Number,
                required: true,
                min: 0
            },
            name: {
                type: String,
                required: true
            },
            image: {
                type: String,
                default: null,
                required: true
            }
        }
    ],

    totalAmount: {
        type: Number, required: true, min: 0
    },

    stripeSessionId: {
        type: String,
        unique: true,
        sparse: true
    },

    address: {
        street: String,
        city: String,
        home: String,
        phone: String,
        house: String
    },

    status: {
        type: String,
        enum: ["pending", "shipping", "deliverd", "cancel"],
        default: "pending"
    },

    image: {
        type: String
    },
    
    isApproved: {
        type: Boolean,
        default: false
    },

    isRejected: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

module.exports = mongoose.model("order", Order);