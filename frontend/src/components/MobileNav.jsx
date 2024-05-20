import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import Logo from "./Logo";
import { pages } from "./Header";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsOpen(open);
  };

  const list = () => (
    <div className="bg-white h-full w-64">
      <List>
        <ListItem disablePadding>
          <div className="p-4 mx-auto">
            <Button variant="contained" className="!bg-orange-500 hover:!bg-orange-700 text-white" fullWidth>
              <Link to="/login">Đăng nhập</Link>
            </Button>
          </div>
        </ListItem>
        <ListItem disablePadding>
          <div className="p-4">
            <div className="flex items-center border border-gray-300 rounded-md">
              <SearchIcon className="text-gray-500 mx-2" />
              <InputBase
                placeholder="Tìm kiếm sản phẩm..."
                inputProps={{ "aria-label": "search" }}
                className="w-full"
              />
            </div>
          </div>
        </ListItem>
        {pages.map((page) => (
          <ListItem disablePadding key={page.title}>
            <ListItemButton
              component={Link}
              to={page.href}
              onClick={toggleDrawer(false)}
            >
              <ListItemText primary={page.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className="mx-4 flex flex-1">
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
        className="text-black"
      >
        <MenuIcon />
      </IconButton>
      <Logo />
      <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
        <div className="flex justify-end p-4">
          <IconButton onClick={toggleDrawer(false)} className="text-black">
            <CloseIcon />
          </IconButton>
        </div>
        {list()}
      </Drawer>
    </div>
  );
}
