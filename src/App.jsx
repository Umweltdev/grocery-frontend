import { useEffect, useRef, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Routes, Route, Navigate } from "react-router-dom";
import PropTypes from "prop-types";

import Homepage from "./pages/homepage";
import Store from "./pages/store";
import UserDashBoard from "./pages/user-dashboard/index";
import AdminDashboard from "./pages/admin-dashboard";
import ProductDescription from "./pages/product-description";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Cart from "./pages/cart";
import NotFound from "./pages/NotFound";

import "@fortawesome/fontawesome-free/css/all.css";
import { Box } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { userCart, logout } from "./features/auth/authSlice";
import { getUserCart } from "./features/cart/cartSlice";

// ✅ Private Route Wrapper
function PrivateRoute({ children, authorizedRoles }) {
  const user = useSelector((state) => state.auth.user);
  const isAuthorized = user && authorizedRoles.includes(user?.role);
  return isAuthorized ? <>{children}</> : <Navigate to="/login" />;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  authorizedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

function App() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (user && cart.products) {
      dispatch(userCart({ cart: cart.products }));
    }
  }, [dispatch, cart, user]);

  useEffect(() => {
    if (user) dispatch(getUserCart());
  }, [dispatch, user]);

  useEffect(() => {
    let logoutTimer;
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);

        if (userData?.expirationTime) {
          const expTime = new Date(userData.expirationTime).getTime();

          if (!isNaN(expTime)) {
            const remainingTime = expTime - Date.now();

            if (remainingTime <= 0) {
              dispatch(logout());
            } else {
              logoutTimer = setTimeout(() => dispatch(logout()), remainingTime);
            }
          }
        }
      } catch (err) {
        console.error("Failed to parse stored user:", err);
        localStorage.removeItem("user"); // cleanup invalid data
      }
    }

    return () => clearTimeout(logoutTimer);
  }, [dispatch, user]);

  return isLoading ? (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src="https://res.cloudinary.com/dlst0is1v/image/upload/v1759063260/Gemini_Generated_Image_9a3gep9a3gep9a3g_1_qxkjji.png"
        alt="bazaar logo"
        style={{
          margin: "0 auto",
          display: "block",
          width: "120px",
        }}
      />
    </Box>
  ) : (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/store" element={<Store />} />
        <Route path="/product/:id" element={<ProductDescription />} />

        <Route
          path="/admin/*"
          element={
            <PrivateRoute authorizedRoles={["admin"]}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/user/*"
          element={
            <PrivateRoute authorizedRoles={["admin", "user"]}>
              <UserDashBoard />
            </PrivateRoute>
          }
        />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route
          path="/cart"
          element={
            <PrivateRoute authorizedRoles={["admin", "user"]}>
              <Cart />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </LocalizationProvider>
  );
}

export default App;
