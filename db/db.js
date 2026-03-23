const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.DB).catch(err => { console.error(err); process.exit(1); });
const db = mongoose.connection;
db.on("connected", () => console.log("✅ MongoDB connected"));
module.exports = db;