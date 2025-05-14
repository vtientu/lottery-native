const Result = require("../models/Result");
const moment = require("moment");

const createDailyResult = async () => {
  try {
    const drawDate = moment().startOf("day").toDate(); // 00:00 hôm nay

    const existing = await Result.findOne({ drawDate });
    if (existing) return;

    const result = new Result({
      drawDate,
      prizes: generatePrizes(),
    });

    await result.save();
    console.log(`Created result for ${drawDate}`);
  } catch (err) {
    console.error("Failed to create daily result:", err.message);
  }
};

const generatePrizes = () => {
  return {
    jackpot: [generateRandomNumber(6)],
    first: [generateRandomNumber(5)],
    second: Array.from({ length: 2 }, () => generateRandomNumber(5)),
    third: Array.from({ length: 6 }, () => generateRandomNumber(5)),
    fourth: Array.from({ length: 4 }, () => generateRandomNumber(4)),
    fifth: Array.from({ length: 6 }, () => generateRandomNumber(4)),
    sixth: Array.from({ length: 3 }, () => generateRandomNumber(3)),
    seventh: Array.from({ length: 4 }, () => generateRandomNumber(2)),
    eighth: [generateRandomNumber(2)],
  };
};

const generateRandomNumber = (length) => {
  const max = Math.pow(10, length) - 1;
  const num = Math.floor(Math.random() * (max + 1));
  return num.toString().padStart(length, "0");
};

module.exports = createDailyResult;
