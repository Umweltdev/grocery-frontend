import { useEffect } from "react";
import PropTypes from "prop-types";
import { Stack, Grid, Typography, Paper, Divider, styled } from "@mui/material";
import { useSelector } from "react-redux";
import OrderDetails from "./OrderDetails";

const CustomDivider = styled(Divider)`
  margin: 6px 0;
  border-width: 0px 0px thin;
  border-style: solid;
  border-color: rgb(243, 245, 249);
`;

const OrderConfirmationPage = ({ updateStepCompletion }) => {
  const { cartTotal = 0 } = useSelector((state) => state.cart);
  const { deliveryOption, selectedAddress } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    if (updateStepCompletion) {
      updateStepCompletion("Order Confirmation");
    }
  }, [updateStepCompletion]);

  return (
    <Grid container spacing={4} mt={{ xs: 0, sm: 4 }}>
      <Grid item xs={12} md={8}>
        <Paper
          elevation={3}
          sx={{
            bgcolor: "background.paper",
            borderRadius: "12px",
            p: { xs: 2, sm: 3 },
            textAlign: "center",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          <Typography
            variant="h4"
            color="primary.main"
            sx={{ fontWeight: 700, mb: 2 }}
          >
            Order Confirmation
          </Typography>
          <OrderDetails cartTotal={cartTotal} />
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper
          elevation={3}
          sx={{
            bgcolor: "background.paper",
            borderRadius: "12px",
            p: { xs: 2, sm: 3 },
            pb: 6,
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          <Stack spacing={3}>
            <Stack textTransform="capitalize" spacing={1}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "primary.main" }}
              >
                {deliveryOption === "collection"
                  ? "Collection Address"
                  : "Delivery Address"}
              </Typography>
              <CustomDivider />
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {selectedAddress?.fullName || selectedAddress?.name || "N/A"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedAddress?.phone || "N/A"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedAddress?.address || "N/A"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedAddress?.state || "N/A"}
              </Typography>
            </Stack>

            <Stack spacing={1.5}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "primary.main" }}
              >
                {deliveryOption === "collection"
                  ? "Collection Date"
                  : "Delivery Date"}
              </Typography>
              <CustomDivider />
              <Typography variant="body1" color="text.primary">
                Delivery scheduled on 23 June
              </Typography>
            </Stack>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};

OrderConfirmationPage.propTypes = {
  updateStepCompletion: PropTypes.func.isRequired,
};

export default OrderConfirmationPage;
