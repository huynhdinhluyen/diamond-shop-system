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
