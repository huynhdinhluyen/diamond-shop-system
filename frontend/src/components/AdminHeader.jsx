/* eslint-disable react/prop-types */
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../hooks/useAuth";
import { toast } from 'react-toastify';

function AdminHeader({ onToggleSidebar }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout(); 
      navigate('/'); 
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Đăng xuất thất bại. Vui lòng thử lại.'); 
    }
  };

  return (
    <AppBar position="static" className="!bg-slate-800 !shadow-md">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onToggleSidebar}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          DHL Diamond Admin
        </Typography>
        <IconButton color="inherit" onClick={handleLogout}>
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default AdminHeader;