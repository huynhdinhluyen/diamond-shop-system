import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NewsDetails from "./pages/NewsDetails";
import Contact from "./pages/Contact";
import Knowledge from "./pages/Knowledge";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import ProfileLayout from "./layouts/ProfileLayout";
import TablePricesDiamond from "./pages/TablePricesDiamond";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
// import AdminProductManagement from "./pages/AdminProductManagement";
import AdminProductManagement from "./pages/AdminProductManagement";
// import AddProductForm from "./forms/AddProductForm";
// import EditProductForm from "./forms/EditProductForm";
import AdminCategoryManagement from "./pages/AdminCategoryManagement";
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

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProductManagement />} />
        {/* <Route path="products/add" element={<AddProductForm />} />
        <Route path="products/:id/edit" element={<EditProductForm />} /> */}
        <Route path="categories" element={<AdminCategoryManagement />} />
      </Route>
      <Route path="/admin/*" element={<Navigate to="/admin" />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
