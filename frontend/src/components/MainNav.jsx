import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { pages } from "./Header";
export default function MainNav() {
  return (
    <div className='h-full'>
      <AppBar position="static" color='transparent' className="bg-transparent shadow-none">
      <Toolbar className="container mx-auto flex justify-between items-center">
        <nav className="flex space-x-4">
          {pages.map((page) => (
            <Button key={page.title} color="inherit" component={Link} to={page.href}>{page.title}</Button>
          ))}        
        </nav>

        <div className="header__search">
          <div className="flex items-center border border-gray-300 rounded-md">
            <SearchIcon className="text-gray-500 mx-2" />
            <InputBase
              placeholder="Tìm kiếm sản phẩm..."
              inputProps={{ 'aria-label': 'search' }}
              className="w-full"
            />
          </div>
        </div>

        <div className="header__actions flex items-center space-x-4">
          <IconButton color="inherit" component={Link} to="/cart">
            <ShoppingCartIcon />
          </IconButton>
          <IconButton color="inherit" component={Link} to="/account">
            <AccountCircleIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
    </div>
    
  )
}
