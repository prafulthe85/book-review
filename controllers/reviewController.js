const Review = require("../models/Review");
const mongoose = require("mongoose");

// submit a book review (POST method, only 1 per user per book)
exports.addReview = async (req, res) => {
  try {
    const bookId = req.params.id;
    const userId = req.user.userId;
    const { rating, comment } = req.body;

    // Check if user already reviewed this book
    const existingReview = await Review.findOne({ book: bookId, user: userId });
    if (existingReview) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this book" });
    }

    const review = new Review({
      book: bookId,
      user: userId,
      rating,
      comment,
    });

    await review.save();

    res.status(201).json({ message: "Review added", review });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to add review", error: err.message });
  }
};

// update your review for that book
exports.updateReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const userId = req.user.userId;
    const { rating, comment } = req.body;

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    // Only author can update the review
    if (review.user.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You can only update your own review" });
    }

    review.rating = rating ?? review.rating;
    review.comment = comment ?? review.comment;
    await review.save();

    res.json({ message: "Review updated", review });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update review", error: err.message });
  }
};

//Delete your review
exports.deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const userId = req.user.userId;

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    // Only author can delete the revieww of the book
    if (review.user.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You can only delete your own review" });
    }

    await Review.findByIdAndDelete(reviewId);
    res.json({ message: "Review deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete review", error: err.message });
  }
};

// GET Reviews for a Book with pagination
exports.getReviewsForBook = async (bookId, page = 1, limit = 5) => {
  const skip = (page - 1) * limit;

  // Fetch paginated reviews for this book,also populate user name
  const reviews = await Review.find({ book: bookId })
    .populate("user", "name")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const totalReviews = await Review.countDocuments({ book: bookId });

  return { reviews, totalReviews };
};

// Calculate average rating for a book
exports.getAverageRating = async (bookId) => {
  const result = await Review.aggregate([
    { $match: { book: new mongoose.Types.ObjectId(bookId) } },
    { $group: { _id: "$book", avgRating: { $avg: "$rating" } } },
  ]);

  return result.length > 0 ? result[0].avgRating : null;
};
