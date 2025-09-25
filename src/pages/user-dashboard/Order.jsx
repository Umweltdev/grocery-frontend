import { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Box, Stack, Button, IconButton } from "@mui/material";
import DashboardBox from "./DashboardBox";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { addAllToCart } from "../../features/cart/cartSlice";
import OrderedProducts from "./OrderedProducts";
import Delivery from "./Delivery";
import { base_url } from "../../utils/baseUrl";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";

const Order = ({ openDrawer }) => {
  const isNonMobile = useMediaQuery("(min-width:968px)");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  const getOrder = () => {
    axios
      .get(`${base_url}user/order/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((response) => {
        setOrder(response.data);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getOrder();
  }, []);
  return (
    <Box>
      <Stack flex={1} spacing={3}>
        <Stack direction="row" justifyContent="space-between" alignItems="start">
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
              <ShoppingBagIcon
                sx={{
                  color: "primary.main",
                }}
              />
              <Typography
                variant="h5"
                color="text.primary"
                fontSize={{ xs: "20px", md: "25px" }}
              >
                Order Details
              </Typography>
            </Stack>

            <Button
              onClick={() => {
                const products = order?.products.map((product) => ({
                  id: product.product._id,
                  image: product.image,
                  price:
                    product.product.salePrice || product.product.regularPrice,
                  name: product.product.name,
                  count: product.count,
                }));
                dispatch(addAllToCart(products));
                navigate("/cart");
              }}
              sx={{
                textTransform: "none",
                bgcolor: "#FCE9EC",
                color: "primary.main",
                fontSize: "subtitle1",
                paddingX: isNonMobile ? "40px" : "20px",

                fontWeight: 600,
                paddingY: "6px",
                "&:hover": {
                  backgroundColor: "rgba(210, 63, 87, 0.04)",
                },
              }}
            >
              Order Again
            </Button>
          </Stack>
          <IconButton
            onClick={openDrawer}
            sx={{
              display: isNonMobile ? "none" : "inline-flex",
            }}
          >
            <MenuIcon />
          </IconButton>
        </Stack>

        <Delivery />

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
              boxShadow: " 0px 1px 3px rgba(3, 0, 71, 0.09)",
            }}
          >
            <Typography variant="h6" color="text.primary" fontSize={{xs:"16px",sm:"18px"}}>
              Shipping Address
            </Typography>
            <Typography
              variant="subtitle2"
              color="text.primary"
              textTransform="capitalize"
            >
              {`${order?.address?.address} ${order?.address?.state}`}
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

              boxShadow: " 0px 1px 3px rgba(3, 0, 71, 0.09)",
            }}
          >
            <Typography variant="h6" color="text.primary" fontSize={{xs:"16px",sm:"18px"}}>
              Total Summary
            </Typography>
            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="subtitle2" color="text.secondary">
                  Subtotal:
                </Typography>
                <Typography variant="subtitle1" color="text.primary">
                  {`₦ ${order?.totalPrice.toLocaleString()}`}
                </Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between">
                <Typography variant="subtitle2" color="text.secondary">
                  Shipping Fee:
                </Typography>
                <Typography variant="subtitle1" color="text.primary">
                  ₦ 0.00
                </Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between">
                <Typography variant="subtitle2" color="text.secondary">
                  Discount:
                </Typography>
                <Typography variant="subtitle1" color="text.primary">
                  ₦ 0.00
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle1" color="text.primary">
                Total:
              </Typography>
              <Typography variant="subtitle1" color="text.primary">
                {`₦ ${order?.totalPrice.toLocaleString()}`}
              </Typography>
            </Stack>

            <Typography
              variant="subtitle2"
              color="text.primary"
              textTransform="capitalize"
            >
              {order?.isPaid ? `Paid by ${order?.paymentMethod}` : "Pending"}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Order;
