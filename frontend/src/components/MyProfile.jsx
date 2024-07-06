import { useAuth } from "../hooks/useAuth"
import Input from "../components/Input"
import { useForm } from "react-hook-form";
import { EMAIL, NAME, PHONE_NUMBER } from "../components/Pattern"
export default function MyProfile() {
    const { user, updateProfile } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            lastName: user?.lastName || "",
            firstName: user?.firstName || "",
            username: user?.username || "",
            email: user?.email || "",
            phoneNumber: user?.phoneNumber || "",
        }
    });

    const submit = async (user) => {
        updateProfile(user);
    }

    return (
        <div className="w-full lg:ml-5">
            <div>
                <h3 className="h3">Hồ sơ của tôi</h3>
                <p className="text-gray-400">Quản lý thông tin hồ sơ cá nhân</p>
            </div>
            <hr className="w-full text-gray-300" />
            <div className="mt-5">
                <form onSubmit={handleSubmit(submit)}>
                    <div className="flex-grow items-center ">
                        <label htmlFor="" className="lg:mr-5">Họ:</label>
                        <Input
                            type="text"
                            defaultValue={user.lastName}
                            {...register("lastName", {
                                required: true,
                                pattern: NAME
                            })}
                            error={errors.lastName}
                        />
                    </div>
                    <div className="flex-grow items-center w-full mt-5">
                        <label htmlFor="" className="lg:mr-5">Tên:</label>
                        <Input
                            type="text"
                            defaultValue={user.firstName}
                            {...register("firstName", {
                                required: true,
                                pattern: NAME
                            })}
                            error={errors.firstName}
                        />
                    </div>
                    <div className="flex-grow items-center mt-5">
                        <label htmlFor="" className="lg:mr-5 text-nowrap">Tên đăng nhập:</label>
                        <Input
                            type="text"
                            defaultValue={user.username}
                            {...register("username", {
                                required: true,
                                minLength: 5
                            })}
                            error={errors.username}
                        />
                    </div>
                    <div className="mt-5 flex-grow items-center">
                        <label htmlFor="" className="mr-5 text-nowrap">Email:</label>
                        {user.role === 'SALES_STAFF' || user.role === 'DELIVERY_STAFF' ? <Input
                            type="email"
                            defaultValue={user.email}
                            disabled
                            {...register("email", {
                                required: true,
                                pattern: EMAIL
                            })}
                            error={errors.email}
                        /> : <Input
                            type="email"
                            defaultValue={user.email}
                            {...register("email", {
                                required: true,
                                pattern: EMAIL
                            })}
                            error={errors.email}
                        />}
                    </div>
                    <div className="mt-5 flex-grow items-center">
                        <label htmlFor="" className="mr-5 text-nowrap">Số điện thoại:</label>
                        <Input
                            type="text"
                            defaultValue={user.phoneNumber}
                            {...register("phoneNumber", {
                                required: true,
                                pattern: PHONE_NUMBER
                            })}
                            error={errors.phoneNumber}
                        />
                    </div>
                    <button className="btn btn-accent btn-sm mt-5" type="submit">Lưu</button>
                </form>
            </div>
        </div>
    )
}
