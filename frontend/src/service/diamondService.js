import { axiosInstance } from "../api/api";
import { handleError } from "./errorService";

export async function getDiamonds() {
  try {
    const response = await axiosInstance.get("/api/diamonds");
    return response.data;
  } catch (error) {
    handleError("Error fetching diamonds:", error);
  }
}

export async function createDiamond(diamondData) {
  try {
    const response = await axiosInstance.post("/api/diamonds", diamondData);
    return response.data;
  } catch (error) {
    handleError("Error creating diamond:", error);
  }
}

export async function updateDiamond(diamondId, diamondData) {
  try {
    const response = await axiosInstance.put(
      `/api/diamonds/${diamondId}`,
      diamondData
    );
    return response.data;
  } catch (error) {
    handleError("Error updating diamond:", error);
  }
}

export async function deleteDiamond(diamondId) {
  try {
    const response = await axiosInstance.delete(`/api/diamonds/${diamondId}`);
    return response.data;
  } catch (error) {
    handleError("Error deleting diamond:", error);
  }
}