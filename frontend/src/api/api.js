import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

function handleError(message, error) {
  console.error(message, error); 
  throw error;
}

export async function getSizes() {
  try {
    const response = await axiosInstance.get("/api/sizes");
    return response.data;
  } catch (error) {
    handleError("Error fetching sizes:", error);
  }
}

export async function getDiamonds() {
  try {
    const response = await axiosInstance.get("/api/diamonds");
    return response.data;
  } catch (error) {
    handleError("Error fetching diamonds:", error);
  }
}

export async function createProduct(productData) {
  try {
    const response = await axiosInstance.post("/api/products", productData);
    return response.data;
  } catch (error) {
    handleError("Error creating product:", error);
  }
}

export async function getProducts() {
  try {
    const response = await axiosInstance.get("/api/products");
    return response.data;
  } catch (error) {
    handleError("Error fetching products:", error);
  }
}

export async function deleteProduct(id) {
  try {
    const response = await axiosInstance.delete(`/api/products/${id}`);
    return response.data;
  } catch (error) {
    handleError("Error deleting product:", error);
  }
}

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
    const response = await axiosInstance.put(`/api/categories/${categoryId}`, categoryData);
    return response.data;
  } catch (error) {
    handleError("Error updating category:", error);
  }
}

export async function deleteCategory(categoryId) {
  try {
    const response = await axiosInstance.delete(`/api/categories/${categoryId}`);
    return response.data; 
  } catch (error) {
    handleError("Error deleting category:", error);
  }
}

export async function getDashboardData() {
  try {
    const response = await axiosInstance.get("/api/admin/dashboard");
    return response.data;
  } catch (error) {
    handleError("Error fetching dashboard data:", error);
  }
}

export async function getProductById(productId) {
  const { data } = await axiosInstance.get("/api/products/" + productId);
  return data;
}

