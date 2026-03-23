const strip = require("stripe");
require("dotenv").config();
const Stripe = new strip(process.env.STRIPKEY);
module.exports = Stripe;