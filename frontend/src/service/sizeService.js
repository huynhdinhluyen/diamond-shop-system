import { axiosInstance } from "../api/api";
import { handleError } from "./errorService";

export async function getSizes() {
  try {
    const response = await axiosInstance.get("/api/sizes");
    return response.data;
  } catch (error) {
    handleError("Error fetching sizes:", error);
  }
}
