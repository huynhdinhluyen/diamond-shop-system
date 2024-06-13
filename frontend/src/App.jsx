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
import ManagerCustomerManagement from "./pages/ManagerCustomerManagement";

function App() {
  return (
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

      <Route path="/manager" element={<ManagerLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="customers-management" element={<ManagerCustomerManagement />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<AdminProductManagement />} />
        <Route path="categories" element={<AdminCategoryManagement />} />
        <Route path="diamond-casings" element={<AdminDiamondCasingManagement />} />
        <Route path="diamonds" element={<AdminDiamondManagement />} />
        <Route path="users" element={<AdminUserManagement />} />
      </Route>

      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
