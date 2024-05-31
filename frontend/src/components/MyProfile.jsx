import { useAuth } from "../hooks/useAuth"

export default function MyProfile() {
    const { user } = useAuth();
    return (
        <div className="col-span-9 ml-10">
            <div>
                <h3 className="h3">Hồ sơ của tôi</h3>
                <p className="text-gray-400">Quản lý thông tin hồ sơ</p>
            </div>
            <hr className="w-full text-gray-300" />
            <div className="mt-5 ">
                <div className="flex justify-between">
                    <div className="flex items-center w-1/2">
                        <label htmlFor="" className="mr-5">Họ:</label>
                        <input type="text" defaultValue={user.lastName} className="outline-none border focus:border-accent transition-all rounded-md duration-300 py-1 px-3 w-[80%]" />
                    </div>
                    <div className="flex items-center w-1/2">
                        <label htmlFor="" className="mr-5">Tên:</label>
                        <input type="text" defaultValue={user.firstName} className="outline-none border focus:border-accent transition-all rounded-md duration-300 py-1 px-3 w-full" />
                    </div>
                </div>
                <div className="flex items-center mt-5">
                    <label htmlFor="" className="mr-5 text-nowrap">Tên đăng nhập:</label>
                    <input type="text" defaultValue={user.username} className="outline-none border focus:border-accent transition-all rounded-md duration-300 py-1 px-3 w-full" />
                </div>
                <div className="mt-5 flex items-center">
                    <label htmlFor="" className="mr-5 text-nowrap">Email:</label>
                    <input type="text" defaultValue={user.email} className="outline-none border focus:border-accent transition-all rounded-md duration-300 py-1 px-3 w-full" />
                </div>
                <div className="mt-5 flex items-center">
                    <label htmlFor="" className="mr-5 text-nowrap">Số điện thoại:</label>
                    <input type="text" defaultValue={user.phoneNumber} className="outline-none border focus:border-accent transition-all rounded-md duration-300 py-1 px-3 w-full" />
                </div>
                <button className="btn btn-accent btn-sm mt-5">Lưu</button>
            </div>
            <div className="mt-10">
                <h3 className="h3">Thay đổi mật khẩu</h3>
                <div className="mt-5 flex items-center">
                    <label htmlFor="" className="mr-5 text-nowrap">Mật khẩu cũ:</label>
                    <input type="text" className="outline-none border focus:border-accent transition-all rounded-md duration-300 py-1 px-3 w-full" />
                </div>
                <div className="mt-5 flex items-center">
                    <label htmlFor="" className="mr-5 text-nowrap">Mật khẩu mới: </label>
                    <input type="text" className="outline-none border focus:border-accent transition-all rounded-md duration-300 py-1 px-3 w-full" />
                </div>
                <div className="mt-5 flex items-center">
                    <label htmlFor="" className="mr-5 text-nowrap">Nhập lại mật khẩu mới:</label>
                    <input type="text" className="outline-none border focus:border-accent transition-all rounded-md duration-300 py-1 px-3 w-full" />
                </div>
                <button className="btn btn-accent btn-sm mt-5">Lưu</button>
            </div>
        </div>

    )
}
