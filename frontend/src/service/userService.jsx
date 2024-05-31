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
