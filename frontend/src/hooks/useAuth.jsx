/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import * as userService from "../service/userService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(userService.getUser());
  const login = async (email, password) => {
    try {
      const user = await userService.login(email, password);
      setUser(user);
      toast.success("Login Successfully");
    } catch (err) {
      toast.error("Invalid Email or Password");
    }
  };

  const logout = async () => {
    await userService.logout();
    setUser(null);
    // toast.success("Logout Successfully");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
