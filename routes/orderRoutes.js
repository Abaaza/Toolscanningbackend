const express = require("express");
const Order = require("../models/Order"); // Make sure this path is correct
const router = express.Router();

// Create an order
router.post("/create", async (req, res) => {
  try {
    console.log("Creating order with data:", req.body);

    // Create order using mongoose model
    const orderData = {
      nfcId: req.body.nfcId,
      customerId: req.body.customerId,
      userId: req.body.userId,
      timeDuration: req.body.timeDuration,
      orderId: req.body.orderId,
      createdAt: new Date(),
      expiryDate: new Date(
        Date.now() + req.body.timeDuration * 24 * 60 * 60 * 1000
      ),
    };

    // Check if Order model is properly imported
    console.log("Order model:", Order);

    const order = await Order.create(orderData); // Use create instead of new Order()

    console.log("Order saved successfully:", order);
    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(400).json({ error: error.message });
  }
});

// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customerId", "name companyName")
      .populate("userId", "name companyName")
      .sort({ createdAt: -1 });

    console.log("Found orders:", orders);
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
