import MobileNav from './MobileNav';
import MainNav from './MainNav';

export const pages = [
  { title: "Trang chủ", href: "/" },
  { title: "Giới thiệu", href: "/about" },
  { title: "Sản phẩm", href: "/products" },
  { title: "Tin tức", href: "/news" },
  { title: "Liên hệ", href: "/contact" },
];

export default function Header() {
  return (
    <div className="border-b-2 border-b-orange-400">
        <div className="md:hidden">
            <MobileNav />
        </div>
        <div className="hidden md:block">
            <MainNav />
        </div>
    </div>
  )
}
