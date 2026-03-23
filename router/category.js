const Category = require("../schemas/category");
const route = require("express").Router();
const uploadToCloudinary = require("../middleware/cloudinaryUploader");
const upload = require("../db/multer");

route.post("/create", upload.single("image"), async (req, res) => {
    try {

        const { name } = req.body;
        let cloudinaryResponse = null;
        if (req.file) {
            cloudinaryResponse = await uploadToCloudinary(req.file.buffer);
        }
        const image = cloudinaryResponse?.secure_url || "";
        const newCategory = new Category({ name, image });
        await newCategory.save();
        const allCategory = await Category.find();
        res.status(201).json({ message: "category created successfully", category: allCategory });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error in category router" });
    }
});

route.get("/get", async (req, res) => {
    try {
        const categorys = await Category.find();
        res.status(200).json(categorys);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error in category router" });
    }
});

route.put("/update", async (req, res) => {
    
})

module.exports = route;