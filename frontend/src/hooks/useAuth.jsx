/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import * as userService from "../service/userService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(userService.getUser());

  const login = async (username, password) => {
    try {
      const user = await userService.login(username, password);
      setUser(user);
      toast.success("Login Successfully");
      return true;
    } catch (err) {
      toast.error("Invalid Username or Password");
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
      toast.error(err.response.data || "Đăng ký thất bại!")
      return false;
    }
  }

  const logout = async () => {
    await userService.logout();
    setUser(null);
    // toast.success("Logout Successfully");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
