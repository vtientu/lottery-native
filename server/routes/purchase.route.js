const express = require("express");
const router = express.Router();
const purchaseController = require("../controllers/purchase.controller");

router.get("/", purchaseController.getPurchases);
router.post("/", purchaseController.createPurchase);

module.exports = router;
