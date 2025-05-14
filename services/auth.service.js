import mainApiRequest from "./mainApiRequest";

export const loginService = async (body) => {
    const response = await mainApiRequest.post("/auth/login", body);
    return response.data;
};

export const registerService = async (body) => {
    const response = await mainApiRequest.post("/auth/register", body);
    return response.data;
};

export const getProfile = async () => {
    const response = await mainApiRequest.get("/auth/profile");
    return response.data;
};
