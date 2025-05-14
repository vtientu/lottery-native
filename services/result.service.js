import mainApiRequest from "./mainApiRequest";

export const getResults = async () => {
    const response = await mainApiRequest.get("/result");
    return response.data;
};
