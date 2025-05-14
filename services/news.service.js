import mainApiRequest from "./mainApiRequest";

export const getNews = async () => {
  const response = await mainApiRequest.get("/news");
  return response.data;
};
