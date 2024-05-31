/* eslint-disable react/prop-types */
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';

function AdminHeader({ onToggleSidebar }) {
  return (
    <AppBar position="static" className="!bg-[#f55f1e] !shadow-md">
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
        <IconButton color="inherit" component={Link} to="/">
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default AdminHeader;