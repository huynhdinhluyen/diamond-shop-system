// import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
// import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
// import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { EMAIL } from "../components/Pattern";

export default function Login() {
  // const [userName, setUserName] = useState("");

  // const clientId =
  //   "419187574922-ir8o56i63i3lpu4q86nedcv3p9lmjqn7.apps.googleusercontent.com";
  // const onSuccess = (response) => {
  //   const userObject = jwt_decode(response.credential);
  //   setUserName(userObject);
  //   console.log(userObject.given_name);
  //   localStorage.setItem("user", userObject.given_name);
  // };
  // const onFailure = (res) => {
  //   console.log("Login Failed: ", res);
  // };
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const { user, login } = useAuth();

  const submit = async ({ email, password }) => {
    await login(email, password);
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white flex rounded-2xl shadow-lg max-w-4xl p-5 items-center">
        <div className="md:w-1/2 px-16">
          <h2 className="font-bold text-2xl text-accent text-center">
            Đăng nhập
          </h2>
          <p className="text-sm mt-4 text-center uppercase tracking-[1px]">
            Chào mừng bạn đến với cửa hàng kim cương DHL
          </p>
          <form
            onSubmit={handleSubmit(submit)}
            noValidate
            className="flex flex-col gap-y-4"
          >
            <input
              className="py-2 px-4 mt-8 rounded-xl border w-full outline-none focus:border-accent transition-all duration-300 placeholder:italic placeholder:text-sm"
              type="email"
              name="email"
              placeholder="Email"
              {...register("email", {
                required: true,
                pattern: EMAIL,
              })}
            />
            <div className="relative">
              <input
                className="py-2 px-4 rounded-xl border w-full outline-none focus:border-accent transition-all duration-300 placeholder:italic placeholder:text-sm"
                type="password"
                name="password"
                placeholder="Mật khẩu"
                {...register("password", {
                  required: true,
                })}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            <button className="btn btn-lg btn-accent rounded-xl" type="submit">
              Đăng nhập
            </button>
            <div className="flex justify-between my-5">
              <Link to="/forgot" className=" text-xs hover:underline">
                Quên mật khẩu?
              </Link>
              <Link to="/signup" className=" text-xs hover:underline">
                Đăng ký ngay
              </Link>
            </div>
          </form>
          <div className=" grid grid-cols-3 items-center text-gray-500">
            <hr className="border-gray-400" />
            <p className="text-center">Or</p>
            <hr className="border-gray-400" />
          </div>

          {/* <div className="flex justify-center mt-3">
            <GoogleOAuthProvider clientId={clientId}>
              <GoogleLogin onSuccess={onSuccess} onFailure={onFailure} />
            </GoogleOAuthProvider>
          </div> */}
          <Link className="text-xs flex justify-center mt-4" to="/">
            Trở về trang chủ
          </Link>
        </div>

        <div className="md:block hidden w-1/2">
          <img src="/src/assets/img/login/cover2.jpg" alt="" className="" />
        </div>
      </div>
    </div>
  );
}
