import { useEffect, useState } from "react";
import PlaceIcon from "@mui/icons-material/Place";
import PhoneIcon from "@mui/icons-material/Phone";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Logo from "./Logo";
import MainNav from "./MainNav";
import MobileNav from "./MobileNav";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";

export const pages = [
  { title: "Trang chủ", href: "/" },
  { title: "Giới thiệu", href: "/about" },
  { title: "Sản phẩm", href: "/products" },
  { title: "Bảng giá kim cương", href: "/prices-table" },
  { title: "Kiến thức trang sức", href: "/knowledge" },
  { title: "Liên hệ", href: "/contact" },
];

export default function Header() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (cart.items) {
      const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalItems);
    }
  }, [cart]);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="py-8 lg:pt-6">
      <div className="container px-[15px] mx-auto relative flex flex-col lg:flex-row lg:justify-between gap-y-4 lg:gap-y-0 ">
        <Logo />
        <div className="flex flex-col gap-y-4 lg:flex-row lg:gap-x-10 lg:gap-y-0 mx-5">
          <div className="flex justify-center items-center gap-x-2 lg:justify-normal">
            <div className="text-nowrap md:text-wrap text-center ">
              <PlaceIcon className="text-accent" />
              123 Long Thạnh Mỹ, Thành phố Thủ Đức
            </div>
          </div>
          <div className="flex justify-center items-center gap-x-2 lg:justify-normal">
            <PhoneIcon className="text-accent" />
            <div className="text-nowrap">(+84) 123123123</div>
          </div>
        </div>

        <div className="lg:flex lg:gap-x-10 items-center w-auto bg-grey px-5 hidden rounded-xl ">
          <div className="text-secondary cursor-pointer flex items-center gap-x-2">
            {user ? (
              <div className="text-nowrap flex items-center gap-x-2 relative group z-20">
                <AccountCircleOutlinedIcon /> {user.lastName} {user.firstName}
                <div className="absolute z-10000 bg-white hidden group-hover:flex w-[200px] top-12 flex-col rounded-lg text-base ">
                  <Link
                    to="/profile"
                    className="p-3 text-base hover:bg-slate-50 hover:text-accent transition-all duration-300"
                  >
                    Hồ sơ
                  </Link>
                  <Link
                    to="/my-order"
                    className="p-3 text-base hover:bg-slate-50 hover:text-accent transition-all duration-300"
                  >
                    Đơn hàng của bạn
                  </Link>
                  {user.role === "ADMIN" && (
                    <Link
                      to="/admin"
                      className="p-3 text-base hover:bg-slate-50 hover:text-accent transition-all duration-300"
                    >
                      Dashboard
                    </Link>
                  )}
                  <div
                    onClick={handleLogout}
                    className="p-3 text-base hover:bg-slate-50 hover:text-accent transition-all duration-300"
                  >
                    Đăng xuất
                  </div>
                </div>
                <div className="absolute top-7 left-0 w-[150px] h-[18px] bg-transparent hidden group-hover:block"></div>
                <div className="absolute top-[46px] left-0 w-[150px] h-[17px] bg-transparent hidden group-hover:block"></div>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-nowrap flex items-center gap-x-2 relative group z-10 hover:text-accent transition-all duration-300"
              >
                <AccountCircleOutlinedIcon />
                Đăng nhập
              </Link>
            )}
          </div>

          <Link
            to="/cart"
            className="text-secondary hover:text-accent cursor-pointer transition-all duration-300 flex items-center gap-x-2 text-nowrap relative"
          >
            <ShoppingCartIcon />
            Giỏ hàng
            {cartCount <= 0 ?
              <span className="bg-accent text-white rounded-full text-xs absolute bottom-[-7px] left-3 w-5 h-5 flex items-center justify-center">
                0
              </span> : (
                <span className="bg-accent text-white rounded-full text-xs absolute bottom-[-7px] left-3 w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
          </Link>
        </div>

        <MainNav pages={pages} />
        {/* mobile nav */}
        <MobileNav pages={pages} />
      </div>
    </header>
  );
}
