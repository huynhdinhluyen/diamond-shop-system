/* eslint-disable react/prop-types */
import Footer from "../components/Footer";
import Header from "../components/Header";
import Newsletter from "../components/Newsletter";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PhoneButton from "../components/PhoneButton";

export default function Layout({ children }) {
  return (
    <div className="relative flex flex-col min-h-screen">
      <Header />
      <div className="container mx-auto flex-1 py-10">{children}</div>
      <Newsletter />
      <Footer />
      <div className="lg:hidden absolute sm:flex bottom-0">
        <ShoppingCartIcon />
      </div>
      <PhoneButton />
    </div>
  );
}
