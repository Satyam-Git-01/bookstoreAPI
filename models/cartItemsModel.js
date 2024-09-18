const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const CartItemsModel = sequelize.define(
  "tbl_cartItems",
  {
    cartItemsId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNullValues: false,
      autoIncrement: true,
    },
    quantity: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = CartItemsModel;
