const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    companyName: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "customer"],
      default: "customer", // Set default role to customer
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
