/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import * as userService from "../service/userService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(userService.getUser());

  useEffect(() => {
    const checkTokenExpiry = () => {
      const user = userService.getUser();
      if (user) {
        const tokenExpiry = new Date(user.expiration);
        const now = new Date();
        if (now >= tokenExpiry) {
          toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
          logout();
        }
      }
    };

    const interval = setInterval(checkTokenExpiry, 60000); // Kiểm tra mỗi phút
    return () => clearInterval(interval);
  }, []);

  const login = async (username, password) => {
    try {
      const user = await userService.login(username, password);
      setUser(user);
      if (user.role === "ADMIN") {
        window.location.href = "/admin";
      } else if (user.role === "MANAGER") {
        window.location.href = "/manager";
      } else if (user.role === "SALES_STAFF") {
        window.location.href = "/sales-staff";
      } else if (user.role === "DELIVERY_STAFF") {
        window.location.href = "/delivery";
      } else {
        window.location.href = "/";
      }
      toast.success("Đăng nhập thành công!");
      return true;
    } catch (err) {
      toast.error("Tên đăng nhập hoặc mật khẩu không đúng!");
      return false;
    }
  };

  const register = async (data) => {
    try {
      const user = await userService.register(data);
      setUser(user);
      toast.success("Đăng ký thành công, mời bạn đăng nhập!");
      return true;
    } catch (err) {
      toast.error(err.response.data || "Đăng ký thất bại!");
      return false;
    }
  };

  const logout = async () => {
    await userService.logout();
    setUser(null);
  };

  const updateProfile = async (userUpdate) => {
    try {
      const updatedUser = await userService.updateUserProfile(
        user.id,
        userUpdate
      );
      setUser(updatedUser);
      toast.success("Cập nhật hồ sơ thành công!");
    } catch (err) {
      toast.error("Cập nhật hồ sơ không thành công!");
    }
  };

  const changePassword = async (data) => {
    try {
      await userService.changePassword(data);
      logout();
      toast.success("Thay đổi mật khẩu thành công! Mời bạn đăng nhập lại!");
    } catch (err) {
      toast.error("Đổi mật khẩu thất bại!");
    }
  };

  const refreshUser = async () => {
    try {
      const refreshedUser = await userService.getUserByUsername(user.username);
      setUser(refreshedUser);
      userService.setUser(refreshedUser); // Update localStorage
    } catch (err) {
      toast.error("Không thể làm mới thông tin người dùng!");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, updateProfile, changePassword, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
