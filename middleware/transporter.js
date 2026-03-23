require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // ✅ correct
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email connection Failed:", error.message);
  } else {
    console.log("✅ Email connected and ready to send emails");
  }
});

module.exports = transporter;