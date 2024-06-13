import { axiosInstance } from "../api/api";
import { handleError } from "./errorService";

export async function getDiamondCasings() {
  try {
    const response = await axiosInstance.get("/api/diamond-casings");
    return response.data;
  } catch (error) {
    handleError("Error fetching diamond casings:", error);
  }
}

export async function createDiamondCasing(diamondCasingData) {
  try {
    const response = await axiosInstance.post(
      "/api/diamond-casings",
      diamondCasingData
    );
    return response.data;
  } catch (error) {
    handleError("Error creating diamond casing:", error);
  }
}

export async function updateDiamondCasing(diamondCasingId, diamondCasingData) {
  try {
    const response = await axiosInstance.put(
      `/api/diamond-casings/${diamondCasingId}`,
      diamondCasingData
    );
    return response.data;
  } catch (error) {
    handleError("Error updating diamond casing:", error);
  }
}

export async function deleteDiamondCasing(diamondCasingId) {
  try {
    const response = await axiosInstance.delete(
      `/api/diamond-casings/${diamondCasingId}`
    );
    return response.data;
  } catch (error) {
    handleError("Error deleting diamond casing:", error);
  }
}
