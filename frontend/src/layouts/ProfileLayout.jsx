import { useState, useEffect } from "react";
import MyProfile from "../components/MyProfile";
import SidebarProfile from "../components/SidebarProfile";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function ProfileLayout() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [mainComponent, setMainComponent] = useState(<MyProfile />);

    const handleMainComponentChange = (component) => {
        setMainComponent(component);
    };

    // Sử dụng useEffect để điều hướng nếu người dùng không tồn tại
    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        user ? (
            <div className="grid grid-cols-12 mt-10">
                <SidebarProfile onMainComponentChange={handleMainComponentChange} />
                <div className="col-span-9">
                    {mainComponent}
                </div>
            </div>
        ) : null // Trả về null hoặc một loader trong khi chờ điều hướng
    );
}
