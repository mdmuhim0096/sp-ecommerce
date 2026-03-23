const route = require("express").Router();
const Product = require("../schemas/product");
const User = require("../schemas/user");
const { protectedRoute, isAdmin } = require("../middleware/auth");

// ✅ Add product to cart
route.post("/addtocart", protectedRoute, async (req, res) => {
    try {
        const { productId } = req.body;
        const user = req.user;

        let existingItem = user?.items?.find(item => item?.product?.toString() === productId?.toString());

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            const p = await Product.findById(productId);
            user.items.push({ product: productId, quantity: 1, price: p.price });
        }

        await user.save();
        res.json(user.items);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error in add to cart route" });
    }
});


// ✅ Remove product(s) from cart
route.post("/removingfromcart", protectedRoute, async (req, res) => {
    try {
        const { productId } = req.body;
        const user = req.user;

        if (!productId) {
            user.items = []; // clear all
        } else {
            user.items = user.items.filter(item => item?.product?.toString() !== productId?.toString());
        }

        await user.save();
        res.json(user.items);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error in removing from cart route" });
    }
});


// ✅ Update product quantity
route.put("/updatequantity", protectedRoute, async (req, res) => {
    try {
        const { quantity, productId, type } = req.body;

        const user = req.user;

        let existingItem = user?.items?.find(item => item?.product?.toString() === productId?.toString());

        if (!existingItem) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        if (quantity === 1 && type === "decreament") {
            user.items = user.items.filter(item => item?.product?.toString() !== productId?.toString());
        } else {
            if (type === "increament") {
                existingItem.quantity = quantity + 1;
            } else {
                existingItem.quantity = quantity - 1;
            }
        }

        await user.save();
        res.json(user.items);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error in update quantity route" });
    }
});


// ✅ Fetch all cart products
route.get("/getAllProduct", protectedRoute, async (req, res) => {
    try {
        const items = req.user?.items || [];
        const itemIds = items.map(item => item.product);

        const products = await Product.find({ _id: { $in: itemIds } });

        const cartItems = products.map(product => {
            const item = items.find(i => i.product.toString() === product._id.toString());
            return {
                ...product.toJSON(),
                quantity: item?.quantity || 0,
            };
        });

        res.json(cartItems);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error in getcartproduct route" });
    }
});


// ✅ Clear user items after order success
route.delete("/cleanuseritems", protectedRoute, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        user.items = [];
        const response = await user.save();

        res.status(200).json({ message: "User items cleared successfully", items: response.items });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error in cleanuseritems route" });
    }
});

module.exports = route;
