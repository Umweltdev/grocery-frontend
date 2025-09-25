import { useState, useEffect } from "react";
import { base_url } from "../../utils/baseUrl";
import axios from "axios";
import makeToast from "../../utils/toaster";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

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
} from "@mui/material";
import Cards from "./cards";
import { useSelector, useDispatch } from "react-redux";
import { resetState } from "../../features/cart/cartSlice";
import { resetState as resetOrderState } from "../../features/order/orderSlice";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";

export const CustomDivider = styled(Divider)`
  margin: 5px 0px 5px;
  border-width: 0px 0px thin;
  border-style: solid;
  border-color: rgb(243, 245, 249);
`;

const PaymentPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Mobile = useMediaQuery("(min-width:600px)");
  const { cartTotal } = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const { orderMessage, selectedCard, selectedAddress } = useSelector(
    (state) => state.order
  );
  const { user } = auth;

  const [option, setOption] = useState(null);
  const handleSelectedOption = (event) => {
    event.stopPropagation();
    const selectedOption = event.target.value;
    setOption(selectedOption);
  };

  const clearCartAndNavigate = () => {
    localStorage.removeItem("cartState");
    dispatch(resetState());
    dispatch(resetOrderState());
    navigate("/");
  };

  const createOrder = async () => {
    if (option === "voucher") {
      makeToast(
        "error",
        "Apologies! Currently, only cash/card payments are accepted."
      );
      return;
    }

    try {
      const response = await axios.post(
        `${base_url}user/order`,
        {
          address: selectedAddress._id,
          paymentMethod: option,
          deliveryDate: "2-2-23",
          deliveryTime: "9am",
          comment: orderMessage,
          cardId: selectedCard,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      if (option === "card" && response.data.authorizationUrl) {
        window.location.href = response.data.authorizationUrl;
        localStorage.removeItem("cartState");
      } else if (response.data.status === "success") {
        makeToast("success", "Successfully Paid with Card");
        clearCartAndNavigate();
      } else {
        makeToast(
          "success",
          "Your Order has been Confirmed, Our Sales Team will contact you soon!"
        );
        clearCartAndNavigate();
      }
    } catch (error) {
      makeToast("error", "Please try again, something went wrong");
    }
  };
  return (
    <Grid container spacing={3} mt={{ xs: 0, sm: 4 }}>
      <Grid item xs={12} md={8}>
        <Paper
          elevation={1}
          sx={{
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            borderRadius: "8px",
          }}
        >
          <FormGroup>
            <FormControlLabel
              sx={{
                paddingY: 2,
                paddingX: Mobile ? 3 : 2,
              }}
              control={
                <Radio
                  value="card"
                  checked={option === "card"}
                  onChange={handleSelectedOption}
                />
              }
              label={
                <Typography variant={{ xs: "subtitle2", sm: "body2" }}>
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
                    paddingX: Mobile ? 3 : 2,
                  }}
                >
                  Kindly note that you will be redirected to Paystack Checkout
                  Page to complete your purchase.
                </Typography>

                <Cards option={option} />
              </Stack>
            )}
            <CustomDivider />

            <FormControlLabel
              sx={{
                paddingY: 2,
                paddingX: Mobile ? 3 : 2,
              }}
              control={
                <Radio
                  value="cash"
                  checked={option === "cash"}
                  onChange={handleSelectedOption}
                />
              }
              label={
                <Typography variant={{ xs: "subtitle2", sm: "body2" }}>
                  Pay with Cash on Collection or Delivery
                </Typography>
              }
            />
            <CustomDivider />
            <FormControlLabel
              sx={{
                paddingY: 2,
                paddingX: Mobile ? 3 : 2,
              }}
              control={
                <Radio
                  value="voucher"
                  checked={option === "voucher"}
                  onChange={handleSelectedOption}
                />
              }
              label={
                <Typography variant={{ xs: "subtitle2", sm: "body2" }}>
                  I have a Voucher
                </Typography>
              }
            />
            {option === "voucher" && (
              <>
                <CustomDivider />
                <Stack
                  py={2}
                  px={{ xs: 2, sm: 3 }}
                  pb={3}
                  direction={{ xs: "column", sm: "row" }}
                  spacing={3}
                >
                  <TextField
                    variant="outlined"
                    type="text"
                    placeholder="Enter voucher code here"
                    size="small"
                    sx={{
                      width: Mobile ? "50%" : "100%",
                      "& .MuiInputBase-root": {
                        fontSize: "15px",
                      },
                    }}
                    InputLabelProps={{
                      style: { fontSize: "14px" },
                    }}
                  />
                  <Button
                    sx={{
                      mt: 4,
                      textTransform: "none",
                      bgcolor: "primary.main",
                      color: "white",
                      fontSize: "14px",
                      paddingX: "20px",
                      fontWeight: 500,
                      alignSelf: Mobile ? "start" : "stretch",
                      "&:hover": {
                        backgroundColor: "#E3364E",
                      },
                    }}
                  >
                    Apply
                  </Button>
                </Stack>
              </>
            )}
          </FormGroup>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper
          sx={{
            bgcolor: "white",
            borderRadius: "8px",
            paddingY: 3,
            paddingX: 2,
            paddingBottom: 6,
            position: "relative",
          }}
        >
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle2" color="text.secondary">
              Subtotal:
            </Typography>
            <Typography fontWeight="600">{`₦ ${cartTotal.toLocaleString()}`}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" mt={0.7}>
            <Typography variant="subtitle2" color="text.secondary">
              Shipping:
            </Typography>
            <Typography fontWeight="600">{`₦ 0`}</Typography>
          </Stack>{" "}
          <Stack direction="row" justifyContent="space-between" mt={0.7}>
            <Typography variant="subtitle2" color="text.secondary">
              Tax:
            </Typography>
            <Typography fontWeight="600">{`₦ 0`}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" mt={0.7}>
            <Typography variant="subtitle2" color="text.secondary">
              Discount:
            </Typography>
            <Typography fontWeight="600">{`₦ 0`}</Typography>
          </Stack>
          <CustomDivider />
          <Typography variant="h5" textAlign="right" my={1}>
            {`₦ ${cartTotal.toLocaleString()}`}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={8}>
        <Button
          fullWidth
          disabled={!option}
          onClick={() => createOrder()}
          sx={{
            mt: 4,
            textTransform: "none",
            bgcolor: !option ? "#0000001f" : "primary.main",
            color: "white",
            fontSize: "14px",
            paddingX: "20px",
            fontWeight: 500,
            gap: 1,

            "&:hover": {
              backgroundColor: "#E3364E",
            },
          }}
        >
          <ShoppingCartOutlinedIcon
            sx={{
              fontSize: "20px",
            }}
          />
          Buy now{" "}
        </Button>
      </Grid>
    </Grid>
  );
};

export default PaymentPage;
