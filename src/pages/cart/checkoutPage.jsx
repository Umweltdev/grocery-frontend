import {
  Box,
  Stack,
  Grid,
  Container,
  Typography,
  IconButton,
  Button,
  Paper,
  Divider,
  styled,
  TextField,
} from "@mui/material";
import { useSelector } from "react-redux";
import DeliveryCollection from "./Delivery-Collection";

const CustomDivider = styled(Divider)`
  margin: 16px 0px 20px;
  border-width: 0px 0px thin;
  border-style: solid;
  border-color: rgb(243, 245, 249);
`;

const CheckoutPage = ({updateStepCompletion}) => {
  const { cartTotal } = useSelector((state) => state.cart);

  return (
    <Grid container spacing={3} mt={{ xs: 0, sm: 4 }}>
      <Grid item xs={12}  md={8}>
        <Stack spacing={4}>
          <DeliveryCollection updateStepCompletion={updateStepCompletion} />
        </Stack>
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
          <Stack direction="row" justifyContent="space-between" >
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
          <Stack spacing={1.5}>
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Voucher"
              placeholder="Voucher"
              size="small"
              sx={{
                gridColumn: "span 2",
                "& .MuiInputBase-root": {
                  fontSize: "15px",
                },
              }}
              InputLabelProps={{
                style: { fontSize: "14px" },
              }}
            />
            <Button
              variant="outlined"
              sx={{
                textTransform: "none",
                fontWeight: 600,
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

export default CheckoutPage;
