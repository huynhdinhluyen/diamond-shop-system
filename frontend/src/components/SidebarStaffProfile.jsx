/* eslint-disable react/prop-types */
import { useAuth } from "../hooks/useAuth";
import MyProfile from "./MyProfile";
import ChangePassword from "./ChangePassword";

export default function SidebarStaffProfile({ onMainComponentChange }) {

    const handleClick = (item) => {
        onMainComponentChange(item.component);
    };

    const items = [
        {
            icon: "ri-file-user-line mr-2",
            name: "Chỉnh sửa hồ sơ",
            component: <MyProfile />
        },
        {
            icon: "ri-lock-password-line mr-2",
            name: "Thay đổi mật khẩu",
            component: <ChangePassword />
        },
    ];

    const { user } = useAuth();

    return (
        <div className="lg:col-span-3 col-span-12">
            <div className="flex items-center mb-4">
                <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg" className="w-[60px] h-[60px] rounded-full mr-3" alt="user" />
                <div className="">
                    <p className="text-md">{user.username}</p>
                </div>
            </div>
            <ul className="list-none md:flex md:flex-row sm:flex-col gap-x-2 mb-4 lg:block">
                {items.map((item, index) => (
                    <li onClick={() => handleClick(item)} key={index} className={`mb-2 p-2 w-full bg-gray-200 text-center hover:bg-accent hover:text-white transition-all duration-300 cursor-pointer text-nowrap focus:bg-gray-200 focus-within:bg-accent`}>
                        <i className={item.icon}></i>
                        {item.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}
