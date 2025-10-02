import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Box, Drawer, useMediaQuery } from "@mui/material";
import Sidebar from "./SideBar";
import Toolbar from "./TopBar";
import Dashboard from "./Dashboard";
import Products from "./Products";
import ProductReviews from "./ProductReview";
import Categories from "./Categories";
import Brands from "./Brands";
import Orders from "./Orders";
import Customers from "./Customers";
import AddProduct from "./AddProduct";
import AddCategory from "./AddCategory";
import AddBrand from "./AddBrand";
import OrderDetails from "./OrderDetails";
import AddCollectionAddress from "./AddCollectionAddress";
import CollectionAddress from "./CollectionAddresses";

const drawerWidth = 250;
const collapsedWidth = 70;

const AdminDashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width:1200px)");

  useEffect(() => {
    if (drawerOpen) setDrawerOpen(false);
  }, [location.pathname]);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      {!isMobile && (
        <Box
          sx={{
            width: collapsed ? collapsedWidth : drawerWidth,
            flexShrink: 0,
            position: "fixed",
            height: "100vh",
          }}
        >
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        </Box>
      )}

      {isMobile && (
        <Drawer
          variant="temporary"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          anchor="left"
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiPaper-root": {
              width: drawerWidth,
              backgroundColor: "#2B3445",
              color: "white",
            },
          }}
        >
          <Sidebar collapsed={false} setCollapsed={() => {}} />
        </Drawer>
      )}

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: !isMobile
            ? collapsed
              ? `${collapsedWidth}px`
              : `${drawerWidth}px`
            : 0,
          width: !isMobile
            ? collapsed
              ? `calc(100% - ${collapsedWidth}px)`
              : `calc(100% - ${drawerWidth}px)`
            : "100%",
          transition: "margin-left 0.3s ease, width 0.3s ease",
          minHeight: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar handleDrawerOpen={() => setDrawerOpen(true)} />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<AddProduct />} />
          <Route path="/product-reviews" element={<ProductReviews />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:id" element={<AddCategory />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/brand/:id" element={<AddBrand />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/order" element={<OrderDetails />} />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route path="/addresses" element={<CollectionAddress />} />
          <Route path="/address/:id" element={<AddCollectionAddress />} />
          <Route path="/customers" element={<Customers />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
