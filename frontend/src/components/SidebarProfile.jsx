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
                <div className="">
                    <p className="text-md">Tên đăng nhập:
                        <span className="text-accent font-semibold"> {user.username}</span>
                    </p>
                    <p className="text-md">Điểm tích lũy của bạn: <span className="text-accent font-semibold">{user.points}</span> </p>
                    <p className="text-md">Thành viên: <span className="text-accent font-semibold">{translateMembershipLevel(user.membershipLevel.name)}</span></p>
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
