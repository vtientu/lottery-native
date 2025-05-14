const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    numbers: {
      type: String,
      required: true,
      match: /^\d{6}$/, // Phải đúng 6 chữ số
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    status: {
      type: String,
      enum: ["pending", "won", "lost"],
      default: "pending",
    },
    prizeWon: {
      type: String,
      default: null,
    },
  },
  { timestamps: true, collection: "purchases" }
);

const Purchase = mongoose.model("Purchase", purchaseSchema);
module.exports = Purchase;
