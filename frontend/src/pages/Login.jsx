/* eslint-disable no-dupe-else-if */
// import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
// import jwt_decode from "jwt-decode";
import { useForm } from "react-hook-form";
// import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Input from "../components/Input";

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
    // formState: { errors },
  } = useForm();

  const { login } = useAuth();

  const submit = async ({ username, password }) => {
    const success = await login(username, password);
    if (success) {
      navigate("/");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white flex rounded-2xl shadow-lg max-w-4xl p-5 items-center">
        <div className="md:w-1/2 px-16">
          <h2 className="font-bold text-2xl text-accent text-center">
            Đăng nhập
          </h2>
          <p className="text-sm my-4 text-center uppercase tracking-[1px]">
            Chào mừng bạn đến với cửa hàng kim cương DHL
          </p>
          <form
            onSubmit={handleSubmit(submit)}
            noValidate
            className="flex flex-col gap-y-4"
          >
            <Input type="username"
              name="username"
              placeholder="Tên đăng nhập"
              {...register("username", {
                required: true,
              })}
            />
            <Input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              {...register("password", {
                required: true,
              })}
            />
            <button className="btn btn-lg btn-accent rounded-xl" type="submit">
              Đăng nhập
            </button>
            <div className="flex justify-between my-5">
              <Link to="/forgot" className=" text-md hover:underline">
                Quên mật khẩu?
              </Link>
              <Link to="/signup" className=" text-md hover:underline">
                Đăng ký ngay
              </Link>
            </div>
          </form>
          <div className=" grid grid-cols-3 items-center text-gray-500">
            <hr className="border-gray-400" />
            <p className="text-center">Or</p>
            <hr className="border-gray-400" />
          </div>

          <button className="flex border py-1 px-5 mt-3 mx-auto hover:bg-gray-50">
            <i className="ri-google-fill text-accent mr-2"></i>
            <span>Đăng nhập với Google</span>
          </button>
          <Link
            className="text-md flex justify-center mt-4 hover:underline transition-all duration-300"
            to="/"
          >
            Trở về trang chủ
          </Link>
        </div>

        <div className="md:block hidden w-1/2">
          <img src="https://images.unsplash.com/photo-1527628173875-3c7bfd28ad78?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="" />
        </div>
      </div>
    </div>
  );
}