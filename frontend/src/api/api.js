import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const { logout } = useAuth();
    if (error.response && error.response.status === 401) {
      // Token hết hạn
      toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
      await logout();
      window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);