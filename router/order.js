const route = require("express").Router();
const Order = require("../schemas/order");
const { protectedRoute, isAdmin } = require("../middleware/auth");
const { approvedOrder, rejectedOrder } = require("../middleware/mailSender");
const User = require("../schemas/user");

route.get("/", protectedRoute, isAdmin, async (req, res) => {
    try {
        res.json(await Order.find().populate("products.product").sort({ createdAt: -1 }));
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error in get order router" })
    }
});

route.get("/orderByUser", protectedRoute, async (req, res) => {
    try {
        const user = req.user;
        const order = await Order.findById(user?.orderId);
        if (!order) return res.status(404).json({ message: "order not found" });
        console.log(order, "---- after process ----");
        res.json(order);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error in get order router" })
    }
})

route.get("/counter", protectedRoute, isAdmin, async (req, res) => {
    try {
        res.json(await Order.countDocuments());
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error in get order router" });
    }
});

route.get("/getOrderById/:id", protectedRoute, async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId).populate("user");
        if (!order) return res.status(404).josn({ message: "order not found" });
        res.status(200).json(order);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error in get order by id router" });
    }
});

route.delete("/:id", protectedRoute, async (req, res) => {
    try {
        const { id } = req.params;
        console.log("i am here", id)
        const order = await Order.findByIdAndDelete(id)
        await User.findByIdAndUpdate(order.user, { orderId: null }, { new: true });
        res.json({ message: "order deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error in get order router" });
    }
});

route.put("/approved/:id", protectedRoute, isAdmin, async (req, res) => {
    try {
        const orderId = req.params.id;
        const actualOrder = await Order.findByIdAndUpdate(orderId, { status: "shipping", isApproved: true, isRejected: false }, { new: true }).populate("user");
        await User.findByIdAndUpdate(actualOrder.user, { orderId: actualOrder._id }, { new: true })
        await approvedOrder({ name: actualOrder.user?.name, address: actualOrder.address, email: actualOrder.user?.email, orderId });
        res.json(actualOrder);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error in approved router" });
    }
});

route.put("/reject/:id", protectedRoute, isAdmin, async (req, res) => {
    try {
        const orderId = req.params.id;
        const actualOrder = await Order.findByIdAndUpdate(orderId, { status: "cancel", isApproved: false, isRejected: true }, { new: true }).populate("user");
        await User.findByIdAndUpdate(actualOrder.user, { orderId: null }, { new: true });
        await rejectedOrder(actualOrder.user);
        res.json(actualOrder);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error in approved router" });
    }
});

route.put("/isdeliverd/:id", protectedRoute, async (req, res) => {
    try {
        const user = req.user?._id;
        const orderId = req.params.id;
        const order = await Order.findByIdAndUpdate(orderId, { status: "delivered" }, { new: true }).populate("user");
        await User.findByIdAndUpdate(user, { orderId: null }, { new: true });
        res.json(order);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error in approved router" });
    }
});


module.exports = route;