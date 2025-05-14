const Result = require("../models/Result");

const resultService = {
  getResults: async () => {
    try {
      const date = new Date();
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);

      const end = new Date(date);
      end.setHours(23, 59, 59, 999);

      const results = await Result.findOne({
        drawDate: { $gte: start, $lt: end },
      });

      return results;
    } catch (error) {
      throw new Error(error.message || "Failed to get results");
    }
  }

};

module.exports = resultService;
