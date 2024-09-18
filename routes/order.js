const express = require("express");
const authMiddleware = require("../middlewares/authenticate");
const orderRouter = express.Router();

const {
  getOrderHistory,
  getOrderDetailsById,
  createOrder,
} = require("../controllers/orderController");

orderRouter.get("/", authMiddleware, getOrderHistory);
orderRouter.get("/:id", authMiddleware, getOrderDetailsById);
orderRouter.post("/", authMiddleware, createOrder);

module.exports = orderRouter;
