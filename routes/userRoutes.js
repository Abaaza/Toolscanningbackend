const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Add a new user
router.post("/add", async (req, res) => {
  console.log("POST /users/add called"); // Log endpoint hit
  console.log("Request Body:", req.body); // Log incoming request body

  try {
    const user = new User(req.body);
    await user.save();
    console.log("User added successfully:", user); // Log user creation success
    res.status(201).json({ message: "User added successfully", user });
  } catch (error) {
    console.error("Error adding user:", error.message); // Log any error
    res.status(400).json({ error: error.message });
  }
});

// Get all users
router.get("/", async (req, res) => {
  console.log("GET /users called"); // Log endpoint hit

  try {
    const users = await User.find();
    console.log("Users retrieved:", users.length, "users found"); // Log number of users
    res.json(users);
  } catch (error) {
    console.error("Error retrieving users:", error.message); // Log any error
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
