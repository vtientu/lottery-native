const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    image: String,
  },
  { timestamps: true, collection: "news" }
);

const News = mongoose.model("News", newsSchema);
module.exports = News;
