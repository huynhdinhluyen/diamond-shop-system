import { useAuth } from "../hooks/useAuth";
import Input from "../components/Input"
import { useForm } from "react-hook-form";

export default function MyAddress() {
    const { user, updateProfile, refreshUser } = useAuth();

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
            address: user?.address || ""
        }
    });

    const submit = (user) => {
        updateProfile(user)
        refreshUser();
    }

    return (
        <div className="ml-10">
            <div className="md:flex md:flex-row flex-col justify-between mb-5">
                <h3 className="h3 mb-3 md:mb-0">Địa chỉ nhận hàng</h3>
            </div>
            <hr />
            <div>
                {user &&
                    <div className="">
                        <form onSubmit={handleSubmit(submit)}>
                            <p>{user.lastName} {user.firstName}</p>
                            <Input
                                type="text"
                                defaultValue={user.address}
                                {...register("address", {
                                    required: true,
                                })}
                                error={errors.address}
                            />
                            <button className="btn btn-accent btn-sm mt-5" type="submit">Thay đổi</button>
                        </form>
                    </div>
                }
            </div>
        </div>
    );
}
