import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";

function AdminLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar open={drawerOpen} onClose={toggleDrawer} />
      <div className="flex flex-col w-full">
        <AdminHeader onToggleSidebar={toggleDrawer} />
        <main className="container flex-grow p-4 mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
