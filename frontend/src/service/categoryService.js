import { axiosInstance } from "../api/api";
import { handleError } from "./errorService";

export async function getCategories() {
  try {
    const response = await axiosInstance.get("/api/categories");
    return response.data;
  } catch (error) {
    handleError("Error fetching categories:", error);
  }
}

export async function getCategoryById(categoryId) {
  try {
    const response = await axiosInstance.get(`/api/categories/${categoryId}`);
    return response.data;
  } catch (error) {
    handleError("Error fetching category:", error);
  }
}

export async function createCategory(categoryData) {
  try {
    const response = await axiosInstance.post("/api/categories", categoryData);
    return response.data;
  } catch (error) {
    handleError("Error creating category:", error);
  }
}

export async function updateCategory(categoryId, categoryData) {
  try {
    const response = await axiosInstance.put(
      `/api/categories/${categoryId}`,
      categoryData
    );
    return response.data;
  } catch (error) {
    handleError("Error updating category:", error);
  }
}

export async function deleteCategory(categoryId) {
  try {
    const response = await axiosInstance.delete(
      `/api/categories/${categoryId}`
    );
    return response.data;
  } catch (error) {
    handleError("Error deleting category:", error);
  }
}
