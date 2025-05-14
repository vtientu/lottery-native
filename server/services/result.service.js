const Result = require("../models/Result");

const resultService = {
  getResults: async ({ drawDate }) => {
    try {
      const results = await Result.find({ drawDate: { $gte: drawDate } });
      return results;
    } catch (error) {
      throw new Error(error.message || "Failed to get results");
    }
  },
};

module.exports = resultService;
