const Subscriber = require("../schemas/subscriber");
const { sendSubscritionEmail } = require("../middleware/mailSender");
const { protectedRoute } = require("../middleware/auth");

const route = require("express").Router();

route.post("/", protectedRoute, async (req, res) => {
    try {
        const { email } = req.body;
        const userName = req.user.name;
        const existingSubscriber = await Subscriber.findOne({ emails: email });
        if (existingSubscriber) {
            return res.status(400).json({ message: "Email already subscribed" });
        }
        const subscriber = await Subscriber.create({ emails: email });
        await sendSubscritionEmail(userName, email);
        res.status(201).json({ message: "Subscribed successfully", subscriber });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error subscribing user" });
    }
})

module.exports = route;