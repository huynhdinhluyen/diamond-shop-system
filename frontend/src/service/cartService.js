import { axiosInstance } from "../api/api";

export const addToCart = async (product) => {
    const { data } = await axiosInstance.post("/api/cart/add", product);
    return data;
}

export const getCartItems = async (userId) => {
    const response = await axiosInstance.get(`/api/cart/details?userId=${userId}`);
    return response.data;
};

export const changeQuantity = async (userId, productId, quantity) => {
    const response = await axiosInstance.put(`/api/cart/change-quantity`, { userId, productId, quantity });
    return response.data;
}

export const removeFromCart = async (userId, productId) => {
    try {
        const response = await axiosInstance.delete(`/api/cart/remove`, { data: { userId, productId } });
        return response.data;
    } catch (error) {
        console.error("Error removing from cart:", error);
        throw error;
    }
};