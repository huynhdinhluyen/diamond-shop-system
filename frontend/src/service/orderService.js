import { axiosInstance } from "../api/api";
export const getUserOrders = async (userId) => {
    try {
        const response = await axiosInstance.get(`/api/order/get/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
};

export const getOrderById = async (orderId) => {
    try {
        const response = await axiosInstance.get(`/api/order/get/${orderId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
};

export const addOrder = async (orderData) => {
    try {
        const response = await axiosInstance.post("/api/order/add", orderData);
        return response.data;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
}

export const updateTransactionId = async (orderId, transactionId) => {
    try {
        const response = await axiosInstance.post(`/api/order/update-transaction/${orderId}`, null, {
            params: { transactionId }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to update transaction method:', error);
        throw error;
    }
};

export const updateOrderNote = async (orderId, note) => {
    await axiosInstance.post(`/api/order/${orderId}/note`, { note });
};
