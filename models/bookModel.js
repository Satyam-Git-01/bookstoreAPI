const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const BookModel = sequelize.define(
  "tbl_books",
  {
    bookId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: Sequelize.STRING,
    author: Sequelize.STRING,
    genre: Sequelize.STRING,
    price: Sequelize.FLOAT,
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = BookModel;
