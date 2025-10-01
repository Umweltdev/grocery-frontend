import React, { useState } from "react";
import { Routes, Route, useLocation,} from "react-router-dom";
import { Box, Drawer } from "@mui/material";
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
const AdminDashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const location = useLocation();

  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);

  React.useEffect(() => {
    if (drawerOpen) {
      handleDrawerClose();
    }
  }, [drawerOpen, location.pathname]);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Box
        sx={{
          display: { xs: "none", lg: "block" },
          position: "fixed",
          zIndex: 1200,
        }}
      >
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </Box>

      <Box
        flex={1}
        sx={{
          ml: { lg: collapsed ? "60px" : "240px" },
          width: { lg: collapsed ? "calc(100% - 60px)" : "calc(100% - 240px)" },
          transition: "margin-left 0.3s ease, width 0.3s ease",
          overflow: "hidden",
        }}
      >
        {!drawerOpen && <Toolbar handleDrawerOpen={handleDrawerOpen} />}

        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/product/:id" element={<AddProduct />} />
          <Route exact path="/product-reviews" element={<ProductReviews />} />
          <Route exact path="/categories" element={<Categories />} />
          <Route exact path="/category/:id" element={<AddCategory />} />
          <Route exact path="/brand/:id" element={<AddBrand />} />
          <Route exact path="/brands" element={<Brands />} />
          <Route exact path="/orders" element={<Orders />} />
          <Route exact path="/addresses" element={<CollectionAddress />} />
          <Route exact path="/address/:id" element={<AddCollectionAddress />} />
          <Route path="/order" element={<OrderDetails />} />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route exact path="/customers" element={<Customers />} />
        </Routes>
      </Box>

      <Drawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        anchor="left"
        sx={{
          zIndex: 1300,
          "& .MuiPaper-root": {
            backgroundColor: "#2B3445",
            color: "white",
          },
        }}
      >
        <Sidebar collapsed={false} setCollapsed={() => {}} />
      </Drawer>
    </Box>
  );
};

export default AdminDashboard;
