const Result = require("../models/Result");
const Purchase = require("../models/Purchase");
const moment = require("moment");

const createDailyResult = async () => {
  try {
    const drawDate = moment().startOf("day").toDate();
    const drawDateEnd = moment().endOf("day").toDate();

    if (isNaN(drawDate.getTime()) || isNaN(drawDateEnd.getTime())) {
      throw new Error("Invalid drawDate or drawDateEnd value");
    }


    const existing = await Result.findOne({ drawDate });
    if (existing) return;

    const result = new Result({
      drawDate,
      prizes: generatePrizes(),
    });

    await result.save();

    //check purchase of the day
    const purchases = await Purchase.find({
      drawDate: { $gte: drawDate, $lt: drawDateEnd },
    });

    if (purchases.length > 0) {
      const bulkOps = purchases.map((purchase) => {
        const matchedPrize = checkPrize(purchase.numbers, result.prizes);
        return {
          updateOne: {
            filter: { _id: purchase._id },
            update: {
              $set: {
                status: matchedPrize ? "won" : "lost",
                prizeWon: matchedPrize || null,
              },
            },
          },
        };
      });

      await Purchase.bulkWrite(bulkOps);
    }

    console.log(`Created result for ${drawDate}`);
  } catch (err) {
    console.error("Failed to create daily result:", err.message);
  }
};

const checkPrize = (ticketNumber, prizes) => {
  const prizeOrder = [
    { name: "jackpot", values: prizes.jackpot, digits: 6 },
    { name: "first", values: prizes.first, digits: 5 },
    { name: "second", values: prizes.second, digits: 5 },
    { name: "third", values: prizes.third, digits: 5 },
    { name: "fourth", values: prizes.fourth, digits: 4 },
    { name: "fifth", values: prizes.fifth, digits: 4 },
    { name: "sixth", values: prizes.sixth, digits: 3 },
    { name: "seventh", values: prizes.seventh, digits: 2 },
    { name: "eighth", values: prizes.eighth, digits: 2 },
  ];

  for (const prize of prizeOrder) {
    const tail = ticketNumber.slice(-prize.digits); // Lấy đuôi tương ứng
    if (prize.values.includes(tail)) {
      return prize.name;
    }
  }

  return null; // Không trúng
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
