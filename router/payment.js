"use strict";

const route = require("express").Router();
const Order = require("../schemas/order");
const Cupon = require("../schemas/cupon");
const Stripe = require("../db/stripe");
const { protectedRoute } = require("../middleware/auth");
const { sendOrderEmail } = require("../middleware/mailSender");
const { clientUrl } = require("../helper/utils");

route.post("/createCheckoutSession", protectedRoute, async (req, res) => {
    try {
        const { products, cuponCode, address } = req.body;
        
        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: "Invalid or empty product array" });
        }

        let totalAmount = 0;

        const line_items = products.map(product => {
            const amount = Math.round(product.price * 100);
            totalAmount += amount * (product.quantity || 1);

            return {
                price_data: {
                    currency: "usd",
                    unit_amount: amount,
                    product_data: {
                        name: product.name,
                        images: product.image ? [product.image] : []
                    }
                },
                quantity: product.quantity || 1
            };
        });

        // 🔹 Validate coupon
        let discounts = [];
        let cupon = null;

        if (cuponCode) {
            cupon = await Cupon.findOne({
                code: cuponCode,
                userId: req.user._id,
                isActive: true
            });

            if (cupon) {
                const stripeCouponId = await createStripeCoupon(cupon.discountPercentage);
                discounts = [{ coupon: stripeCouponId }];
            }
        }

        // 🔹 CREATE ORDER FIRST (IMPORTANT)
        const order = await Order.create({
            user: req.user._id,
            products: products.map(p => ({
                product: p._id,
                quantity: p.quantity,
                price: p.price,
                name: p.name,
                image: p.image || null
            })),
            totalAmount: totalAmount / 100,
            address,
        });

        const session = await Stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items,
            discounts,
            success_url: `${clientUrl}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${clientUrl}/purchase-cancel`,
            metadata: {
                orderId: order._id.toString()
            }
        });

        order.stripeSessionId = session.id;
        await order.save();

        if (totalAmount / 100 >= 200) {
            await createOrUpdateCupon(req.user._id);
        }

        res.status(200).json({
            url: session.url,
            totalAmount: totalAmount / 100
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in createCheckoutSession route" });
    }
});

route.post("/checkoutSuccess", protectedRoute, async (req, res) => {
    try {

        const { sessionId } = req.body;
        if (!sessionId) {
            return res.status(400).json({ message: "Missing sessionId" });
        }

        const session = await Stripe.checkout.sessions.retrieve(sessionId);
        if (session.payment_status !== "paid") {
            return res.status(400).json({ message: "Payment not completed" });
        }

        const orderId = session.metadata.orderId;

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (order.paymentStatus === "paid") {
            return res.json({ success: true, orderId: order._id });
        }

        if (order.cuponCode) {
            await Cupon.findOneAndUpdate(
                { code: order.cuponCode, userId: order.user },
                { isActive: false }
            );
        }

        const user = await Order.findById(orderId).populate("user");

        order.paymentStatus = "paid";
        order.paymentIntentId = session.payment_intent;
        await order.save();


        await sendOrderEmail(user.products, user.user.name, session.customer_details.email, order._id);

        res.json({
            success: true,
            message: "Payment successful",
            orderId: order._id
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in checkoutSuccess route" });
    }
});


async function createStripeCoupon(discountPercentage) { const coupon = await Stripe.coupons.create({ percent_off: discountPercentage, duration: "once", }); return coupon.id; }

async function createOrUpdateCupon(userId) {
    const code = "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(); const discountPercentage = Math.floor(Math.random() * (40 - 10) + 10); const expirationDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
    const cupon = await Cupon.findOneAndUpdate({ userId }, { code, discountPercentage, expirationDate, isActive: true }, { new: true, upsert: true }); return cupon;
}


module.exports = route;