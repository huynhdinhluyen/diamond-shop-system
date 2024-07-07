import { axiosInstance } from "../api/api";
import { handleError } from "./errorService";

export async function getPromotions() {
  try {
    const response = await axiosInstance.get("/api/promotions");
    return response.data;
  } catch (error) {
    handleError("Error fetching promotions:", error);
  }
}

export async function deletePromotion(promotionId) {
  try {
    const response = await axiosInstance.delete(`/api/promotions/${promotionId}`);
    return response.data;
  } catch (error) {
    handleError("Error delete promotion: ", error);
  }
}

export async function updatePromotion(promotionId, promotionData) {
  try {
    const response = await axiosInstance.put(`/api/promotions/${promotionId}`, promotionData);
    return response.data;
  } catch (error) {
    handleError("Error updating promotion:", error);
  }
}

export async function createPromotion(promotionData) {
  try {
    const response = await axiosInstance.post("/api/promotions/add", promotionData);
    return response.data;
  } catch (error) {
    handleError("Error creating promotion:", error);
  }
}