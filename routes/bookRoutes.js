const express = require("express");
const router = express.Router();
const {
  addBook,
  getAllBooks,
  getBookById,
  searchBooks,
} = require("../controllers/bookController");
const { authenticate } = require("../middleware/authMiddleware");

// Add a new book
router.post("/books", authenticate, addBook);

// Get all books (with filter + pagination)
router.get("/books", getAllBooks);

// Get book details by ID
router.get("/books/:id", getBookById);

// search a book
router.get("/search", searchBooks);

module.exports = router;
