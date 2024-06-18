import { axiosInstance } from "../api/api";

export const getTransactionById = async (transactionId) => {
    try {
        const response = await axiosInstance.get(`/api/transactions/get/${transactionId}`);
        return response.data;
    } catch (error) {
        console.log("Error fetching sizes:", error);
    }
}