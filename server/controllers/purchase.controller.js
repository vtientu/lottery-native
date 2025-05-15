const Purchase = require("../models/Purchase");
const purchaseService = require("../services/purchase.service");
const User = require("../models/User");

const purchaseController = {
  getPurchases: async (req, res) => {
    try {
      const { userId } = req.user;
      const purchases = await purchaseService.getPurchases(userId);

      res.status(200).json({
        message: "Purchases fetched successfully",
        purchases,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createPurchase: async (req, res) => {
    try {
      const { numbers, quantity } = req.body;
      const { userId } = req.user;
      if (!userId || !numbers || !quantity) {
        console.log(userId, numbers, quantity);

        return res
          .status(400)
          .json({ message: "UserId, numbers and quantity are required" });
      }

      // Lấy user và kiểm tra số dư
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const ticketPrice = 10000;
      const totalCost = quantity * ticketPrice;
      if (user.balance < totalCost) {
        return res.status(400).json({ message: "Số dư không đủ để mua vé" });
      }
      user.balance -= totalCost;
      await user.save();

      const purchase = Purchase({
        userId,
        numbers,
        quantity,
        status: "pending",
      });

      await purchase.save();

      res.status(201).json({
        message: "Purchase created successfully",
        purchase,
        balance: user.balance,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = purchaseController;
