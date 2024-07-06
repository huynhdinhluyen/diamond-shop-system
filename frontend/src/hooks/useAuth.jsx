/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import * as userService from "../service/userService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(userService.getUser());
  const navigate = useNavigate();

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

      switch (user.role) {
        case "ADMIN":
          navigate('/admin');
          break;
        case "MANAGER":
          navigate('/manager');
          break;
        case "SALES_STAFF":
          navigate('/sales-staff/orders');
          break;
        case "DELIVERY_STAFF":
          navigate('/delivery/orders');
          break;
        default:
          navigate('/');
          break;
      }

      toast.success("Đăng nhập thành công!");
    } catch (err) {
      toast.error("Tên đăng nhập hoặc mật khẩu không đúng!");
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
      await refreshUser();
    } catch (err) {
      toast.error("Cập nhật hồ sơ không thành công!");
    }
  };

  const changePassword = async (data) => {
    try {
      await userService.changePassword(data);
      logout();
      navigate("/login")
      toast.success("Thay đổi mật khẩu thành công! Mời bạn đăng nhập lại!");
    } catch (err) {
      toast.error("Đổi mật khẩu thất bại!");
    }
  };

  const refreshUser = async () => {
    try {
      const refreshedUser = await userService.getUserById(user.id);
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
