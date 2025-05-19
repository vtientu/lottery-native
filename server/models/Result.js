const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    drawDate: {
      type: Date,
      required: true,
    },
    prizes: {
      jackpot: [String],
      first: [String],
      second: [String],
      third: [String],
      fourth: [String],
      fifth: [String],
      sixth: [String],
      seventh: [String],
    },
  },
  { timestamps: true, collection: "results" }
);

// Optional: Đảm bảo 1 kết quả cho 1 tỉnh và 1 ngày duy nhất
resultSchema.index({ drawDate: 1, province: 1 }, { unique: true });

const Result = mongoose.model("Result", resultSchema);
module.exports = Result;
