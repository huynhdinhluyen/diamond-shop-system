import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Hàm lấy danh sách kích thước
export async function getSizes() {
  try {
    const response = await axiosInstance.get("/api/sizes");
    return response.data;
  } catch (error) {
    console.error("Error fetching sizes:", error);
    throw error;
  }
}

export async function getDiamonds() {
  try {
    const response = await axiosInstance.get("/api/diamonds");
    return response.data;
  } catch (error) {
    console.error("Error fetching diamonds:", error);
    throw error;
  }
}

export async function createProduct(productData) {
  try {
    const response = await axiosInstance.post("/api/products", productData);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}

export async function getProducts() {
  try {
    const response = await axiosInstance.get("/api/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function deleteProduct(id) {
  try {
    const response = await axiosInstance.delete(`/api/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
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

export async function getProductById(productId) {
  const { data } = await axiosInstance.get("/api/products/" + productId);
  return data;
}

