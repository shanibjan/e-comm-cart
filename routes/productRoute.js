import express from "express";
import Product from "../models/Product.js";
import upload from "../uploads/uploads.js";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";

const router = express.Router();

router.post("/add-product", upload.single("image"), async (req, res) => {
  try {
    const { name, stock, price } = req.body;
    if (!name || !stock || !price || !req.file) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newProduct = new Product({
      name,
      stock,
      imageUrl: req.file.path,
      price,
    });

    await newProduct.save();
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Add Product Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/get-products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Fetch Products Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/add-to-cart", async (req, res) => {
  try {
    const { product, quantity } = req.body;
    if (!product || !quantity) {
      return res
        .status(400)
        .json({ error: "Product and quantity are required" });
    }

    let existingCartItem = await Cart.findOne({ product });

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
      return res.status(200).json({
        success: true,
        message: "Cart updated",
        cart: existingCartItem,
      });
    }

    const cartItem = new Cart({ product, quantity });
    await cartItem.save();

    res.status(201).json({
      success: true,
      message: "Product added to cart",
      cart: cartItem,
    });
  } catch (error) {
    console.error("Add to Cart Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/get-cart", async (req, res) => {
  try {
    const cart = await Cart.find().populate("product");
    res.status(200).json(cart);
  } catch (error) {
    console.error("Fetch Cart Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/update-cart/:id", async (req, res) => {
  try {
    const updatedItem = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    res.status(200).json({
      success: true,
      message: "Cart updated",
      cart: updatedItem,
    });
  } catch (error) {
    console.error("Update Cart Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/delete-cart/:id", async (req, res) => {
  try {
    const deletedItem = await Cart.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    res.json({ success: true, message: "Cart item removed" });
  } catch (error) {
    console.error("Delete Cart Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/create-order", async (req, res) => {
  try {
    const { products, bill } = req.body;
    if (!products || products.length === 0 || !bill) {
      return res.status(400).json({ error: "Invalid order details" });
    }

    for (const item of products) {
      const product = await Product.findById(item._id);

      if (!product) {
        return res
          .status(404)
          .json({ error: `Product not found: ${item._id}` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          error: `Insufficient stock for ${product.name}`,
        });
      }

      product.stock -= item.quantity;
      await product.save();
    }

    const order = new Order({ products, bill });
    await order.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/user-orders", async (req, res) => {
  try {
    const orders = await Order.find().populate("products");
    res.status(200).json(orders);
  } catch (error) {
    console.error("Fetch Orders Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
