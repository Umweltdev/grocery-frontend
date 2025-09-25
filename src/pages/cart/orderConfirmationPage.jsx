import { useEffect } from "react";
import {
  Stack,
  Grid,
  Typography,
  Paper,
  Divider,
  styled,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import OrderDetails from "./OrderDetails";

const CustomDivider = styled(Divider)`
  margin: 5px 0px 5px;
  border-width: 0px 0px thin;
  border-style: solid;
  border-color: rgb(243, 245, 249);
`;

const OrderConfirmationPage = ({ updateStepCompletion }) => {
  const { cartTotal } = useSelector((state) => state.cart);
  const { deliveryOption, selectedAddress } = useSelector((state) => state.order);
  useEffect(() => {
    updateStepCompletion("Order Confirmation");
  }, []);

  return (
    <Grid container spacing={3} mt={{ xs: 0, sm: 4 }}>
      <Grid item xs={12}  md={8}>
        <Paper
          elevation={1}
          sx={{
            backgroundColor: "white",
            p: 3,
            pb: 6,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            borderRadius: "8px",
          }}
        >
          <OrderDetails />
        </Paper>
      </Grid>
      <Grid item xs={12}  md={4}>
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
          <Stack spacing={3}>
            <Stack textTransform="capitalize">
              <Typography variant="subtitle1">
                {deliveryOption === "collection"
                  ? "Collection Address"
                  : "Delivery Address"}
              </Typography>
              <CustomDivider />
              <Typography variant="subtitle1">
                {selectedAddress.fullName || selectedAddress.name}
              </Typography>
              <Typography variant="subtitle2">
                {selectedAddress.phone}
              </Typography>
              <Typography variant="subtitle2">
                {selectedAddress.address}
              </Typography>
              <Typography variant="subtitle2">
                {selectedAddress.state}
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="subtitle1">
                {deliveryOption === "collection" ? "Collection Date" : "Delivery Date"}
              </Typography>
              <CustomDivider />
              <Typography>Delivery scheduled on 23 June</Typography>
            </Stack>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default OrderConfirmationPage;
