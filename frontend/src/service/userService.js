import { axiosInstance } from "../api/api";
import { handleError } from "./errorService";

export const getUser = () =>
  localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

export const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const login = async (username, password) => {
  const { data } = await axiosInstance.post("api/users/login", {
    username,
    password,
  });
  localStorage.setItem("user", JSON.stringify(data));
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
  return data;
};

export const register = async (registerData) => {
  const { data } = await axiosInstance.post("api/users/register", registerData);
  localStorage.setItem("user", JSON.stringify(data));
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
  return data;
};

// export async function getUserById(userId) {
//   try {
//     const response = await axiosInstance.get(`/api/users/get/${userId}`);
//     return response.data;
//   } catch (error) {
//     handleError("Error fetching users:", error);
//   }
// }

export const logout = () => {
  localStorage.removeItem("user");
};

export const updateUserProfile = async (userId, updatedUser) => {
  const { data } = await axiosInstance.put(
    `/api/users/update?userId=${userId}`,
    updatedUser
  );
  return data;
};

export const changePassword = async (changePasswordData) => {
  await axiosInstance.post("/api/users/change-password", changePasswordData);
};

export async function getUsers() {
  try {
    const response = await axiosInstance.get("/api/users");
    return response.data;
  } catch (error) {
    handleError("Error fetching users:", error);
  }
}


export async function createUser(userData) {
  try {
    const response = await axiosInstance.post("/api/users", userData);
    return response.data;
  } catch (error) {
    handleError("Error creating user:", error);
  }
}

export async function updateUser(userId, userData) {
  try {
    const response = await axiosInstance.put(`/api/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    handleError("Error updating user:", error);
  }
}

export async function deleteUser(userId) {
  try {
    const response = await axiosInstance.delete(`/api/users/${userId}`);
    return response.data;
  } catch (error) {
    handleError("Error deleting user:", error);
  }
}

export async function getUserByRole(role) {
  try {
    const response = await axiosInstance.get(`/api/users/role?role=${role}`);
    return response.data;
  } catch (error) {
    handleError("Error fetching user by role:", error);
  }
}

export async function getUserByUsername(username) {
  try {
    const response = await axiosInstance.get(`/api/users/get/${username}`);
    return response.data;
  } catch (error) {
    handleError("Error fetching user by role:", error);
  }
}
