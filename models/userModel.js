const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const UserModel = sequelize.define(
  "tbl_users",
  {
    userId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: Sequelize.STRING,
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    password: Sequelize.STRING,
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = UserModel;
