import { useAuth } from "../hooks/useAuth"

export default function MyAddress() {
    const { user } = useAuth();
    return (
        <div className="ml-10">
            <div className="md:flex md:flex-row flex-col justify-between mb-5">
                <h3 className="h3 mb-3 md:mb-0">Địa chỉ nhận hàng</h3>
                <button className="px-5 py-2 text-white bg-accent">
                    <i className="ri-add-line text-white mr-2"></i>
                    Thêm địa chỉ mới
                </button>
            </div>
            <hr />
            <div>
                {user &&
                    <div className="flex justify-between items-center">
                        <div>
                            <p>{user.lastName} {user.firstName}</p>
                            <p>{user.address}</p>
                        </div>
                        <div className="hover:text-accent hover:underline transition-all duration-300 cursor-pointer">Sửa</div>
                    </div>
                }
            </div>
        </div>
    )
}
