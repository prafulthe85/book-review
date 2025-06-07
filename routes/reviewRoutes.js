const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const { authenticate } = require("../middleware/authMiddleware");

// Submit a review for a book
router.post("/books/:id/reviews", authenticate, reviewController.addReview);

// Update your review
router.put("/reviews/:id", authenticate, reviewController.updateReview);

// Delete your review
router.delete("/reviews/:id", authenticate, reviewController.deleteReview);

module.exports = router;
