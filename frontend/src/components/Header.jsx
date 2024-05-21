import PlaceIcon from "@mui/icons-material/Place";
import PhoneIcon from "@mui/icons-material/Phone";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import Logo from "./Logo";
import MainNav from "./MainNav";
import MobileNav from "./MobileNav";

export const pages = [
  { title: "Trang chủ", href: "/" },
  { title: "Giới thiệu", href: "/about" },
  { title: "Sản phẩm", href: "/products" },
  { title: "Tin tức", href: "/news" },
  { title: "Liên hệ", href: "/contact" },
];

export default function Header() {
  return (
    <header className="py-8 lg:pt-6 lg:pb:14">
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
          <a
            href=""
            className="text-secondary hover:text-accent cursor-pointer transition-all duration-300"
          >
            <AccountCircleOutlinedIcon />
          </a>
          <a
            href=""
            className="text-secondary hover:text-accent cursor-pointer transition-all duration-300"
          >
            <FavoriteBorderIcon />
          </a>
          <a
            href=""
            className="text-secondary hover:text-accent cursor-pointer transition-all duration-300"
          >
            <ShoppingCartIcon />
          </a>
        </div>

        <div className="lg:hidden absolute sm:flex right-[15px] top-[15px]">
          <ShoppingCartIcon />
        </div>

        <MainNav pages={pages} />
        {/* mobile nav */}
        <MobileNav pages={pages} />
      </div>
    </header>
  );
}
