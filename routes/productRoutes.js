const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

// Add a new product
router.post("/add", async (req, res) => {
  console.log("Received request to add a product"); // Log when the route is hit
  try {
    console.log("Request body:", req.body); // Log the incoming request body

    // Validate incoming data
    if (
      !req.body.nfcId ||
      !req.body.name ||
      !req.body.image ||
      !req.body.price
    ) {
      console.error("Validation error: Missing required fields");
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create and save the product
    const product = new Product(req.body);
    await product.save();

    console.log("Product saved successfully:", product); // Log the saved product
    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    console.error("Error saving product:", error.message); // Log any errors
    res.status(400).json({ error: error.message });
  }
});

// Get a product by NFC ID
router.get("/scan/:nfcId", async (req, res) => {
  try {
    const product = await Product.findOne({ nfcId: req.params.nfcId });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Scan error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
