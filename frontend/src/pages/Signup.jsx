import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white flex rounded-2xl shadow-lg max-w-4xl p-5 items-center">
        <div className="md:block hidden w-1/2">
          <img 
            src="/src/assets/img/register/cover.jpg"
            alt="" />
        </div>

        <div className="md:w-1/2 px-6">
          <h2 className="font-bold text-2xl text-accent text-center">
            Đăng Ký
          </h2>
          <p className="text-sm my-2 text-center uppercase tracking-[1px]">
            Đăng ký ngay để nhận nhiều ưu đãi
          </p>
          <form className="flex flex-col gap-y-2">
            <div className="flex gap-x-4">
              <input
                className="py-2 px-4 rounded-xl border w-full outline-none focus:border-accent transition-all duration-300 placeholder:italic placeholder:text-sm"
                type="text"
                name="username"
                placeholder="Họ"
              />
              <input
                className="py-2 px-4 rounded-xl border w-full outline-none focus:border-accent transition-all duration-300 placeholder:italic placeholder:text-sm"
                type="text"
                name="username"
                placeholder="Tên"
              />
            </div>
            <input
              className="py-2 px-4 rounded-xl border w-full outline-none focus:border-accent transition-all duration-300 placeholder:italic placeholder:text-sm"
              type="text"
              name="username"
              placeholder="Tên đăng nhập"
            />
            <input
              className="py-2 px-4 rounded-xl border w-full outline-none focus:border-accent transition-all duration-300 placeholder:italic placeholder:text-sm"
              type="password"
              name="password"
              placeholder="Mật khẩu"
            />
            <input
              className="py-2 px-4 rounded-xl border w-full outline-none focus:border-accent transition-all duration-300 placeholder:italic placeholder:text-sm"
              type="password"
              name="password"
              placeholder="Nhập lại mật khẩu"
            />
            <input
              className="py-2 px-4 rounded-xl border w-full outline-none focus:border-accent transition-all duration-300 placeholder:italic placeholder:text-sm"
              type="text"
              name="email"
              placeholder="Email"
            />
            <input
              className="py-2 px-4 rounded-xl border w-full outline-none focus:border-accent transition-all duration-300 placeholder:italic placeholder:text-sm"
              type="text"
              name="phone"
              placeholder="Số điện thoại"
            />
            <input
              className="py-2 px-4 rounded-xl border w-full outline-none focus:border-accent transition-all duration-300 placeholder:italic placeholder:text-sm"
              type="text"
              name="address"
              placeholder="Địa chỉ"
            />
            <input
              className="py-2 px-4 rounded-xl border w-full outline-none focus:border-accent transition-all duration-300 placeholder:italic placeholder:text-sm"
              type="text"
              name="city"
              placeholder="Thành phố"
            />
            <button className="btn btn-sm btn-accent mt-2">Đăng ký</button>
            <div className="flex flex-col gap-y-2 items-center mt-2 ">
              <Link to="/login" className=" text-md hover:underline">
                Quay lại đăng nhập nếu bạn đã có tài khoản
              </Link>
              <Link to="/" className=" text-md hover:underline">
                Trở về trang chủ
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
