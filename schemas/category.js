const mongoose = require("mongoose");

const category = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    }
});

const categoryModel = mongoose.model("category", category);
module.exports = categoryModel;