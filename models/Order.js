// models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  nfcId: {
    type: String,
    required: true,
  },
  toolName: {
    // Add this field
    type: String,
    required: true,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  timeDuration: {
    type: Number,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "completed", "cancelled"],
    default: "active",
  },
});

module.exports = mongoose.model("Order", orderSchema);
