import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Layout({children}) {
  return (
    <div className="flex flex-col min-h-screen">
        <Header />
        <div className="mx-auto flex-1">{children}</div>
        <Footer />
    </div>
  )
}
