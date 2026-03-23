const mongoose = require("mongoose");

const subscriberSchema = new mongoose.Schema({
    emails: { type: String, required: true },
    subscribedAt: { type: Date, default: Date.now }
})

const Subscriber = mongoose.model("Subscriber", subscriberSchema);
module.exports = Subscriber;