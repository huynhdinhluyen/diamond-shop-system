import { useAuth } from "../hooks/useAuth"
import Input from "../components/Input"
import { useForm } from "react-hook-form";
import { EMAIL, NAME, PHONE_NUMBER } from "../components/Pattern"
import { updateProfile } from "../service/userService";
import ChangePassword from "./ChangePassword";
export default function MyProfile() {
    const { user } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const submit = (user) => {
        updateProfile(user);
    }

    return (
        <div className="col-span-9 ml-10 grid grid-cols-9">
            <div className="col-span-5">
                <div>
                    <h3 className="h3">Hồ sơ của tôi</h3>
                    <p className="text-gray-400">Quản lý thông tin hồ sơ cá nhân</p>
                </div>
                <hr className="w-full text-gray-300" />
                <div className="mt-5">
                    <form onSubmit={handleSubmit(submit)}>
                        <div className="flex items-center ">
                            <label htmlFor="" className="mr-5">Họ:</label>
                            <Input
                                type="text"
                                defaultValue={user.lastName}
                                {...register("lastName", {
                                    required: true,
                                    pattern: NAME
                                })}
                                errors={errors.lastName}
                            />
                        </div>
                        <div className="flex items-center w-1/2 mt-5">
                            <label htmlFor="" className="mr-5">Tên:</label>
                            <Input
                                type="text"
                                defaultValue={user.firstName}
                                {...register("firstName", {
                                    required: true,
                                    pattern: NAME
                                })}
                                errors={errors.firstName}
                            />
                        </div>
                        <div className="flex items-center mt-5">
                            <label htmlFor="" className="mr-5 text-nowrap">Tên đăng nhập:</label>
                            <Input
                                type="text"
                                defaultValue={user.username}
                                {...register("username", {
                                    required: true,
                                    minLength: 5
                                })}
                                errors={errors.username}
                            />
                        </div>
                        <div className="mt-5 flex items-center">
                            <label htmlFor="" className="mr-5 text-nowrap">Email:</label>
                            <Input
                                type="email"
                                defaultValue={user.email}
                                {...register("email", {
                                    required: true,
                                    pattern: EMAIL
                                })}
                                errors={errors.email}
                            />
                        </div>
                        <div className="mt-5 flex items-center">
                            <label htmlFor="" className="mr-5 text-nowrap">Số điện thoại:</label>
                            <Input
                                type="text"
                                defaultValue={user.phoneNumber}
                                {...register("phoneNumber", {
                                    required: true,
                                    pattern: PHONE_NUMBER
                                })}
                                errors={errors.phoneNumber}
                            />
                        </div>
                        <button className="btn btn-accent btn-sm mt-5" type="submit">Lưu</button>
                    </form>
                </div>
            </div>
            <div className="col-span-4">
                <ChangePassword />
            </div>
        </div>

    )
}
