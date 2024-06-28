import { AppBar, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { Outlet, useNavigate } from "react-router-dom";
import ManagerSidebar from "../components/ManagerSidebar";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";

export default function ManagerLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Đăng xuất thất bại. Vui lòng thử lại.");
    }
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  return user && user.role === "MANAGER" ? (
    <div>
      <AppBar position="static" className="!bg-slate-800 !shadow-md">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerOpen}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Quản lý cửa hàng
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
        <ManagerSidebar onClose={handleDrawerClose} />
      </Drawer>

      <main className="container mx-auto mt-8">
        <Outlet />
      </main>
    </div>
  ) : (
    <div className="text-center mt-8 text-red-500 font-bold text-4xl">
      Bạn không có quyền truy cập trang này!
    </div>
  );
}
