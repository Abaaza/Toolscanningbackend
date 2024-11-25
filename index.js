const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // Load environment variables from .env file

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
const PORT = process.env.PORT || 8000; // Use PORT from .env or default to 8000

// Middleware
app.use(cors());
app.use(express.json()); // Built-in middleware to parse JSON

// Logging Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Test route to verify server is working
app.get("/", (req, res) => {
  res.json({ message: "Tool Rental API is running" });
});

// Routes
app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/orders", orderRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Handle 404s
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB:", mongoose.connection.name))
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process if unable to connect
  });

// Start the server
app.listen(PORT, (error) => {
  if (error) {
    console.error("Error starting the server:", error);
    process.exit(1); // Exit if server fails to start
  }
  console.log(`Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("Received SIGTERM. Performing graceful shutdown...");
  mongoose.connection.close(() => {
    console.log("MongoDB connection closed.");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.log("Received SIGINT. Performing graceful shutdown...");
  mongoose.connection.close(() => {
    console.log("MongoDB connection closed.");
    process.exit(0);
  });
});
