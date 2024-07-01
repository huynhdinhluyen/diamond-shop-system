/* eslint-disable react/prop-types */
import { useAuth } from "../hooks/useAuth";
import MyProfile from "./MyProfile";
import MyOrder from "./MyOrder";
import MyAddress from "./MyAddress";
import ChangePassword from "./ChangePassword";

export default function SidebarProfile({ onMainComponentChange }) {

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
            icon: "ri-shopping-bag-line mr-2",
            name: "Đơn hàng của tôi",
            component: <MyOrder />
        },
        {
            icon: "ri-user-location-fill mr-2",
            name: "Địa chỉ",
            component: <MyAddress />
        },
        {
            icon: "ri-lock-password-line mr-2",
            name: "Thay đổi mật khẩu",
            component: <ChangePassword />
        },
    ];

    const { user } = useAuth();

    const translateMembershipLevel = (membershipLevel) => {
        switch (membershipLevel.toLowerCase()) {
            case "bronze":
                return "Đồng";
            case "silver":
                return "Bạc";
            case "diamond":
                return "Kim cương";
            case "platinum":
                return "Bạch kim";
            default:
                return membershipLevel;
        }
    };

    return (
        <div className="lg:col-span-3 col-span-12">
            <div className="flex mb-4">
                <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg" className="w-[60px] h-[60px] rounded-full mr-3" alt="user" />
                <div className="">
                    <p className="text-md">{user.username}</p>
                    <p className="text-accent font-semibold">Điểm tích lũy của bạn: {user.points}</p>
                    <p className="text-accent font-semibold">Thành viên {translateMembershipLevel(user.membershipLevel.name)}</p>
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
