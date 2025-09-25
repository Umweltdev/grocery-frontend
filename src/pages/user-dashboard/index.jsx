import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Box, Grid, Container, Drawer, Paper, useTheme } from "@mui/material";
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
          bgcolor: "#f8fafc",
          minHeight: "100vh",
          py: { xs: 1, sm: 2, md: 4 },
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} lg={3} display={{ xs: "none", lg: "block" }}>
              <Paper
                elevation={0}
                sx={{
                  bgcolor: "white",
                  borderRadius: { xs: 2, md: 3 },
                  p: { xs: 2, md: 3 },
                  border: "1px solid",
                  borderColor: "divider",
                  boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
                  position: "sticky",
                  top: { xs: 80, md: 100 },
                  height: "fit-content",
                  maxHeight: "calc(100vh - 120px)",
                  overflowY: "auto",
                }}
              >
                <DashboardBox />
              </Paper>
            </Grid>

            <Grid item xs={12} lg={9}>
              <Paper
                elevation={0}
                sx={{
                  bgcolor: "white",
                  borderRadius: { xs: 2, md: 3 },
                  p: { xs: 1, sm: 2, md: 4 },
                  border: "1px solid",
                  borderColor: "divider",
                  boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
                  minHeight: { xs: "auto", md: "600px" },
                }}
              >
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
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Drawer
        open={drawer}
        onClose={closeDrawer}
        anchor="left"
        sx={{
          zIndex: 1300,
          "& .MuiPaper-root": {
            backgroundColor: "white",
            borderRadius: "0 16px 16px 0",
            border: "none",
            boxShadow: "0 8px 32px 0 rgb(0 0 0 / 0.12)",
          },
        }}
      >
        <Box
          sx={{
            p: { xs: 2, sm: 3 },
            width: { xs: "280px", sm: "320px" },
            height: "100vh",
            bgcolor: "white",
            overflowY: "auto",
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
