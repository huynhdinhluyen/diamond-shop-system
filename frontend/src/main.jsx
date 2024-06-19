import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import "@fontsource/roboto/300.css";
// import "@fontsource/roboto/400.css";
// import "@fontsource/roboto/500.css";
// import "@fontsource/roboto/700.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth.jsx";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "./hooks/useCart.jsx";
import { OrderProvider } from "./hooks/useOrder.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  // {/* <React.StrictMode> */}
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <ToastContainer
            position="bottom-right"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
            stacked
            pauseOnHover
            theme="light"
            limit={1}
          />
          <App />
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  </BrowserRouter >
  // {/* </React.StrictMode> */}
);
