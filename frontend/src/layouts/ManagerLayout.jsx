import { AppBar, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet } from "react-router-dom";
import ManagerSidebar from "../components/ManagerSidebar";
import { useAuth } from "../hooks/useAuth";

export default function ManagerLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user } = useAuth();

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  return user && user.role === "MANAGER" ? (
    <div>
      <AppBar position="static" className="!bg-[#f55f1e] !shadow-md">
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
    <div className="text-center mt-8 text-red-500 font-bold text-4xl">Bạn không có quyền truy cập trang này!</div>
  );
}
