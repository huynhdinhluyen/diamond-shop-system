import { axiosInstance } from "../api/api";

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
