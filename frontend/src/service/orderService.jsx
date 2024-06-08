import { axiosInstance } from "../api/api";
export const getUserOrders = async (userId) => {
    try {
        const response = await axiosInstance.get(`/api/order/details?userId=${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
};