import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export async function getProducts() {
  try {
    const response = await axiosInstance.get("/api/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function getCategories() {
  try {
    const response = await axiosInstance.get("/api/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

export async function getDashboardData() {
  try {
      const response = await axiosInstance.get("/api/admin/dashboard");
      return response.data;
  } catch (error) {
      console.error("Error fetching dashboard data:", error);
      throw error;
  }
}
