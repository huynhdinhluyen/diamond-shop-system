import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NewsDetails from "./pages/NewsDetails";
import Contact from "./pages/Contact";
import Knowledge from "./pages/Knowledge";
import AdminLayout from "./layouts/AdminLayout";
import ProfileLayout from "./layouts/ProfileLayout";
import TablePricesDiamond from "./pages/TablePricesDiamond";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import AdminProductManagement from "./pages/AdminProductManagement";
import AdminCategoryManagement from "./pages/AdminCategoryManagement";
import AdminUserManagement from "./pages/AdminUserManagement";
import AdminDiamondCasingManagement from "./pages/AdminDiamondCasingManagement";
import AdminDiamondManagement from "./pages/AdminDiamondManagement";
import NotFoundPage from "./pages/NotFoundPage";
import ManagerLayout from "./layouts/ManagerLayout";
import Dashboard from "./pages/Dashboard";
import CustomerManagement from "./pages/CustomerManagement";
import SaleStaffManagement from "./pages/SaleStaffManagement";
import DeliveryStaffManagement from "./pages/DeliveryStaffManagement";
import KnowledgeDetails from "./pages/KnowlegeDetails";
import ScrollToTop from "./components/ScrollToTop";
import Recruitment from "./pages/Recruitment";
import RingSize from "./pages/RingSize";
import BraceletSize from "./pages/BraceletSize";
import NecklaceSize from "./pages/NecklaceSize";
import Question from "./pages/Question";
import Handbook from "./pages/Handbook";
import ExchangeAndReturn from "./pages/ExchangeAndReturn";
import PrivacyExchangeAndReturn from "./pages/PrivacyExchangeAndReturn";
import PrivacyShipping from "./pages/PrivacyShipping";
import PrivacyWarranty from "./pages/PrivacyWarranty";
import TermOfUse from "./pages/TermOfUse";
import PrivacySecrecy from "./pages/PrivacySecrecy";
import CommitCase from "./pages/CommitCase";
import CommitDiamond from "./pages/CommitDiamond";
import Preserved from "./pages/Preserved";
import Payment from "./pages/Payment";
import OrderDetail from "./pages/OrderDetail";
import MyOrder from "./components/MyOrder";
import Products from "./pages/Products";
import SalesStaffLayout from "./layouts/SalesStaffLayout";
import OrderListOfSalesStaff from "./pages/OrderListOfSalesStaff";
import OrderDetailOfSalesStaff from "./pages/OrderDetailOfSalesStaff";
import DeliveryStaffLayout from "./layouts/DeliveryStaffLayout";
import OrderListOfDeliveryStaff from "./pages/OrderListOfDeliveryStaff";
import OrderHistoryOfDeliveryStaff from "./pages/OrderHistoryOfDeliveryStaff";
import OrderDetailOfDeliveryStaff from "./pages/OrderDetailOfDeliveryStaff";
import ScrollToTopButton from "./components/ScrollToTopButton";
import ProfileStaffLayout from "./layouts/ProfileSaleStaffLayout";

