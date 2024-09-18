const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const validator = require("validator");

// Register User
const register = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    username = validator.escape(username.trim());
    if (!validator.isEmail(email)) {
      return res.status(403).json({ message: "Invalid email" });
    }
    if (!validator.isLength(password, { min: 8 })) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    if (err.message === "Validation error") {
      res
        .status(400)
        .json({ error: "User already registered with this email address" });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
};

// Login user
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user)
      return res
        .status(404)
        .json({ message: "User not found with this email" });

    const isCorrecctPassword = await bcrypt.compare(password, user.password);
    if (!isCorrecctPassword) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    const token = jwt.sign({ userId: user.userId }, process.env.JWT_TOKEN, {
      expiresIn: "3h",
    });
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  register,
  login,
};
