import { useEffect, useState } from "react";
import { getNews } from "../services/news.service";

const useNews = () => {
  const [news, setNews] = useState<
    {
      _id: string;
      title: string;
      content: string;
      image: string;
      createdAt: string;
      updatedAt: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      const res = await getNews();
      setNews(res?.news);
    } catch (err) {
      console.error("Failed to fetch news:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return { news, loading };
};

export default useNews;
