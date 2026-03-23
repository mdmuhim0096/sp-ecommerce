const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String
    },
    gender: {
      type: String,
      enum: ["female", "male"]
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 3,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    address: {
      street: String,
      city: String,
      home: String,
      phone: Number,
      house: Number,
    },
    items: [
      {
        quantity: {
          type: Number,
          default: 1,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
        },
        price: {
          type: Number,
          default: 0
        }
      },
    ],
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);


User.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("user", User);
