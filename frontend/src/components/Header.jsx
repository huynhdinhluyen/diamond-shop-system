/* eslint-disable react/prop-types */
import PlaceIcon from "@mui/icons-material/Place";
import PhoneIcon from "@mui/icons-material/Phone";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import Logo from "./Logo";
import MainNav from "./MainNav";
import MobileNav from "./MobileNav";
import { Link, useNavigate } from "react-router-dom";

export const pages = [
  { title: "Trang chủ", href: "/" },
  { title: "Giới thiệu", href: "/about" },
  { title: "Sản phẩm", href: "/products" },
  { title: "Tin tức", href: "/news" },
  { title: "Liên hệ", href: "/contact" },
];

export default function Header() {
  const username = localStorage.getItem("user");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <header className="py-8 lg:pt-6 ">
      <div className="container px-[15px] mx-auto relative flex flex-col lg:flex-row lg:justify-between gap-y-4 lg:gap-y-0 ">
        <Logo />

        <div className="flex flex-col gap-y-4 lg:flex-row lg:gap-x-10 lg:gap-y-0 mx-5">
          <div className="flex justify-center items-center gap-x-2 lg:justify-normal">
            <PlaceIcon className="text-accent" />
            <div className="text-nowrap">
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
            {username ? (
              <div className="text-nowrap flex items-center gap-x-2 relative group z-10">
                <AccountCircleOutlinedIcon /> {username}
                <div className="absolute z-10000 bg-white hidden group-hover:flex w-[200px] top-12 flex-col rounded-lg text-base ">
                  <Link
                    to="/profile"
                    className="p-3 text-base hover:bg-slate-50 hover:text-accent transition-all duration-300"
                  >
                    Hồ sơ
                  </Link>
                  <Link
                    to="/"
                    className="p-3 text-base hover:bg-slate-50 hover:text-accent transition-all duration-300"
                  >
                    Đơn hàng của bạn
                  </Link>
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
                <span>Đăng nhập</span>
              </Link>
            )}
          </div>

          <Link
            href=""
            className="text-secondary hover:text-accent cursor-pointer transition-all duration-300 flex items-center gap-x-2"
          >
            <ShoppingCartIcon />
            <span className="sm:hidden md:hidden lg:flex text-nowrap">
              Giỏ hàng
            </span>
          </Link>
        </div>

        <MainNav pages={pages} />
        {/* mobile nav */}
        <MobileNav pages={pages} />
      </div>
    </header>
  );
}
