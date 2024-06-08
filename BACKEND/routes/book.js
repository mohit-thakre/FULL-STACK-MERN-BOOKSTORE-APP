const express = require("express");
const router = express.Router();
const User = require("../model/user");
const Book = require("../model/books");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");

router.post("/addbook", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id);
    if (user.role !== "admin") {
      return res.status(400).json({
        success: false,
        message: "You do not have access to do the work of admin",
      });
    }
    const newBook = new Book({
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      description: req.body.description,
      language: req.body.language,
    });
    await newBook.save();
    return res.status(200).json({
      success: true,
      message: "New book created successfully",
      book: newBook,
    });
  } catch (error) {
    console.log(error, "at book router");
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

router.put("/updatebook", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.headers; // Corrected to req.headers
    const { url, title, author, price, description, language } = req.body;

    const updatedBook = await Book.findByIdAndUpdate(
      bookid,
      {
        url: url,
        title: title,
        author: author,
        price: price,
        description: description,
        language: language,
      },
      { new: true }
    );

    if (!updatedBook) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "An error occurred during update." });
  }
});

router.delete("/deletebook", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.headers; // Corrected to req.headers

    await Book.findByIdAndDelete(bookid);

    return res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: "deletebook",
    });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "An error occurred during delete." });
  }
});

router.get("/getallbook", async (req, res) => {
  try {
    const allBooks = await Book.find().sort({ createdAt: -1, title: 1 });
    return res.status(200).json({
      success: true,
      message: "all book get successfully",
      data: allBooks,
    });
  } catch (error) {
    console.log(error);
  }
});
router.get("/getrecentbook", async (req, res) => {
  try {
    const allRecentBooks = await Book.find().sort({ createdAt: -1, title: 1 }).limit(4);
    return res.status(200).json({
      success: true,
      message: "all book get successfully",
      data: allRecentBooks,
    });
  } catch (error) {
    console.log(error);
  }
});
router.get("/getbookbyid/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json({
      success: true,
      message: "all book get successfully",
      data: book,
    });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
