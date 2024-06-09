import { Link } from "react-router-dom";
import Logo from "./Logo";
import Map from "../components/Map.jsx";

export default function Footer() {
  return (
    <footer className="pt-12 ">
      <div className="container mx-auto xl:flex-row gap-x5 gap-y-10 mb-12">
        <div className="flex flex-col xl:flex-row gap-x-5 gap-y-10">
          {/* contact*/}
          <div className="flex-1">
            <Logo />
            <div className="flex flex-col gap-y-3 mt-5 mb-10">
              <div className="flex items-center gap-x-[6px]">
                <i className="ri-map-pin-line text-accent text-[24px]"></i>
                <div>Long Thạnh Mỹ, Thành phố Thủ Đức</div>
              </div>
              <div className="flex items-center gap-x-[6px]">
                <i className="ri-phone-line text-accent text-[24px]"></i>
                <div>(+84) 123123123</div>
              </div>
              <div className="flex items-center gap-x-[6px]">
                <i className="ri-mail-line text-accent text-[24px]"></i>
                <div>DHLdiamond@gmail.com</div>
              </div>
            </div>
            <div className="flex gap-[14px] text-[30px]">
              <div className="p-[10px] rounded-[10px] shadow-custom2 text-accent-tertiary hover:text-accent cursor-pointer transition-all">
                <i className="ri-facebook-circle-line"></i>
              </div>
              <div className="p-[10px] rounded-[10px] shadow-custom2 text-accent-tertiary hover:text-accent cursor-pointer transition-all">
                <i className="ri-instagram-line"></i>
              </div>
              <div className="p-[10px] rounded-[10px] shadow-custom2 text-accent-tertiary hover:text-accent cursor-pointer transition-all">
                <i className="ri-twitter-x-line"></i>
              </div>
              <div className="p-[10px] rounded-[10px] shadow-custom2 text-accent-tertiary hover:text-accent cursor-pointer transition-all">
                <i className="ri-pinterest-line"></i>
              </div>
            </div>
          </div>
          {/* about */}
          <div className="flex-1">
            <h4 className="h4 mb-5 uppercase text-accent">Về chúng tôi</h4>
            <hr className="w-[20%] border-2 mb-3" />
            <ul className="flex-1 flex-col gap-y-5">
              <li>
                <Link to="/about" className="hover:text-accent transition-all">
                  Câu chuyện DHL
                </Link>
              </li>
              <li>
                <Link to="/recruitment" className="hover:text-accent transition-all">
                  Tuyển dụng
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-accent transition-all">
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link to="/question" className="hover:text-accent transition-all">
                  Câu hỏi thường gặp
                </Link>
              </li>
              <li>
                <Link to="/prices-table" className="hover:text-accent transition-all">
                  Bảng giá kim cương
                </Link>
              </li>
              <li>
                <Link to="/handbook" className="hover:text-accent transition-all">
                  Cẩm nang kim cương
                </Link>
              </li>

            </ul>
          </div>
          {/* policy */}
          <div className="flex-1">
            <h4 className="h4 mb-5 uppercase text-accent">Các chính sách</h4>
            <ul className="flex-1 flex-col gap-y-5">  <hr className="w-[20%] border-2 mb-3" />
              <li>
                <Link to="/exchange-and-return" className="hover:text-accent transition-all">
                  Thu đổi sản phẩm
                </Link>
              </li>
              <li>
                <Link to="/privacy-shipping" className="hover:text-accent transition-all">
                  Chính sách giao hàng
                </Link>
              </li>
              <li>
                <Link to="/privacy-exchange-and-return" className="hover:text-accent transition-all">
                  Chính sách đổi trả
                </Link>
              </li>
              <li>
                <Link to="/privacy-warranty" className="hover:text-accent transition-all">
                  Chính sách bảo hành
                </Link>
              </li>
              <li>
                <Link to="/term-of-use" className="hover:text-accent transition-all">
                  Điều khoản sử dụng
                </Link>
              </li>
              <li>
                <Link to="/privacy-secrecy" className="hover:text-accent transition-all">
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link to="/commit-case" className="hover:text-accent transition-all">
                  Cam kết về vỏ trang sức
                </Link>
              </li>
              <li>
                <Link to="/commit-diamond" className="hover:text-accent transition-all">
                  Cam kết về kim cương
                </Link>
              </li>
            </ul>
          </div>
          {/* instruction */}
          <div className="flex-1">
            <h4 className="h4 mb-5 uppercase text-accent">Kiến thức và hướng dẫn</h4>
            <ul className="flex-1 flex-col gap-y-5">  <hr className="w-[20%] border-2 mb-3" />
              <li>
                <Link to="/knowledge" className="hover:text-accent transition-all">
                  Kiến thức về kim cương
                </Link>
              </li>
              <li>
                <Link to="/preserved" className="hover:text-accent transition-all">
                  Hướng dẫn bảo quản
                </Link>
              </li>
              <li>
                <Link to="" className="hover:text-accent transition-all">
                  Hướng dẫn mua hàng và thanh toán
                </Link>
              </li>
              <li>
                <Link to="/ring-size" className="hover:text-accent transition-all">
                  Hướng dẫn đo size: Nhẫn
                </Link>
              </li>
              <li>
                <Link to="/necklace-size" className="hover:text-accent transition-all">
                  Hướng dẫn đo size: Dây chuyền
                </Link>
              </li>
              <li>
                <Link to="/bracelet-size" className="hover:text-accent transition-all">
                  Hướng dẫn đo size: Vòng tay
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Map />
      <div className="py-[30px] border-t">
        <div className="container mx-auto text-center">
          <div className="font-light text-base">
            Copyright &copy; 2024 DHL Diamond - All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
