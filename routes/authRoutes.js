const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController");

// Signup route to add the user
router.post("/signup", signup);

// Login route to generate the token of user to perform operations
router.post("/login", login);

module.exports = router;
