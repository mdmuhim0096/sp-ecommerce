const route = require("express").Router();
const Order = require("../schemas/order");
const { protectedRoute, isAdmin } = require("../middleware/auth");
const { approvedOrder, rejectedOrder } = require("../middleware/mailSender");

route.get("/", protectedRoute, isAdmin, async (req, res) => {
    try {
        res.json(await Order.find().populate("products.product").sort({ createdAt: -1 }));
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error in get order router" })
    }
});

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

route.delete("/:id", protectedRoute, isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        await Order.findByIdAndDelete(id);
        res.json({ message: "order deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error in get order router" });
    }
});

route.put("/approved/:id", protectedRoute, isAdmin, async (req, res) => {
    try {
        const orderId = req.params.id;
        const actualOrder = await Order.findByIdAndUpdate(orderId, { status: "shipping", isApproved: true }, { new: true }).populate("user");

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
        await rejectedOrder(actualOrder.user);
        res.json(actualOrder);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error in approved router" });
    }
});

route.put("/isdeliverd/:id", protectedRoute, async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findByIdAndUpdate(orderId, { status: "deliverd" }, { new: true }).populate("user");
        res.json(order);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error in approved router" });
    }
});


module.exports = route;