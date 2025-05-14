const purchaseService = require("../services/purchase.service");

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
      const { userId, numbers, quantity } = req.body;
      if (!userId || !numbers || !quantity) {
        return res
          .status(400)
          .json({ message: "UserId, numbers and quantity are required" });
      }

      const purchase = await purchaseService.createPurchase({
        userId,
        numbers,
        quantity,
      });

      res.status(201).json({
        message: "Purchase created successfully",
        purchase,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = purchaseController;
