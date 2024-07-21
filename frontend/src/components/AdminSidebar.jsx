/* eslint-disable react/prop-types */
import { Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import StoreIcon from '@mui/icons-material/Store';
import DiscountIcon from '@mui/icons-material/Discount';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import CollectionsIcon from '@mui/icons-material/Collections';
import { Link } from 'react-router-dom';

function AdminSidebar({ open, onClose }) {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <div className="p-4">
        <IconButton onClick={onClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <List className='!w-64'>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/admin/">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/admin/products">
            <ListItemIcon>
              <StoreIcon />
            </ListItemIcon>
            <ListItemText primary="Sản Phẩm" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/admin/collections">
            <ListItemIcon>
              <CollectionsIcon />
            </ListItemIcon>
            <ListItemText primary="Bộ Sưu Tập" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/admin/diamond-casings">
            <ListItemIcon>
              <DiamondOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Vỏ Kim Cương" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/admin/diamonds">
            <ListItemIcon>
              <DiamondOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Kim Cương" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/admin/categories">
            <ListItemIcon>
              <InventoryIcon />
            </ListItemIcon>
            <ListItemText primary="Danh Mục" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/admin/promotions">
            <ListItemIcon>
              <DiscountIcon />
            </ListItemIcon>
            <ListItemText primary="Khuyến Mãi" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/admin/orders">
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Đơn Hàng" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/admin/customers-management">
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Khách Hàng" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/admin/staffs-management">
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Nhân Viên" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/admin/profile">
            <ListItemIcon>
              <ContactPageIcon />
            </ListItemIcon>
            <ListItemText primary="Chỉnh Sửa Hồ Sơ" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}

export default AdminSidebar;