import {
  Stack,
  Grid,
  Paper,
  Divider,
  styled,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import DeliveryCollection from "./Delivery-Collection";
import PropTypes from "prop-types";

const CustomDivider = styled(Divider)`
  margin: 16px 0px 20px;
  border-width: 0px 0px thin;
  border-style: solid;
  border-color: rgb(243, 245, 249);
`;

const CheckoutPage = ({ updateStepCompletion }) => {
  const { cartTotal } = useSelector((state) => state.cart);
  const isDeliveryAllowed = cartTotal >= 150;

  // eslint-disable-next-line no-unused-vars
  const [isDelivery, setIsDelivery] = useState(false);

  return (
    <Grid container spacing={3} mt={{ xs: 0, sm: 4 }}>
      <Grid item xs={12} md={8}>
        <Paper
          elevation={3}
          sx={{
            bgcolor: "background.paper",
            borderRadius: "10px",
            p: 3,
            width: "100%",
            maxWidth: { xs: "100%", md: 600 },
            position: "relative",
            transition: "box-shadow 0.3s",
            "&:hover": { boxShadow: 6 },
          }}
        >
          <DeliveryCollection
            updateStepCompletion={updateStepCompletion}
            disabled={!isDeliveryAllowed}
            forceCollection={!isDeliveryAllowed}
            onDeliverySelected={() => setIsDelivery(true)}
            onCollectionSelected={() => setIsDelivery(false)}
          />
        </Paper>

        {!isDeliveryAllowed && (
          <Paper
            elevation={3}
            sx={{
              bgcolor: "background.paper",
              borderRadius: "10px",
              p: 2.5,
              mt: 4,
              textAlign: "center",
              border: "1px solid",
              borderColor: "primary.light",
            }}
          >
            <Typography
              variant="body2"
              color="primary.main"
              sx={{ fontWeight: 600 }}
            >
              Delivery is only available for orders above £150.
            </Typography>
          </Paper>
        )}
      </Grid>

      {/* Order summary */}
      <Grid
        item
        xs={12}
        md={4}
        sx={{
          display: "flex",
          justifyContent: { xs: "center", md: "flex-end" },
          alignSelf: "flex-start",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            bgcolor: "background.paper",
            borderRadius: "10px",
            p: 3,
            width: { xs: "100%", sm: "100%", md: "400px" },
            transition: "box-shadow 0.3s",
            "&:hover": { boxShadow: 6 },
          }}
        >
          <Stack direction="row" justifyContent="space-between" mb={1.5}>
            <Typography variant="subtitle2" color="text.secondary">
              Subtotal:
            </Typography>
            <Typography variant="subtitle1" fontWeight={600}>
              {`£ ${cartTotal.toLocaleString()}`}
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between" mb={1.5}>
            <Typography variant="subtitle2" color="text.secondary">
              Shipping:
            </Typography>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              color={isDeliveryAllowed ? "primary.main" : "error.main"}
            >
              {isDeliveryAllowed ? "£ 0" : "Not Available"}
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between" mb={1.5}>
            <Typography variant="subtitle2" color="text.secondary">
              Tax:
            </Typography>
            <Typography variant="subtitle1" fontWeight={600}>
              £ 0
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between" mb={2}>
            <Typography variant="subtitle2" color="text.secondary">
              Discount:
            </Typography>
            <Typography variant="subtitle1" fontWeight={600}>
              £ 0
            </Typography>
          </Stack>

          <CustomDivider sx={{ my: 2 }} />

          <Typography
            variant="h5"
            fontWeight={700}
            textAlign="right"
            mb={3}
            color="primary.main"
          >
            {`£ ${cartTotal.toLocaleString()}`}
          </Typography>

          <Stack spacing={2}>
            <TextField
              fullWidth
              variant="outlined"
              label="Voucher Code"
              placeholder="Enter voucher code"
              size="small"
              sx={{ "& .MuiInputBase-root": { fontSize: 15 } }}
              InputLabelProps={{ style: { fontSize: 14 } }}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{
                textTransform: "none",
                fontWeight: 600,
                py: 1.5,
                "&:hover": { bgcolor: "primary.dark" },
              }}
            >
              Apply Voucher
            </Button>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};

CheckoutPage.propTypes = {
  updateStepCompletion: PropTypes.func,
};

export default CheckoutPage;
