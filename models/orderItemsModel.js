const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const OrderItemsModel = sequelize.define(
  "tbl_orderItems",
  {
    orderItemsId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNullValues: false,
      autoIncrement: true,
    },
    quantity: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    },
    price: {
      type: Sequelize.FLOAT,
      allowNullValues: false,
    },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = OrderItemsModel;
