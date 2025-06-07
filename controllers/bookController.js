const Book = require("../models/Book");
const ReviewController = require("./reviewController");

// add a new book (reqires the token POST method)
exports.addBook = async (req, res) => {
  try {
    const { title, author, genre, publishedYear } = req.body;
    const book = new Book({ title, author, genre, publishedYear });
    await book.save();
    res.status(201).json({ message: "Book added", book });
  } catch (err) {
    res.status(500).json({ message: "Failed to add book", error: err.message });
  }
};

// get all books, can apply filter of author and genre

exports.getAllBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10, author, genre } = req.query;

    const filter = {};
    if (author) filter.author = new RegExp(author, "i"); // case-insensitive
    if (genre) filter.genre = new RegExp(genre, "i");

    const books = await Book.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({ page, books });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching books", error: err.message });
  }
};

// get a book by it's id
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    // Pagination params are passed for reviews
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const { reviews, totalReviews } = await ReviewController.getReviewsForBook(
      book._id,
      page,
      limit
    );
    const avgRating = await ReviewController.getAverageRating(book._id);

    res.json({
      book,
      averageRating: avgRating,
      reviews,
      totalReviews,
      page,
      limit,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching book", error: err.message });
  }
};

exports.searchBooks = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    // Creation of case-insensitive regex for partial matching
    const regex = new RegExp(query, "i");

    // Search books by title OR author matching regex
    const books = await Book.find({
      $or: [{ title: regex }, { author: regex }],
    });

    res.json({ results: books });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error searching books", error: err.message });
  }
};
