const Product = require("../schemas/product");
const route = require("express").Router();
const cloudinary = require("../db/cloudinary");
const { isAdmin, protectedRoute } = require("../middleware/auth");
const upload = require("../db/multer");
const uploadToCloudinary = require("../middleware/cloudinaryUploader");
const Testimonials = require("../schemas/testimonials");
const Subscribers = require("../schemas/subscriber");
const { sendProductCreateEmail } = require("../middleware/mailSender");

route.post("/create", protectedRoute, isAdmin, upload.single("image"), async (req, res) => {
    try {

        const { name, description, category, price } = req.body;

        let cloudinaryResponse = null;
        if (req.file) {
            cloudinaryResponse = await uploadToCloudinary(req.file.buffer);
        }

        const image = cloudinaryResponse?.secure_url || "";

        const newProduct = new Product({ name, description, category, price, image });
        const response = await newProduct.save();
        const __emails__ = await Subscribers.find();
        const emails = [];

        __emails__.forEach(data => {
            emails.push(data.emails);
        });

        sendProductCreateEmail({ product: { name: response.name, image: response.image, _id: response._id }, emails });
        res.status(201).json({ message: "Product created successfully", response });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in create product route" });
    }
});

// 🗑️ Delete Product
route.delete("/delete/:id", protectedRoute, isAdmin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        try {
            const match = product.image.match(/products\/([^/.]+)/);
            const publicId = match ? match[1] : null;
            if (publicId) await cloudinary.uploader.destroy(`products/${publicId}`);
        } catch (err) {
            console.error("Error deleting image from Cloudinary:", err.message);
        }

        await Product.findByIdAndDelete(product._id);
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in delete product route" });
    }
});

// 📦 Get All Products
route.get("/allproduct", async (req, res) => {
    try {
        const products = await Product.find().lean();
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in get all products route" });
    }
});

route.get("/featured_products", async (req, res) => {
    try {
        const featuredProducts = await Product.find({ isFeatured: true }).lean();

        if (!featuredProducts || featuredProducts.length === 0) {
            return res.status(404).json({ message: "No featured products found" });
        };

        res.json(featuredProducts);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in featured_products route" });
    }
});

// 🎯 Recommended Products (random 3) //
route.get("/recommendedproducts", async (req, res) => {
    try {
        const products = await Product.aggregate([
            { $sample: { size: 3 } },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    image: 1,
                    price: 1
                }
            }
        ]);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in recommended products route" });
    }
});

// 🏷️ Get Products by Category
route.get("/getproductbycategory/:category", protectedRoute, async (req, res) => {
    try {
        const category = req.params.category.toLowerCase();

        const products = await Product.find({
            category: { $regex: `^${category}$`, $options: "i" }
        })
            .populate("comments.user")
            .lean();

        if (!products.length) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.json(products);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in getproductbycategory route" });
    }
});

// ⭐ Toggle Featured Product
route.put("/isFeatured/:id", protectedRoute, isAdmin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        product.isFeatured = !product.isFeatured;
        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in isFeatured route" });
    }
});

route.put("/rating", protectedRoute, async (req, res) => {
    try {
        const { id, rating } = req.body;

        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 1 and 5" });
        }

        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        const totalRatings = product.totalRatings || 0;
        const currentAvg = product.averageRating || 0;

        product.averageRating = ((currentAvg * totalRatings) + rating) / (totalRatings + 1);
        product.totalRatings = totalRatings + 1;

        await product.save();

        res.status(200).json({
            message: "Thanks for your feedback",
            averageRating: product.averageRating,
            totalRatings: product.totalRatings
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in rating route" });
    }
});

route.put("/review", protectedRoute, async (req, res) => {
    try {
        const { id, text, rating } = req.body;
        const user = req.user._id;

        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 1 and 5" });
        }

        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        product.comments.push({ user, text, rating });

        const totalRatings = product.totalRatings || 0;
        const currentAvg = product.averageRating || 0;

        product.averageRating = ((currentAvg * totalRatings) + rating) / (totalRatings + 1);
        product.totalRatings = totalRatings + 1;
        const newTestimonial = new Testimonials({ user, feedbackText: text, productName: product.name, rating })
        await product.save();
        await newTestimonial.save();

        res.status(200).json({
            message: "Review submitted successfully",
            averageRating: product.averageRating,
            totalRatings: product.totalRatings,
            comments: product.comments
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in review route" });
    }
});


// 🏷️ Get Products by id
route.get("/getproductbyid/:id", protectedRoute, async (req, res) => {
    try {
        const products = await Product.findById(req.params.id).populate("comments.user").lean();
        console.log(products);
        if (products.length === 0) return res.status(404).json({ message: "id not found" });
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in getproductbycategory route" });
    }
});

module.exports = route;
