import mainApiRequest from "./mainApiRequest";

export const getNews = async () => {
  try {
    const response = await mainApiRequest.get("/news");
    return response.data;
  } catch (error) {
    throw new Error(error.message || "Failed to get news");
  }
};
