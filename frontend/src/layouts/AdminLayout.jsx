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
    user && user.role === "ADMIN" ? (
      <div className="flex h-screen">
        <AdminSidebar open={drawerOpen} onClose={toggleDrawer} />
        <div className="flex flex-col w-full">
          <AdminHeader onToggleSidebar={toggleDrawer} />
          <main className="container flex-grow p-4 mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
    ) : (
      <div className="text-center mt-8">Bạn không có quyền truy cập!</div>
    )
  );
}

export default AdminLayout;