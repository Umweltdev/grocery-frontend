import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Box, Grid, Container, Drawer } from "@mui/material";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import DashboardBox from "./DashboardBox";
import Profile from "./Profile";
import WishList from "./Wishlist";
import Orders from "./Orders";
import Order from "./Order";
import Addresses from "./Addresses";
import Address from "./Address";
import EditProfile from "./Edit-Profile";
import Payments from "./Payments";
import Payment from "./Payment";

const UserDashBoard = () => {
  const [drawer, setDrawer] = useState(false);
  const openDrawer = () => {
    setDrawer(true);
  };

  const closeDrawer = () => {
    setDrawer(false);
  };
  return (
    <>
      <Header />
      <Box
        sx={{
          bgcolor: "#F6F9FC",
          paddingY: "40px",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item md={12} lg={3} display={{ xs: "none", md: "block" }}>
              <Box
                bgcolor="#fff"
                py={5}
                borderRadius={2}
                pr={2}
                sx={{
                  boxShadow: " 0px 1px 3px rgba(3, 0, 71, 0.09)",
                }}
              >
                <DashboardBox />
              </Box>
            </Grid>

            <Grid item xs={12} md={12} lg={9}>
              <Routes>
                <Route
                  path="/profile"
                  element={<Profile openDrawer={openDrawer} />}
                />
                <Route
                  path="/profile/:id"
                  element={<EditProfile openDrawer={openDrawer} />}
                />
                <Route path="/wishlist" element={<WishList openDrawer={openDrawer} />} />
                <Route path="/orders" element={<Orders openDrawer={openDrawer} />} />
                <Route path="/orders/:id" element={<Order openDrawer={openDrawer} />} />
                <Route path="/addresses" element={<Addresses openDrawer={openDrawer}/>} />
                <Route path="/addresses/:id" element={<Address openDrawer={openDrawer} />} />
                <Route path="/payments" element={<Payments openDrawer={openDrawer} />} />
                <Route path="/payments/:id" element={<Payment />} />
              </Routes>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Drawer
        open={drawer}
        onClose={closeDrawer}
        anchor="left"
        bgcolor="white"
        sx={{
          zIndex: "1200",
          "& .MuiPaper-root": {
            backgroundColor: "white",
          },
        }}
      >
        <Box
          sx={{
            py: 3,
            pr: 1,
            width: "280px",
            height: "100vh",
          }}
        >
          <DashboardBox closeDrawer={closeDrawer} />
        </Box>
      </Drawer>
      <Footer />
    </>
  );
};

export default UserDashBoard;
