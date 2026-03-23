// server.js
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

require("dotenv").config();
require("./db/db");

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use(
  cors({
    origin: process.env.CLIENT_URL || true,
    credentials: true,
  })
);

// ---------------- API ROUTES ----------------
const Analytics = require("./router/anlytics");
const Cart = require("./router/cart");
const Coupon = require("./router/cupon");
const Payment = require("./router/payment");
const Product = require("./router/product");
const User = require("./router/user");
const Order = require("./router/order");
const Subscribe = require("./router/subscribe");
const Category = require("./router/category");
const Testimonials = require("./router/testimonials");

// Register API routes
app.use("/api/subscribe", Subscribe);
app.use("/api/auth", User);
app.use("/api/anlytics", Analytics);
app.use("/api/cart", Cart);
app.use("/api/cupon", Coupon);
app.use("/api/payment", Payment);
app.use("/api/product", Product);
app.use("/api/order", Order);
app.use("/api/category", Category);
app.use("/api/testimonials", Testimonials);

// ---------------- SERVE REACT FRONTEND ----------------
const __dirnameResolved = path.resolve();
app.use(express.static(path.join(__dirnameResolved, "client", "dist")));

// SPA fallback for React Router
app.use((req, res) => {
  res.sendFile(path.join(__dirnameResolved, "client", "dist", "index.html"));
});

// ---------------- START SERVER ----------------
const PORT = process.env.PORT || 9000;
console.log(PORT);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});