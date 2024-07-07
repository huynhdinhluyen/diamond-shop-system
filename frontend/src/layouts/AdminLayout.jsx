import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import { useAuth } from "../hooks/useAuth";

function AdminLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");

  }
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
      <div className="text-center mt-8 text-red-500 font-bold text-4xl">
        Bạn không có quyền truy cập trang này!
        <button className="btn btn-accent btn-lg mx-auto mt-10 text-lg" onClick={handleLogout}>Đăng xuất</button>
      </div>

    )
  );
}

export default AdminLayout;