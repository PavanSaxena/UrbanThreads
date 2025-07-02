import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// GET /api/products - Get product listing
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching products",
    });
  }
});

// POST /api/products - Create new product
router.post("/", async (req, res) => {
  const {
    productId,
    name,
    price,
    originalPrice,
    image,
    rating,
    reviews,
    category,
    isOnSale,
    sizes,
    colors,
  } = req.body;
  try {
    // Validate required fields
    if (typeof productId !== "number" || !name || typeof price !== "number") {
      return res.status(400).json({
        success: false,
        message: "productId (number), name, and price (number) are required",
      });
    }

    // Check if product already exists
    const existingProduct = await Product.findOne({ productId });
    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: "Product with this productId already exists",
      });
    }

    // Create new product
    const newProduct = new Product({
      productId,
      name,
      price,
      originalPrice,
      image,
      rating,
      reviews,
      category,
      isOnSale,
      sizes,
      colors,
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating product",
    });
  }
});

export default router;
