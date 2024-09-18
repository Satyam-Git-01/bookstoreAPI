const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const CartModel = sequelize.define('tbl_carts', {
    cartId:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNullValues: false,
        autoIncrement: true,
    }
},{
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });

module.exports = CartModel;
