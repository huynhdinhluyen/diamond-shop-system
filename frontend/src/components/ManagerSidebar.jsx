import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import { Link } from "react-router-dom";
import ContactPageIcon from '@mui/icons-material/ContactPage';
import DiscountIcon from '@mui/icons-material/Discount';
// eslint-disable-next-line react/prop-types
export default function ManagerSidebar({ onClose }) {
  return (
    <List className="!w-64 !py-8">
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/manager" onClick={onClose}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/manager/orders" onClick={onClose}>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Đơn Hàng" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/manager/customers-management" onClick={onClose}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Khách Hàng" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/manager/sales-staffs-management" onClick={onClose}>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Nhân Viên Bán Hàng" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/manager/delivery-staffs-management" onClick={onClose}>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Nhân Viên Giao Hàng" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/manager/promotions">
          <ListItemIcon>
            <DiscountIcon />
          </ListItemIcon>
          <ListItemText primary="Khuyến Mãi" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/manager/profile" onClick={onClose}>
          <ListItemIcon>
            <ContactPageIcon />
          </ListItemIcon>
          <ListItemText primary="Chỉnh Sửa Hồ Sơ" />
        </ListItemButton>
      </ListItem>
    </List>
  );
}