import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SalesStaffLayout() {
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

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return user && user.role === "SALES_STAFF" ? (
    <div className="flex h-screen">
      <AppBar position="fixed" className="!z-10 !bg-slate-800">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            edge="start"
            className={`${drawerOpen ? "!hidden" : "!block"} !sm:hidden`}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            className="!ml-4"
          >
            Diamond Shop System
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          className="!bg-white !text-black"
        >
          <Toolbar />
          <Divider />
          <List>
            <ListItem component={Link} to="/sales-staff" className="hover:bg-gray-100">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Trang chủ" />
            </ListItem>
            <ListItem component={Link} to="/sales-staff/orders" className="hover:bg-gray-100">
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Đơn hàng" />
            </ListItem>
            <ListItem component={Link} to="/sales-staff/customers" className="hover:bg-gray-100">
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Khách hàng" />
            </ListItem>
            <ListItem onClick={handleLogout} className="hover:cursor-pointer hover:bg-gray-100">
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Đăng xuất" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        className="flex-grow p-4 overflow-y-auto bg-gray-100"
      >
        <Toolbar />
        <Outlet />
      </Box>
    </div>
  ) : (
    <div className="text-center mt-8 text-red-500 font-bold text-4xl">
      Bạn không có quyền truy cập trang này!
    </div>
  );
}
