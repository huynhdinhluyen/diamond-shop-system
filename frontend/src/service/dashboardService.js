import { axiosInstance } from "../api/api";
import { handleError } from "./errorService";

export async function getDashboardData(startDate, endDate) {
  try {
    const params = {};
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    const response = await axiosInstance.get("/api/dashboard", { params });
    return response.data;
  } catch (error) {
    handleError("Error fetching dashboard data:", error);
  }
}