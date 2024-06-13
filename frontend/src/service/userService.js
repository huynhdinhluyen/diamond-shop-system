import { axiosInstance } from "../api/api";
import { handleError } from "./errorService";

export const getUser = () =>
  localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

export const login = async (username, password) => {
  const { data } = await axiosInstance.post("api/users/login", {
    username,
    password,
  });
  localStorage.setItem("user", JSON.stringify(data));
  return data;
};

export const register = async (registerData) => {
  const { data } = await axiosInstance.post("api/users/register", registerData);
  localStorage.setItem("user", JSON.stringify(data));
  return data;
}

export const logout = () => {
  localStorage.removeItem("user");
};

export const updateUserProfile = async (userId, updatedUser) => {
  const { data } = await axiosInstance.put(`/api/users/update?userId=${userId}`, updatedUser);
  return data;
}

export const changePassword = async (changePasswordData) => {
  await axiosInstance.post("/api/users/change-password", changePasswordData);
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
    const response = await axiosInstance.put(
      `/api/admin/users/${userId}`,
      userData
    );
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