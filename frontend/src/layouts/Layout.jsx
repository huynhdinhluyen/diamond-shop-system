/* eslint-disable react/prop-types */
import Footer from "../components/Footer";
import Header from "../components/Header";
import Newsletter from "../components/Newsletter";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAuth } from "../hooks/useAuth";

export default function Layout({ children }) {
  const { user } = useAuth();
  console.log(user);
  return (
    user == null || user.role === 'CUSTOMER' ? (
      <div className="relative flex flex-col min-h-screen">
        <Header />
        <div className="container mx-auto flex-1 py-10 md:py-0">{children}</div>
        <Newsletter />
        <Footer />
        <div className="lg:hidden absolute sm:flex bottom-0">
          <ShoppingCartIcon />
        </div>
      </div>
    ) : (
      <div className="text-center mt-8 text-red-500 font-bold text-4xl">Bạn không có quyền truy cập trang này!</div>
    )

  );
}
