const Book = require("../models/bookModel");
const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const CartItem = require("../models/cartItemsModel");
const Order = require("../models/orderModel");
const OrderItem = require("../models/orderItemsModel");
const createOrder = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    // Get the user's cart
    const cart = await Cart.findOne({
      where: { userId: userId },
      include: [
        {
          model: CartItem,
          include: [Book], 
        },
      ],
    });
    // If the cart is empty or not cartItem is available currently
    if (!cart || cart.tbl_cartItems.length === 0) {
      return res.status(400).json({ message: "Your cart is empty" });
    }
    let totalPrice = 0;
    cart.tbl_cartItems.forEach((item) => {
      totalPrice += item.quantity * item.tbl_book.price;
    });
    // Create a new order
    const order = await Order.create({
      userId: userId,
      totalPrice: totalPrice,
      status: "PLACED",
    });

    // Create order items based on cart items
    const orderItems = cart.tbl_cartItems.map((item) => ({
      orderId: order.orderId,
      bookId: item.bookId,
      quantity: item.quantity,
      price: item.tbl_book.price,
    }));

    // Bulk insert the order items
    await OrderItem.bulkCreate(orderItems);

    // deleting the cartItems from current cart
    await CartItem.destroy({
      where: { cartId: cart.cartId },
    });

    res.json({ message: "Order placed successfully", orderId: order.orderId });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Order can not be placed due to server error" });
  }
};

const getOrderHistory = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    // Find all orders for the authenticated user
    const orders = await Order.findAll({
      where: { userId: userId },
      include: [
        {
          model: OrderItem,
          include: [Book],
        },
      ],
    });

    // If no orders found, return a message
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }
    res.status(200).json({ message: "Retrieval Successful", orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error occurred while fetching data!" });
  }
};

const getOrderDetailsById = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const orderId = req.params.id;
    const order = await Order.findOne({
      where: { orderId: orderId, userId: userId },
      include: [
        {
          model: OrderItem,
          include: [Book],
        },
      ],
    });
    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found or you do not have access to it." });
    }
    res
      .status(200)
      .json({ message: "Order details retrieved successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error occurred while fetching data!" });
  }
};

module.exports = {
  createOrder,
  getOrderDetailsById,
  getOrderHistory,
};
