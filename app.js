const express = require("express");
const dotenv = require("dotenv").config();
const sequelize = require("./utils/database");
const bodyParser = require("body-parser");

const app = express();

const PORT_NUMBER = process.env.PORT_NUMBER || 5800;

//Application level Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

//Models
const User = require("./models/userModel");
const Cart = require("./models/cartModel");
const CartItems = require("./models/cartItemsModel");
const Book = require("./models/bookModel");
const Order = require("./models/orderModel");
const OrderItems = require("./models/orderItemsModel");

//Relationships among Models (tables)

//A user can have only one cart
User.hasOne(Cart, { foreignKey: "userId" });
Cart.belongsTo(User, { foreignKey: "userId" });

//A cart can have many cart items
Cart.hasMany(CartItems, { foreignKey: "cartId" });
CartItems.belongsTo(Cart, { foreignKey: "cartId" });

//A cart itemm belongs to a specific book
Book.hasMany(CartItems, { foreignKey: "bookId" });
CartItems.belongsTo(Book, { foreignKey: "bookId" });

//user can place many order
User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

// A order can have many orderItems
Order.hasMany(OrderItems, { foreignKey: "orderId" });
OrderItems.belongsTo(Order, { foreignKey: "orderId" });

//Each order item belongs to specific book
Book.hasMany(OrderItems, { foreignKey: "bookId" });
OrderItems.belongsTo(Book, { foreignKey: "bookId" });

//Routes
const authRouter = require("./routes/auth");
const bookRouter = require("./routes/book");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order");

app.use("/api/auth", authRouter);
app.use("/api/books", bookRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

sequelize
  .sync()
  .then((response) => {
    app.listen(PORT_NUMBER, () => {
      console.log(`APP URL http://localhost:${PORT_NUMBER}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
