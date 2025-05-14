const express = require("express");
const router = express.Router();
const authRouter = require("./auth.route");
const newsRouter = require("./news.route");
const purchaseRouter = require("./purchase.route");
const resultRouter = require("./result.route");

router.use("/auth", authRouter);
router.use("/news", newsRouter);
router.use("/purchase", purchaseRouter);
router.use("/result", resultRouter);

module.exports = router;
