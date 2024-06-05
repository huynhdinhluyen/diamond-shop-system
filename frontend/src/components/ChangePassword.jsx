import { useForm } from 'react-hook-form'
import Input from "../components/Input";
import { useAuth } from '../hooks/useAuth';

export default function ChangePassword() {
    const { register,
        handleSubmit,
        getValues,
        formState: { errors }
    } = useForm();

    const { user, changePassword } = useAuth();

    const submit = (data) => {
        changePassword(data);
    }

    return (
        <div className="">
            <h3 className="h3">Thay đổi mật khẩu</h3>
            <p className='text-gray-400'>Đổi mật khẩu nếu bạn muốn</p>
            <hr />
            <form onSubmit={handleSubmit(submit)}>
                <div className="mt-5 flex items-center">
                    <Input
                        type="hidden"
                        name="username"
                        value={user.username}
                        {...register("username")}
                    />
                    <label htmlFor="" className="mr-5 text-nowrap">Mật khẩu cũ:</label>
                    <Input
                        type="password"
                        {...register("oldPassword", {
                            required: true
                        })}
                        error={errors.oldPassword}
                    />
                </div>
                <div className="mt-5 flex items-center">
                    <label htmlFor="" className="mr-5 text-nowrap">Mật khẩu mới: </label>
                    <Input
                        type="password"
                        {...register("newPassword", {
                            required: true,
                            minLength: 5
                        })}
                        error={errors.newPassword}
                    />
                </div>
                <div className="mt-5 flex items-center">
                    <label htmlFor="" className="mr-5 text-nowrap">Nhập lại mật khẩu mới:</label>
                    <Input
                        type="password"
                        {...register("confirmPassword", {
                            required: true,
                            validate: (value) => {
                                value != getValues("newPassword")
                                    ? "Mật khẩu không khớp!"
                                    : true
                            }
                        })}
                        error={errors.confirmPassword}
                    />
                </div>
                <button className="btn btn-accent btn-sm mt-5" type="submit">Lưu</button>
            </form>
        </div>
    )
}