function App() {
  return (
    <div className="scroll-smooth focus:scroll-auto">
      <ScrollToTop />
      <ScrollToTopButton />
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />

        <Route
          path="/about"
          element={
            <Layout>
              <About />
            </Layout>
          }
        />

        <Route
          path="/knowledge"
          element={
            <Layout>
              <Knowledge />
            </Layout>
          }
        />

        <Route
          path="/knowledge/:sectionId"
          element={
            <Layout>
              <KnowledgeDetails />
            </Layout>
          }
        />

        <Route
          path="/news/:sectionId"
          element={
            <Layout>
              <NewsDetails />
            </Layout>
          }
        />

        <Route
          path="/contact"
          element={
            <Layout>
              <Contact />
            </Layout>
          }
        />

        <Route
          path="/profile"
          element={
            <Layout>
              <ProfileLayout />
            </Layout>
          }
        />

        <Route
          path="/my-order"
          element={
            <Layout>
              <MyOrder />
            </Layout>
          }
        />

        <Route
          path="/prices-table"
          element={
            <Layout>
              <TablePricesDiamond />
            </Layout>
          }
        />

        <Route
          path="/cart"
          element={
            <Layout>
              <Cart />
            </Layout>
          }
        />

        <Route
          path="/product/:productId"
          element={
            <Layout>
              <Product />
            </Layout>
          }
        />

        <Route path="/sales-staff" element={<SalesStaffLayout />}>
          <Route index path="orders" element={<OrderListOfSalesStaff />} />
          <Route path="orders/:orderId" element={<OrderDetailOfSalesStaff />} />
          <Route path="profile" element={<ProfileStaffLayout />} />
        </Route>

        <Route path="/delivery" element={<DeliveryStaffLayout />}>
          <Route index path="orders" element={<OrderListOfDeliveryStaff />} />
          <Route
            path="orders/:orderId"
            element={<OrderDetailOfDeliveryStaff />}
          />
          <Route path="history" element={<OrderHistoryOfDeliveryStaff />} />
          <Route path="profile" element={<ProfileStaffLayout />} />
        </Route>

        <Route path="/manager" element={<ManagerLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="customers-management" element={<CustomerManagement />} />
          <Route
            path="sales-staffs-management"
            element={<SaleStaffManagement />}
          />
          <Route
            path="delivery-staffs-management"
            element={<DeliveryStaffManagement />}
          />
          <Route
            path="profile"
            element={<ProfileStaffLayout />}
          />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<AdminProductManagement />} />
          <Route path="categories" element={<AdminCategoryManagement />} />
          <Route
            path="diamond-casings"
            element={<AdminDiamondCasingManagement />}
          />
          <Route path="diamonds" element={<AdminDiamondManagement />} />
          <Route path="users" element={<AdminUserManagement />} />
          <Route path="profile" element={<ProfileStaffLayout />} />
        </Route>

        <Route
          path="/recruitment"
          element={
            <Layout>
              <Recruitment />
            </Layout>
          }
        />

        <Route
          path="/ring-size"
          element={
            <Layout>
              <RingSize />
            </Layout>
          }
        />

        <Route
          path="/bracelet-size"
          element={
            <Layout>
              <BraceletSize />
            </Layout>
          }
        />

        <Route
          path="/necklace-size"
          element={
            <Layout>
              <NecklaceSize />
            </Layout>
          }
        />

        <Route
          path="/question"
          element={
            <Layout>
              <Question />
            </Layout>
          }
        />

        <Route
          path="/handbook"
          element={
            <Layout>
              <Handbook />
            </Layout>
          }
        />

        <Route
          path="/exchange-and-return"
          element={
            <Layout>
              <ExchangeAndReturn />
            </Layout>
          }
        />

        <Route
          path="/privacy-exchange-and-return"
          element={
            <Layout>
              <PrivacyExchangeAndReturn />
            </Layout>
          }
        />

        <Route
          path="/privacy-shipping"
          element={
            <Layout>
              <PrivacyShipping />
            </Layout>
          }
        />

        <Route
          path="/privacy-warranty"
          element={
            <Layout>
              <PrivacyWarranty />
            </Layout>
          }
        />

        <Route
          path="/term-of-use"
          element={
            <Layout>
              <TermOfUse />
            </Layout>
          }
        />

        <Route
          path="/privacy-secrecy"
          element={
            <Layout>
              <PrivacySecrecy />
            </Layout>
          }
        />

        <Route
          path="/commit-case"
          element={
            <Layout>
              <CommitCase />
            </Layout>
          }
        />

        <Route
          path="/commit-diamond"
          element={
            <Layout>
              <CommitDiamond />
            </Layout>
          }
        />

        <Route
          path="/preserved"
          element={
            <Layout>
              <Preserved />
            </Layout>
          }
        />

        <Route
          path="/payment"
          element={
            <Layout>
              <Payment />
            </Layout>
          }
        />

        <Route
          path="/order-detail/:orderId"
          element={
            <Layout>
              <OrderDetail />
            </Layout>
          }
        />

        <Route
          path="products"
          element={
            <Layout>
              <Products />
            </Layout>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
