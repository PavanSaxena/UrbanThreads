import express from "express";
import Product from "../models/Product.js"; // Adjust the path as necessary
import mongoose from "mongoose";

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

router.post("/", async (req, res) => {
  const {
    productId,
    name,
    description,
    category,
    images,
    price,
    stock,
    brand,
  } = req.body;
  try {
    // Validate required fields
    if (!productId || !name || !price) {
      return res.status(400).json({
        success: false,
        message: "Product ID, name, and price are required",
      });
    }

    // Check if product already exists
    const existingProduct = await Product.findOne({ productId });
    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: "Product with this ID already exists",
      });
    }

    // Create new product
    const newProduct = new Product({
      productId,
      name,
      description,
      category,
      images,
      price,
      stock,
      brand,
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
