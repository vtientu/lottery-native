const Purchase = require("../models/Purchase");

const purchaseService = {
  getPurchases: async (userId) => {
    try {
      const purchases = await Purchase.find({ userId });
      return purchases;
    } catch (error) {
      throw new Error(error.message || "Failed to get purchases");
    }
  },
  createPurchase: async ({ userId, numbers, quantity }) => {
    try {
      const purchase = new Purchase({ userId, numbers, quantity });
      await purchase.save();
      return purchase;
    } catch (error) {
      throw new Error(error.message || "Failed to create purchase");
    }
  },
};

module.exports = purchaseService;
