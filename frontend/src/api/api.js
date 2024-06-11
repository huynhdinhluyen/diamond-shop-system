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
    const response = await axiosInstance.post("/api/diamond-casings", diamondCasingData);
    return response.data;
  } catch (error) {
    handleError("Error creating diamond casing:", error);
  }
}

export async function updateDiamondCasing(diamondCasingId, diamondCasingData) {
  try {
    const response = await axiosInstance.put(`/api/diamond-casings/${diamondCasingId}`, diamondCasingData);
    return response.data;
  } catch (error) {
    handleError("Error updating diamond casing:", error);
  }
}

export async function deleteDiamondCasing(diamondCasingId) {
  try {
    const response = await axiosInstance.delete(`/api/diamond-casings/${diamondCasingId}`);
    return response.data;
  } catch (error) {
    handleError("Error deleting diamond casing:", error);
  }
}

export async function getPromotions() {
  try {
    const response = await axiosInstance.get("/api/promotions");
    return response.data;
  } catch (error) {
    handleError("Error fetching promotions:", error);
  }
}

export async function getWarranties() {
  try {
    const response = await axiosInstance.get("/api/warranties");
    return response.data;
  } catch (error) {
    handleError("Error fetching warranties:", error);
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

export async function updateProduct(productId, productData) {
  try {
    const response = await axiosInstance.put(`/api/products/${productId}`, productData);
    return response.data;
  } catch (error) {
    handleError("Error updating product:", error);
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

export async function getUsers() {
  try {
    const response = await axiosInstance.get("/api/admin/users");
    return response.data;
  } catch (error) {
    handleError("Error fetching users:", error);
  }
}

export async function createUser(userData) {
  try {
    const response = await axiosInstance.post("/api/admin/users", userData);
    return response.data;
  } catch (error) {
    handleError("Error creating user:", error);
  }
}

export async function updateUser(userId, userData) {
  try {
    const response = await axiosInstance.put(`/api/admin/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    handleError("Error updating user:", error);
  }
}

export async function deleteUser(userId) {
  try {
    const response = await axiosInstance.delete(`/api/admin/users/${userId}`);
    return response.data;
  } catch (error) {
    handleError("Error deleting user:", error);
  }
}