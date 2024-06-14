import { axiosInstance } from "../api/api";
import { handleError } from "./errorService";

export async function getSizesByCategory(categoryId) {
  try {
    const response = await axiosInstance.get(`/api/sizes/${categoryId}`);
    return response.data;
  } catch (error) {
    handleError("Error fetching sizes:", error);
  }
}
