import { axiosInstance } from "../api/api";
import { handleError } from "./errorService";

export async function getWarranties() {
  try {
    const response = await axiosInstance.get("/api/warranties");
    return response.data;
  } catch (error) {
    handleError("Error fetching warranties:", error);
  }
}
