const authService = require("../services/auth.service");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const authController = {
  register: async (req, res) => {
    try {
      const { username, password, fullName, phone, email } = req.body;
      if (!username || !password || !fullName || !phone || !email) {
        return res.status(400).json({
          message: "Username, password, fullName, phone and email are required",
        });
      }
      const user = await authService.register(
        username,
        password,
        fullName,
        phone,
        email
      );

      const token = generateToken({
        userId: user._id,
        username: user.username,
        fullName: user.fullName,
      });

      res.status(201).json({
        message: "User registered successfully",
        user: {
          _id: user._id,
          username: user.username,
          fullName: user.fullName,
        },
        token,
      });
    } catch (error) {
      res.status(400).json({ message: error.message || "Registration failed" });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await authService.login(username, password);

      const token = generateToken({
        userId: user._id,
        username: user.username,
        fullName: user.fullName,
      });

      res.status(200).json({
        message: "User logged in successfully",
        user: {
          _id: user._id,
          username: user.username,
          fullName: user.fullName,
          balance: user.balance,
        },
        token,
      });
    } catch (error) {
      res.status(401).json({ message: error.message || "Login failed" });
    }
  },

  getProfile: async (req, res) => {
    try {
      const { userId } = req.user;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const User = require("../models/User");
      const user = await User.findById(userId).select(
        "_id username fullName balance phone email"
      );
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({
        _id: user._id,
        username: user.username,
        fullName: user.fullName,
        balance: user.balance,
        phone: user.phone,
        email: user.email,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Failed to get profile" });
    }
  },
};

module.exports = authController;
