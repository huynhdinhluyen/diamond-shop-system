import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import { useAuth } from "../hooks/useAuth";

function AdminLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user } = useAuth();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar open={drawerOpen} onClose={toggleDrawer} />
      <div className="flex flex-col w-full">
        <AdminHeader onToggleSidebar={toggleDrawer} />
        {user && user.role === "ADMIN" ? (
          <main className="container flex-grow p-4 mx-auto">
            <Outlet />
          </main>) : (<div className="text-center mt-8">Bạn không có quyền truy cập!</div>)}
      </div>
    </div>
  );
}

export default AdminLayout;
