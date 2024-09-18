const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

/**
 * A middleware which has access to all request and response, purpose is to verify user using jwt.
 * @param {*} req
 * @param {*} res
 * @param {*} next A next middleware in function
 * @returns
 */
const authenticate = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const user = jwt.verify(token, process.env.JWT_TOKEN);
    User.findByPk(user.userId).then((user) => {
      req.user = user;
      next();
    });
  } catch (err) {
    console.log(err);
    return res
      .status(401)
      .json({ success: false, message: "Authentication Failed" });
  }
};

module.exports = authenticate;
