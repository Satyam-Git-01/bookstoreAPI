const express = require("express");

const { getAllBooks, getBookById } = require("../controllers/bookController");
const bookRouter = express.Router();

bookRouter.get("/", getAllBooks);
bookRouter.get("/:id", getBookById);

module.exports = bookRouter;
