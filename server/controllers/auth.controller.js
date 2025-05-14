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
      const { username, password, fullName } = req.body;
      if (!username || !password || !fullName) {
        return res
          .status(400)
          .json({ message: "Username, password and fullName are required" });
      }
      const user = await authService.register(username, password, fullName);

      const token = generateToken(user);

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

      const token = generateToken(user._id);

      res.status(200).json({
        message: "User logged in successfully",
        user: {
          _id: user._id,
          username: user.username,
          fullName: user.fullName,
        },
        token,
      });
    } catch (error) {
      res.status(401).json({ message: error.message || "Login failed" });
    }
  },
};

module.exports = authController;
