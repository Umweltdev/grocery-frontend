import { useState } from "react";
import PropTypes from "prop-types";
import { base_url } from "../../utils/baseUrl";
import axios from "axios";
import makeToast from "../../utils/toaster";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { loadStripe } from "@stripe/stripe-js";
// import { Elements, useStripe, useElements } from "@stripe/react-stripe-js";

import {
  Stack,
  Grid,
  Button,
  TextField,
  Paper,
  styled,
  Divider,
  FormGroup,
  Radio,
  FormControlLabel,
  Typography,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import Cards from "./cards";
import { useSelector, useDispatch } from "react-redux";
import { resetState } from "../../features/cart/cartSlice";
import { resetState as resetOrderState } from "../../features/order/orderSlice";
import { useNavigate } from "react-router-dom";

// Styled Divider
const CustomDivider = styled(Divider)`
  margin: 12px 0;
  border-width: 0 0 1px 0;
  border-color: #f3f5f9;
`;

const PaymentPage = ({ defaultDeliveryDate }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width:600px)");

  const { cartTotal, products } = useSelector((state) => state.cart) || {};
  const { user } = useSelector((state) => state.auth) || {};
  const { orderMessage, selectedCard, selectedAddress } = useSelector(
    (state) => state.order
  );

  const [option, setOption] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSelectedOption = (event) => {
    event.stopPropagation();
    const selectedOption = event.target.value;
    setOption(selectedOption);
  };

  const clearCartAndNavigate = () => {
    localStorage.removeItem("cartState");
    dispatch(resetState());
    dispatch(resetOrderState());
    setIsProcessing(false);
    navigate("/");
  };

  const createOrder = async () => {
    if (option === "voucher") {
      makeToast("error", "Only cash or card payments are currently accepted.");
      return;
    }

    setIsProcessing(true);

    try {
      const response = await axios.post(
        `${base_url}user/order`,
        {
          address: selectedAddress?._id,
          paymentMethod: option,
          deliveryDate: defaultDeliveryDate || "2-2-23",
          deliveryTime: "9am",
          comment: orderMessage,
          cardId: selectedCard,
        },
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );

      if (option === "card" && response.data.sessionId) {
        const stripe = await loadStripe(
          import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
        );
        if (stripe) {
          localStorage.removeItem("cartState");
          const result = await stripe.redirectToCheckout({
            sessionId: response.data.sessionId,
          });
          if (result.error) {
            makeToast("error", result.error.message);
          }
        } else {
          makeToast("error", "Stripe failed to initialize");
        }
        return;
      } else if (response.data.status === "succeeded") {
        makeToast("success", "Successfully Paid with Card");
        clearCartAndNavigate();
      } else {
        makeToast(
          "success",
          "Order confirmed! Our team will contact you shortly."
        );
        clearCartAndNavigate();
      }
    } catch (error) {
      makeToast("error", "Please try again, something went wrong");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Grid container spacing={3} mt={{ xs: 2, sm: 4 }}>
      {/* Payment Method Card */}
      <Grid item xs={12} md={8}>
        <Paper
          elevation={4}
          sx={{
            borderRadius: 3,
            p: { xs: 2, sm: 4 },
            display: "flex",
            flexDirection: "column",
            gap: 3,
            bgcolor: "background.paper",
          }}
        >
          <Typography
            variant="h5"
            color="primary.main"
            textAlign="center"
            fontWeight={700}
            mb={2}
          >
            Select Payment Method
          </Typography>
          <FormGroup sx={{ gap: 1.5 }}>
            <FormControlLabel
              sx={{
                py: 2,
                px: isMobile ? 2 : 3,
                borderRadius: 2,
                border:
                  option === "card" ? "1px solid #d23f57" : "1px solid #e0e0e0",
                transition: "border 0.2s",
              }}
              control={
                <Radio
                  value="card"
                  checked={option === "card"}
                  onChange={handleSelectedOption}
                />
              }
              label={
                <Typography variant="subtitle1" fontWeight={600}>
                  Pay with Card
                </Typography>
              }
            />
            {option === "card" && (
              <Stack spacing={2}>
                <Typography
                  fontSize="12px"
                  color="text.secondary"
                  sx={{
                    paddingBottom: 2,
                    paddingX: isMobile ? 3 : 2,
                  }}
                >
                  Kindly note that you will be redirected to Stripe Checkout
                  Page to complete your purchase.
                </Typography>

                {/* <Cards option={option} /> */}
              </Stack>
            )}

            <CustomDivider />

            <FormControlLabel
              sx={{
                py: 2,
                px: isMobile ? 2 : 3,
                borderRadius: 2,
                border:
                  option === "cash" ? "1px solid #d23f57" : "1px solid #e0e0e0",
              }}
              control={
                <Radio
                  value="cash"
                  checked={option === "cash"}
                  onChange={handleSelectedOption}
                />
              }
              label={
                <Typography variant="subtitle1" fontWeight={600}>
                  Cash on Collection/Delivery
                </Typography>
              }
            />

            <CustomDivider />

            <FormControlLabel
              sx={{
                py: 2,
                px: isMobile ? 2 : 3,
                borderRadius: 2,
                border:
                  option === "voucher"
                    ? "1px solid #d23f57"
                    : "1px solid #e0e0e0",
              }}
              control={
                <Radio
                  value="voucher"
                  checked={option === "voucher"}
                  onChange={handleSelectedOption}
                />
              }
              label={
                <Typography variant="subtitle1" fontWeight={600}>
                  Redeem Voucher
                </Typography>
              }
            />
            {option === "voucher" && (
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ py: 2, px: isMobile ? 2 : 3 }}
              >
                <TextField
                  placeholder="Enter voucher code"
                  size="small"
                  fullWidth
                  sx={{ "& .MuiInputBase-root": { fontSize: 15 } }}
                />
                <Button
                  sx={{
                    textTransform: "none",
                    bgcolor: "primary.main",
                    color: "white",
                    fontWeight: 600,
                    "&:hover": { bgcolor: "#E3364E" },
                  }}
                >
                  Apply
                </Button>
              </Stack>
            )}
          </FormGroup>
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper
          elevation={4}
          sx={{
            borderRadius: 3,
            p: { xs: 2, sm: 4 },
            display: "flex",
            flexDirection: "column",
            gap: 2,
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          }}
        >
          <Typography
            variant="h5"
            fontWeight={700}
            mb={1}
            color="primary.main"
            textAlign="center"
            sx={{}}
          >
            Order Summary
          </Typography>
          {products?.map((item) => (
            <Stack
              key={item.id || item._id || item.name}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body2">{item.name}</Typography>
              <Typography variant="body2">
                £{item.total?.toLocaleString() || 0}
              </Typography>
            </Stack>
          ))}

          <CustomDivider />

          <Stack direction="column" spacing={1}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">
                Subtotal
              </Typography>
              <Typography variant="subtitle1" fontWeight={600}>
                £{cartTotal?.toLocaleString() || 0}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">
                Shipping
              </Typography>
              <Typography variant="subtitle1" fontWeight={600}>
                £0
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">
                Tax
              </Typography>
              <Typography variant="subtitle1" fontWeight={600}>
                £0
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">
                Discount
              </Typography>
              <Typography variant="subtitle1" fontWeight={600}>
                £0
              </Typography>
            </Stack>
          </Stack>

          <CustomDivider />

          <Typography
            variant="h5"
            fontWeight={700}
            textAlign="right"
            color="primary.main"
          >
            £{cartTotal?.toLocaleString() || 0}
          </Typography>
        </Paper>
      </Grid>

      {/* Buy Now Button */}
      <Grid item xs={12} md={8}>
        <Button
          fullWidth
          disabled={!option || isProcessing}
          onClick={() => createOrder()}
          sx={{
            mt: 4,
            py: 1.5,
            textTransform: "none",
            bgcolor: !option || isProcessing ? "#0000001f" : "primary.main",
            color: "white",
            fontWeight: 700,
            fontSize: 15,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            borderRadius: 2,
            "&:hover": { bgcolor: "#E3364E" },
          }}
        >
          {isProcessing ? (
            <>
              <CircularProgress
                size={20}
                sx={{
                  color: "white",
                  mr: 1,
                }}
              />
              Processing...
            </>
          ) : (
            <>
              <ShoppingCartOutlinedIcon
                sx={{
                  fontSize: "20px",
                }}
              />
              Buy now{" "}
            </>
          )}
        </Button>
      </Grid>
    </Grid>
  );
};

PaymentPage.propTypes = {
  defaultDeliveryDate: PropTypes.string,
};

export default PaymentPage;
