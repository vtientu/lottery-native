import mainApiRequest from "./mainApiRequest";

export const buyTicketService = async ({ numbers, quantity }) => {
    const res = await mainApiRequest.post("/api/purchase", { numbers, quantity });
    return res.data;
};

export const getMyTicketsService = async () => {
    const res = await mainApiRequest.get("/purchase");
    return res.data;
};

