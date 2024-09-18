const Book = require("../models/bookModel");
const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const CartItem = require("../models/cartItemsModel");

const getItemsFromCart = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    // checking if the user has already a cart and items in that
    const cart = await Cart.findOne({
      where: { userId: userId },
      include: [
        {
          model: CartItem,
          include: [Book],
        },
      ],
    });
    // If no cart is there or there are no items in that cart(cartItems is empty)
    if (!cart || cart.tbl_cartItems.length === 0) {
      return res.status(200).json({ message: "Your cart is empty" });
    }
    res.status(200).json({
      message: "Cart items retrieval successfull",
      cartItems: cart.tbl_cartItems,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Some error Occurred while fetching items" });
  }
};

const addItemsToCart = async (req, res, next) => {
  try {
    const { bookId, quantity } = req.body;
    const userId = req.user.userId;
    // find book
    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    // Find or create a cart for the user
    const [cart, newCart] = await Cart.findOrCreate({
      where: { userId },
    });
    // Check if the book is already in the cart
    const cartItem = await CartItem.findOne({
      where: {
        cartId: cart.cartId,
        bookId: bookId,
      },
    });

    if (cartItem) {
      // If the book is already in the cart, update the quantity
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      // If the book is not in the cart, add it
      await CartItem.create({
        cartId: cart.cartId,
        bookId: bookId,
        quantity: quantity,
      });
    }

    res.json({ message: "Book added to cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const deleteItemsFromCart = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const itemId = req.params.itemId; // ID of the CartItem to delete
    // Find the user's cart
    const cart = await Cart.findOne({
      where: { userId: userId },
    });

    // If the cart doesn't exist
    if (!cart) {
      return res.status(400).json({ message: "Cart not found" });
    }
    // Find the cart item that the user wants to delete
    const cartItem = await CartItem.findOne({
      where: {
        cartItemsId: itemId,
        cartId: cart.cartId, // Ensure the item is in the user's cart
      },
    });

    // If the cart item is not found
    if (!cartItem) {
      return res.status(400).json({ message: "Item not found in your cart" });
    }
    // Delete the cart item
    await cartItem.destroy();

    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Occurred While Deleting Item" });
  }
};

module.exports = {
  getItemsFromCart,
  addItemsToCart,
  deleteItemsFromCart,
};
