import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  styled,
  Badge,
  Grid,
  Drawer,
  Divider,
} from "@mui/material";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import Category from "./Category";
import Shop from "./Shop";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetState } from "../../features/cart/cartSlice";
import { resetState as resetOrderState } from "../../features/order/orderSlice";
import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { getProducts } from "../../features/product/productSlice";
import { getCategories } from "../../features/category/categorySlice";
import {
  CategoryOutlined,
  PersonOutlineOutlined,
  HomeOutlined,
  ShoppingBagOutlined,
} from "@mui/icons-material";

const Homepage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [visibleCategories, setVisibleCategories] = useState([]);

  const { products } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);

  const queryParams = new URLSearchParams(location.search);
  const reference = queryParams.get("reference");

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor:
        products.length > 0 ? theme.palette.primary.main : "transparent",
      padding: "0 6px",
      color: "white",
      fontWeight: 600,
    },
  }));

  const getVisibleCategories = () => {
    axios
      .get(`${base_url}category?level=1&visible=true`)
      .then((response) => {
        setVisibleCategories(response.data || []);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getVisibleCategories();
  }, []);

  useEffect(() => {
    dispatch(getCategories(1));
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (reference) {
      dispatch(resetState());
      dispatch(resetOrderState());
    }
  }, [reference, dispatch]);

  return (
    <Box>
      <Box
        display={{ xs: "flex", md: "none" }}
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          justifyContent: "space-around",
          alignItems: "center",
          height: "70px",
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
          borderTop: "1px solid #e5e7eb",
          boxShadow: "0 -3px 12px rgba(0,0,0,0.08)",
          zIndex: 1200,
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            color: "#374151",
          }}
        >
          <HomeOutlined fontSize="medium" />
          <Typography fontSize="12px" fontWeight={500}>
            Home
          </Typography>
        </Link>
        <IconButton
          onClick={() => setDrawerOpen(true)}
          sx={{
            flex: 1,
            flexDirection: "column",
            color: "#374151",
          }}
        >
          <CategoryOutlined fontSize="medium" />
          <Typography fontSize="12px" fontWeight={500}>
            Category
          </Typography>
        </IconButton>
        <IconButton
          onClick={() => navigate("/cart")}
          sx={{ flex: 1, flexDirection: "column", color: "#374151" }}
        >
          <StyledBadge
            badgeContent={products.reduce(
              (sum, product) => sum + product?.count,
              0
            )}
          >
            <ShoppingBagOutlined fontSize="medium" />
          </StyledBadge>
          <Typography fontSize="12px" fontWeight={500}>
            Cart
          </Typography>
        </IconButton>
        {user && (
          <Link
            to="/user/profile"
            style={{
              textDecoration: "none",
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              color: "#374151",
            }}
          >
            <PersonOutlineOutlined fontSize="medium" />
            <Typography fontSize="12px" fontWeight={500}>
              {user?.fullName.split(" ")[0]}
            </Typography>
          </Link>
        )}
      </Box>
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        anchor="left"
        sx={{
          "& .MuiPaper-root": {
            width: 300,
            background: "#fff",
            borderRadius: "0 12px 12px 0",
            boxShadow: "2px 0 12px rgba(0,0,0,0.12)",
          },
        }}
      >
        <Box p={3} sx={{ height: "100vh", overflowY: "auto" }}>
          <Typography variant="h6" fontWeight={700} mb={2} color="primary">
            Categories
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Category visibleCategories={visibleCategories} />
        </Box>
      </Drawer>
      <Header />
      <Box
        paddingTop={{ xs: "16px", sm: "32px" }}
        sx={{ bgcolor: "#F9FAFB", width: "100%" }}
      >
        <Grid container spacing={3} px={{ xs: 2, md: 4 }}>
          <Grid item md={3} display={{ xs: "none", md: "block" }}>
            <Box
              bgcolor="white"
              py={3}
              px={2.5}
              borderRadius="16px"
              sx={{
                height: "calc(100vh - 120px)",
                boxShadow: "0px 3px 10px rgba(0,0,0,0.1)",
                position: "sticky",
                top: "90px",
                overflowY: "auto",
                "&::-webkit-scrollbar": {
                  width: "6px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#d1d5db",
                  borderRadius: "100px",
                },
              }}
            >
              <Typography
                variant="h6"
                fontWeight={700}
                color="text.primary"
                mb={2}
              >
                Categories
              </Typography>
              <Category visibleCategories={visibleCategories} />
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            <Box
              bgcolor="white"
              borderRadius="16px"
              p={3}
              boxShadow="0px 3px 10px rgba(0,0,0,0.08)"
              sx={{ width: "100%" }}
            >
              <Shop />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
};

export default Homepage;
