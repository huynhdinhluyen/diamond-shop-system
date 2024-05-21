import Logo from "./Logo";
export default function Footer() {
  return (
    <footer className="pt-12 xl:pt-[150px] ">
      <div className="container mx-auto xl:flex-row gap-x5 gap-y-10 mb-12">
        <div className="flex flex-col xl:flex-row gap-x-5 gap-y-10">
          {/* contact*/}
          <div className="flex-1">
            <a href="">
              <Logo />
            </a>

            <div className="flex flex-col gap-y-3 mb-10">
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
            <h4 className="h4 mb-5">Về chúng tôi</h4>
            <ul className="flex-1 flex-col gap-y-5">
              <li>
                <a href="" className="hover:text-accent transition-all">
                  Câu chuyện DHL
                </a>
              </li>
              <li>
                <a href="" className="hover:text-accent transition-all">
                  Tuyển dụng
                </a>
              </li>
              <li>
                <a href="" className="hover:text-accent transition-all">
                  Cảm nhận khách hàng
                </a>
              </li>
            </ul>
          </div>
          {/* policy */}
          <div className="flex-1">
            <h4 className="h4 mb-5">Các chính sách</h4>
            <ul className="flex-1 flex-col gap-y-5">
              <li>
                <a href="" className="hover:text-accent transition-all">
                  Đổi trả
                </a>
              </li>
              <li>
                <a href="" className="hover:text-accent transition-all">
                  Mua lại
                </a>
              </li>
              <li>
                <a href="" className="hover:text-accent transition-all">
                  Bảo hành
                </a>
              </li>
              <li>
                <a href="" className="hover:text-accent transition-all">
                  Điều khoản
                </a>
              </li>
            </ul>
          </div>
          {/* instruction */}
          <div className="flex-1">
            <h4 className="h4 mb-5">Kiến thức và hướng dẫn</h4>
            <ul className="flex-1 flex-col gap-y-5">
              <li>
                <a href="" className="hover:text-accent transition-all">
                  Blog
                </a>
              </li>
              <li>
                <a href="" className="hover:text-accent transition-all">
                  Kiến thức về kim cương
                </a>
              </li>
              <li>
                <a href="" className="hover:text-accent transition-all">
                  Kiến thức về các kim loại quý
                </a>
              </li>
              <li>
                <a href="" className="hover:text-accent transition-all">
                  Hướng dẫn bảo quản
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="py-[30px] border-t">
        <div className="container mx-auto text-center">
          <div className="font-light text-base">
            &copy; 2024 Insove - All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
