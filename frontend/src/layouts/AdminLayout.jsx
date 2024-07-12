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

  return user && user.role === "ADMIN" ? (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar open={drawerOpen} onClose={toggleDrawer} />
      <div className="flex flex-col w-full">
        <AdminHeader onToggleSidebar={toggleDrawer} />
        <main className="container p-4 flex-grow mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  ) : (
    <div className="mt-8 text-center text-red-500 font-bold text-4xl">
      Bạn không có quyền truy cập trang này!
    </div>
  );
}

export default AdminLayout;