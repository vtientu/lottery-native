const News = require("../models/News");

const newsService = {
  getNews: async () => {
    try {
      const news = await News.find();
      return news;
    } catch (error) {
      throw new Error(error.message || "Failed to get news");
    }
  },
};

module.exports = newsService;
