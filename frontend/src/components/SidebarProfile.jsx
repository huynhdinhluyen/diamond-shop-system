/* eslint-disable react/prop-types */
import { useAuth } from "../hooks/useAuth"
import MyProfile from "./MyProfile";
import MyOrder from "./MyOrder";
import MyAddress from "./MyAddress";

export default function SidebarProfile({ onMainComponentChange }) {

    const handleClick = (item) => {
        onMainComponentChange(item);
        console.log(item)
    };

    const items = [
        {
            icon: "ri-file-user-line mr-2",
            name: "Chỉnh sửa hồ sơ",
            component: <MyProfile />
        },
        {
            icon: "ri-shopping-bag-line mr-2",
            name: "Đơn hàng của tôi",
            component: <MyOrder />
        },
        {
            icon: "ri-user-location-fill mr-2",
            name: "Địa chỉ",
            component: <MyAddress />
        },
    ]

    const { user } = useAuth();

    return (
        <div className="col-span-3">
            <div className="flex mb-4">
                <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg" className="w-[60px] h-[60px] rounded-full mr-3" alt="user" />
                <div className="">
                    <p className="text-md">{user.username}</p>
                    <div className="flex items-center">
                        <i className="ri-edit-fill text-gray-300 mr-2"></i>
                        <p className="text-md">Chỉnh sửa</p>
                    </div>
                </div>
            </div>
            <ul className="list-none">
                {items.map((item, index) => (
                    <li onClick={() => handleClick(item.component)} key={index} className="mb-2 p-2 w-full bg-gray-200 text-center hover:bg-accent hover:text-white transition-all duration-300 cursor-pointer">
                        <i className={item.icon}></i>
                        {item.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}
