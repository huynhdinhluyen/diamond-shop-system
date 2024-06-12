import { axiosInstance } from "../api/api";
import { handleError } from "./errorService";

export async function getDashboardData() {
  try {
    const response = await axiosInstance.get("/api/admin/dashboard");
    return response.data;
  } catch (error) {
    handleError("Error fetching dashboard data:", error);
  }
}
