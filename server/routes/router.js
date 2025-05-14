const express = require("express");
const router = express.Router();
const authRouter = require("./auth.route");
const newsRouter = require("./news.route");
const purchaseRouter = require("./purchase.route");
const resultRouter = require("./result.route");
const authMiddleware = require("../middlewares/auth.middleware");

router.use("/auth", authRouter);
router.use("/news", newsRouter);
router.use("/result", resultRouter);
router.use(authMiddleware.protect)
router.use("/purchase", purchaseRouter);

module.exports = router;
