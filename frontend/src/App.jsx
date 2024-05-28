import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import About from "./pages/About";

import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import NewsDetails from "./pages/NewsDetails";
import Contact from "./pages/Contact";
import Knowledge from "./pages/Knowledge";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
// import AdminProductManagement from "./pages/AdminProductManagement";

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
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        {/* <Route path="products" element={<AdminProductManagement />} /> */}
      </Route>
      <Route path="/admin/*" element={<Navigate to="/admin" />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
