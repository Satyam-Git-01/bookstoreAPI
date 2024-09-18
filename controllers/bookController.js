const BookModel = require("../models/bookModel");

const getAllBooks = async (req, res, next) => {
  try {
    const allBooks = await BookModel.findAll();
    res.status(200).json({ message: "Request Successfull", books: allBooks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getBookById = async (req, res, next) => {
  try {
    const requestedBookId = req.params.id;
    if (requestedBookId != undefined && !isNaN(requestedBookId)) {
      const book = await BookModel.findOne({
        where: { bookId: requestedBookId },
      });
      return res.status(200).json({ book: book });
    } else {
      res.status(400).json({ error: "Please provide valid bookId" });
    }
  } catch (err) {
    res.status(500).json({ err: err });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
};
