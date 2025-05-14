const express = require("express");
const authController = require("../controllers/auth.controller");
const authRouter = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/profile", authMiddleware.protect, authController.getProfile);

module.exports = authRouter;
