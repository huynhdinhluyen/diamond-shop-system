/* eslint-disable react/prop-types */
import Footer from "../components/Footer";
import Header from "../components/Header"
import { useAuth } from "../hooks/useAuth";
import Map from "../components/Map"
export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const handleLogout = () => {
    logout();
  }

  return (
    user == null || (user.role === 'CUSTOMER' && !user.blocked) || user.role === 'ADMIN' ? (
      <div className="relative flex flex-col min-h-screen">
        <Header />
        <div className="container mx-auto flex-1 lg:py-8 py-0">{children}</div>
        <Map />
        <Footer />
      </div>
    ) : (
      <h2 className="text-center mt-8 text-red-500 font-bold text-4xl">
        Bạn không có quyền truy cập trang này!
        {user && user.blocked && <h3 className="text-center mt-8 text-red-500 font-bold text-3xl">Tài khoản của bạn đã bị chặn</h3>}
        <button className="btn btn-accent btn-lg mx-auto mt-10 text-lg" onClick={handleLogout}>Đăng xuất</button>
      </h2>
    )

  );
}
