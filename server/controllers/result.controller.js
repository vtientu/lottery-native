const resultService = require("../services/result.service");

const resultController = {
  getResults: async (req, res) => {
    try {
      const results = await resultService.getResults();
      res.status(200).json({
        message: "Results fetched successfully",
        results,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = resultController;
