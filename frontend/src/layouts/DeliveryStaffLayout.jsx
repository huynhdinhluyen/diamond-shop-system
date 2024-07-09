import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

export default function DeliveryStaffLayout() {
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
  return user && user.role === "DELIVERY_STAFF" ? (
    <div className="flex min-h-screen p-4 bg-gray-100">
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
            className="!ml-4 !flex !items-center"
          >
            Diamond Shop System
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          className="bg-white text-black"
        >
          <Toolbar />
          <Divider />
          <List>
            <ListItem
              component={Link}
              to="/delivery/orders"
              className="hover:bg-gray-100"
            >
              <ListItemIcon>
                <LocalShippingIcon />
              </ListItemIcon>
              <ListItemText primary="Đơn hàng cần giao" />
            </ListItem>
            <ListItem
              component={Link}
              to="/delivery/history"
              className="hover:bg-gray-100"
            >
              <ListItemIcon>
                <LocalShippingIcon />
              </ListItemIcon>
              <ListItemText primary="Lịch sử giao hàng" />
            </ListItem>
            <ListItem
              component={Link}
              to="/delivery/profile"
              className="hover:bg-gray-100"
            >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Thông tin cá nhân" />
            </ListItem>
            <ListItem
              onClick={handleLogout}
              className="hover:bg-gray-100 hover:cursor-pointer"
            >
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
        className="!flex-grow container mx-auto "
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
