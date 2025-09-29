import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Typography, Box, Stack, Button, IconButton, CircularProgress } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import MenuIcon from "@mui/icons-material/Menu";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";

import OrderedProducts from "./OrderedProducts";
import OrderStatusStepper from "../../components/OrderStatusStepper";
import { addAllToCart } from "../../features/cart/cartSlice";
import { base_url } from "../../utils/baseUrl";

const Order = ({ openDrawer }) => {
  const isNonMobile = useMediaQuery("(min-width:968px)");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);

  const getOrder = () => {
    if (!user?.token) {
      setLoading(false);
      return;
    }
    axios
      .get(`${base_url}user/order/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((response) => {
        setOrder(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getOrder();
    
    // Set up polling for real-time status updates only for non-final states
    const shouldPoll = order?.orderStatus && 
      !['Delivered', 'Cancelled'].includes(order.orderStatus);
    
    let interval;
    if (shouldPoll) {
      interval = setInterval(() => {
        getOrder();
      }, 30000); // Poll every 30 seconds
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [id, user?.token, order?.orderStatus]);

  const handleOrderAgain = () => {
    if (!order?.products) return;
    const products = order.products.map((p) => ({
      id: p.product._id,
      image: p.image,
      price: p.product.salePrice || p.product.regularPrice,
      name: p.product.name,
      count: p.count,
    }));
    dispatch(addAllToCart(products));
    navigate("/cart");
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (!order) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography variant="h6" color="text.secondary">
          Order not found
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Stack flex={1} spacing={3}>
        {/* Header */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="start"
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "start", md: "center" }}
            width={{ xs: "auto", md: "100%" }}
          >
            <Stack
              direction="row"
              spacing={{ xs: 1, md: 2 }}
              alignItems="center"
              mb={{ xs: 1.5, md: 0 }}
            >
              <ShoppingBagIcon sx={{ color: "primary.main" }} />
              <Typography
                variant="h5"
                color="text.primary"
                fontSize={{ xs: "20px", md: "25px" }}
              >
                Order Details
              </Typography>
            </Stack>

            <Button
              onClick={handleOrderAgain}
              sx={{
                textTransform: "none",
                bgcolor: "#FCE9EC",
                color: "primary.main",
                fontSize: "subtitle1",
                px: isNonMobile ? 4 : 2,
                py: 1,
                fontWeight: 600,
                "&:hover": { backgroundColor: "rgba(210, 63, 87, 0.04)" },
              }}
              disabled={!order?.products || order.products.length === 0}
            >
              Order Again
            </Button>
          </Stack>

          <IconButton
            onClick={openDrawer}
            sx={{ display: isNonMobile ? "none" : "inline-flex" }}
          >
            <MenuIcon />
          </IconButton>
        </Stack>

        <OrderStatusStepper orderStatus={order?.orderStatus} />

        <OrderedProducts order={order} />

        <Stack spacing={3} direction={{ xs: "column", sm: "row" }}>
          <Stack
            spacing={2}
            flex={1}
            py={3}
            px={{ xs: 3, md: 5 }}
            borderRadius={3}
            alignSelf={{ xs: "stretch", sm: "start" }}
            sx={{
              background: "white",
              boxShadow: "0px 1px 3px rgba(3,0,71,0.09)",
            }}
          >
            <Typography
              variant="h6"
              color="text.primary"
              fontSize={{ xs: "16px", sm: "18px" }}
            >
              Shipping Address
            </Typography>
            <Typography
              variant="subtitle2"
              color="text.primary"
              textTransform="capitalize"
            >
              {`${order?.address?.address || ""} ${order?.address?.state || ""}`}
            </Typography>
          </Stack>

          <Stack
            spacing={3}
            flex={1}
            py={3}
            px={{ xs: 3, md: 5 }}
            borderRadius={3}
            sx={{
              background: "white",
              boxShadow: "0px 1px 3px rgba(3,0,71,0.09)",
            }}
          >
            <Typography
              variant="h6"
              color="text.primary"
              fontSize={{ xs: "16px", sm: "18px" }}
            >
              Total Summary
            </Typography>

            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="subtitle2" color="text.secondary">
                  Subtotal:
                </Typography>
                <Typography variant="subtitle1" color="text.primary">
                  £ {order?.totalPrice?.toLocaleString() || "0.00"}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="subtitle2" color="text.secondary">
                  Shipping Fee:
                </Typography>
                <Typography variant="subtitle1" color="text.primary">
                  £ 0.00
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="subtitle2" color="text.secondary">
                  Discount:
                </Typography>
                <Typography variant="subtitle1" color="text.primary">
                  £ 0.00
                </Typography>
              </Stack>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle1" color="text.primary">
                Total:
              </Typography>
              <Typography variant="subtitle1" color="text.primary">
                £ {order?.totalPrice?.toLocaleString() || "0.00"}
              </Typography>
            </Stack>

            <Typography
              variant="subtitle2"
              color="text.primary"
              textTransform="capitalize"
            >
              {order?.isPaid ? `Paid by ${order.paymentMethod}` : "Pending"}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

Order.propTypes = {
  openDrawer: PropTypes.func.isRequired,
};

export default Order;
