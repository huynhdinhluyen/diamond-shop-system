import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { EMAIL } from "../components/Pattern";

export default function Signup() {
  const auth = useAuth();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors }
  } = useForm();

  const submit = async (formData) => {
    const success = await auth.register(formData);
    if (success) {
      navigate("/login");
    } else {
      navigate("/signup")
    }
  };

  const getErrorMessage = (error, fieldName) => {
    if (error.message) return error.message;
    switch (error.type) {
      case "required":
        return `${fieldName} không được bỏ trống!`;
      case "minLength":
        return `${fieldName} quá ngắn!`;
      case "pattern":
        return `Định dạng ${fieldName} không đúng!`;
      case "validate":
        return error.message;
      default:
        return "*";
    }
  };

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
          <form onSubmit={handleSubmit(submit)} noValidate className="flex flex-col gap-y-2">
            <div className="flex gap-x-4 relative">
              <div>
                <input
                  className="py-2 px-4 rounded-xl border w-full outline-none focus:border-accent transition-all duration-300 placeholder:italic placeholder:text-sm"
                  type="text"
                  name="lastName"
                  placeholder="Họ"
                  {...register("lastName", {
                    required: true,
                  })}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-center text-xs">{getErrorMessage(errors.lastName, "Họ")}</p>
                )}
              </div>
              <div>

                <input
                  className="py-2 px-4 rounded-xl border w-full outline-none focus:border-accent transition-all duration-300 placeholder:italic placeholder:text-sm"
                  type="text"
                  name="firstName"
                  placeholder="Tên"
                  {...register("firstName", {
                    required: true,
                  })}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-center text-xs">{getErrorMessage(errors.firstName, "Tên")}</p>
                )}
              </div>
            </div>
            <input
              className="py-2 relative px-4 rounded-xl border w-full outline-none focus:border-accent transition-all duration-300 placeholder:italic placeholder:text-sm"
              type="text"
              name="username"
              placeholder="Tên đăng nhập"
              {...register("username", {
                required: true,
                minLength: 5
              })}
            />
            {errors.username && (
              <p className="text-red-500 text-center text-xs">{getErrorMessage(errors.username, "Tên đăng nhập")}</p>
            )}
            <input
              className="py-2 px-4 rounded-xl border w-full outline-none focus:border-accent transition-all duration-300 placeholder:italic placeholder:text-sm"
              type="password"
              name="password"
              placeholder="Mật khẩu"
              {...register("password", {
                required: true,
                minLength: 5
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-center text-xs">{getErrorMessage(errors.password, "Mật khẩu")}</p>
            )}
            <input
              className="py-2 px-4 rounded-xl border w-full outline-none focus:border-accent transition-all duration-300 placeholder:italic placeholder:text-sm"
              type="password"
              name="password"
              placeholder="Nhập lại mật khẩu"
              {...register("confirmPassword", {
                required: true,
                validate: (value) => value === getValues("password") || "Mật khẩu không khớp!"
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-center text-xs">{getErrorMessage(errors.confirmPassword, "Nhập lại mật khẩu")}</p>
            )}
            <input
              className="py-2 px-4 rounded-xl border w-full outline-none focus:border-accent transition-all duration-300 placeholder:italic placeholder:text-sm"
              type="text"
              name="email"
              placeholder="Email"
              {...register("email", {
                required: true,
                pattern: EMAIL,
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-center text-xs">{getErrorMessage(errors.email, "Email")}</p>
            )}
            <input
              className="py-2 px-4 rounded-xl border w-full outline-none focus:border-accent transition-all duration-300 placeholder:italic placeholder:text-sm"
              type="text"
              name="phoneNumber"
              placeholder="Số điện thoại"
              {...register("phoneNumber", {
                required: true,
                minLength: 10
              })}
            />
            {errors.phone && (
              <p className="text-red-500 text-center text-xs">{getErrorMessage(errors.phone, "Số điện thoại")}</p>
            )}
            <input
              className="py-2 px-4 rounded-xl border w-full outline-none focus:border-accent transition-all duration-300 placeholder:italic placeholder:text-sm"
              type="text"
              name="address"
              placeholder="Địa chỉ"
              {...register("address", {
                required: true,
                minLength: 5
              })}
            />
            {errors.address && (
              <p className="text-red-500 text-center text-xs">{getErrorMessage(errors.address, "Địa chỉ")}</p>
            )}
            <input
              className="py-2 px-4 rounded-xl border w-full outline-none focus:border-accent transition-all duration-300 placeholder:italic placeholder:text-sm"
              type="text"
              name="city"
              placeholder="Thành phố"
              {...register("city", {
                required: true,
                minLength: 5
              })}
            />
            {errors.city && (
              <p className="text-red-500 text-center text-xs">{getErrorMessage(errors.city, "Thành phố")}</p>
            )}
            <button type="submit" className="btn btn-sm btn-accent mt-2">Đăng ký</button>
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
