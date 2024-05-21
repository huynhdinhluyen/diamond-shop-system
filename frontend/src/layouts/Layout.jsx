/* eslint-disable react/prop-types */
import Footer from "../components/Footer";
import Header from "../components/Header";
import Newsletter from "../components/Newsletter";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="mx-auto flex-1 py-10">{children}</div>
      <Newsletter />
      <Footer />
    </div>
  );
}
