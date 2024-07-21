import { axiosInstance } from "../api/api";
import { handleError } from "./errorService";

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

export async function getProductById(productId) {
  const { data } = await axiosInstance.get("/api/products/" + productId);
  return data;
}

export async function updateProduct(productId, productData) {
  try {
    const response = await axiosInstance.put(
      `/api/products/${productId}`,
      productData
    );
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

export async function getBestSellingProducts() {
  try {
    const response = await axiosInstance.get(`/api/dashboard/best-sellers`);
    return response.data;
  } catch (error) {
    handleError("Error get best sellers: ", error);
  }
}

export const getProductsByCategory = async (categoryId) => {
  try {
    const response = await axiosInstance.get(`/api/products/by-category?categoryId=${categoryId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch products by category:', error);
    throw error;
  }
};

export async function getProductsByPriceRange(categoryId, minPrice, maxPrice) {
  try {
    const response = await axiosInstance.get(`/api/products/get-range-price`, {
      params: { categoryId, minPrice, maxPrice }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch products by price range:', error);
    throw error;
  }
}

export const getProductsByCollection = async (collectionId) => {
  const response = await axiosInstance.get(`/api/collections/${collectionId}`);
  return response.data.productIds;
};