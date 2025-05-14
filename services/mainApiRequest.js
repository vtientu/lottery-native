import axios from "axios";
import { getToken } from "../utils/tokenStorage";

const mainApiRequest = axios.create({
  baseURL: "http://192.168.101.16:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  responseType: "json",
});

mainApiRequest.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default mainApiRequest;
