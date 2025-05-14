const newsService = require("../services/news.service");

const newsController = {
  getNews: async (req, res) => {
    try {
      const news = await newsService.getNews();
      res.status(200).json({
        message: "News fetched successfully",
        news,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = newsController;
