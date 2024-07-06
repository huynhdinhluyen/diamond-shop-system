import { useState } from "react";
import MyProfile from "../components/MyProfile";
import { useAuth } from "../hooks/useAuth";
import SidebarStaffProfile from "../components/SidebarStaffProfile";

export default function ProfileStaffLayout() {
    const { user } = useAuth();
    const [mainComponent, setMainComponent] = useState(<MyProfile />);

    const handleMainComponentChange = (component) => {
        setMainComponent(component);
    };

    return (
        user ? (
            <div className="grid grid-cols-12 lg:mt-10">
                <SidebarStaffProfile onMainComponentChange={handleMainComponentChange} />
                <div className="col-span-12 lg:col-span-9">
                    {mainComponent}
                </div>
            </div>
        ) : null
    );
}
