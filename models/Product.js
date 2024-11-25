const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  nfcId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: { type: String, required: true }, // URL or file path
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Product", productSchema);
