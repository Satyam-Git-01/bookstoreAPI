const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const OrderModel = sequelize.define(
  "tbl_orders",
  {
    orderId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNullValues: false,
      autoIncrement: true,
    },
    status: { type: Sequelize.STRING, defaultValue: "PENDING" },
    totalPrice: Sequelize.FLOAT,
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = OrderModel;
