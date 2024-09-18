const express = require("express");
const authMiddleware = require("../middlewares/authenticate");
const cartRouter = express.Router();
const {
  getItemsFromCart,
  addItemsToCart,
  deleteItemsFromCart,
} = require("../controllers/cartController");

cartRouter.get("/", authMiddleware, getItemsFromCart);
cartRouter.post("/", authMiddleware, addItemsToCart);
cartRouter.delete("/:itemId", authMiddleware, deleteItemsFromCart);

module.exports = cartRouter;
