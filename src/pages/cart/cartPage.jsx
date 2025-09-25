import { useEffect } from "react";
import {
  Typography,
  Stack,
  Box,
  IconButton,
  Button,
  Paper,
  Grid,
  Divider,
  styled,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseQuantity,
  removeFromCart,
  decreaseQuantity,
} from "../../features/cart/cartSlice";
import { getOrderMessage } from "../../features/order/orderSlice";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import useMediaQuery from "@mui/material/useMediaQuery";

const CustomDivider = styled(Divider)`
  margin: 16px 0px 20px;
  border-width: 0px 0px thin;
  border-style: solid;
  border-color: rgb(243, 245, 249);
`;

const CartCard = ({ name, image, id, price, count, total }) => {
  const dispatch = useDispatch();
  const Mobile = useMediaQuery("(min-width:600px)");

  return (
    <Paper
      elevation={1}
      sx={{
        bgcolor: "white",
        borderRadius: "10px",
        paddingY: Mobile ? 2 : 0,
        paddingX: Mobile ? 2 : 0,
        position: "relative",
      }}
    >
      <IconButton
        onClick={() => dispatch(removeFromCart(id))}
        sx={{
          position: "absolute",
          top: "15px",
          right: "15px",
          //   color: toggle ? "#D23F57" : "rgba(0, 0, 0, 0.54)",
        }}
      >
        <ClearIcon />
      </IconButton>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={3}
        alignItems={{ sm: "center" }}
      >
        <Box width={{ sm: "160px" }}>
          <img
            src={image}
            alt={name}
            className="image-r"
            style={{ width: "100%", objectFit: "cover" }}
          />
        </Box>
        <Box padding={{ xs: 2, sm: 0 }}>
          <Stack spacing={1.5}>
            <Stack spacing={1.5}>
              <Typography
                variant="subtitle1"
                color="#373F50"
                fontSize={{ xs: "14px", md: "16px" }}
              >
                {name}
              </Typography>
              <Stack direction="row" spacing={2}>
                <Typography color="text.secondary" variant="subtitle2">
                  {`₦ ${price.toLocaleString()}`} X {count}
                </Typography>
                <Typography color="primary.main" variant="subtitle1">
                  {`₦ ${total?.toLocaleString()}`}
                </Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={1.5} alignItems="center">
              <Button
                disabled={count === 1}
                onClick={() => dispatch(decreaseQuantity(id))}
                variant="outlined"
                sx={{
                  padding: "1px",
                  minWidth: 0,
                }}
              >
                <RemoveIcon />
              </Button>
              <Typography>{count}</Typography>
              <Button
                onClick={() => dispatch(increaseQuantity(id))}
                variant="outlined"
                sx={{
                  padding: "1px",
                  minWidth: 0,
                }}
              >
                <AddIcon />
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
};

const CartPage = ({ updateStepCompletion }) => {
  const { products, cartTotal } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    updateStepCompletion("Cart");
  }, []);
  return (
    <Grid container spacing={3} mt={{ xs: 0, sm: 4 }}>
      <Grid item xs={12} md={8}>
        {products.length > 0 ? (
          <Stack spacing={2.5}>
            {products.map((product, index) => (
              <CartCard key={index} {...product} />
            ))}
          </Stack>
        ) : (
          <Stack spacing={2}>
            <Typography textAlign="center" variant="h6">
              To proceed with the checkout, kindly add items to your cart first.
            </Typography>
            <Typography textAlign="center" variant="h5">
              {" "}
              Happy shopping!{" "}
            </Typography>
          </Stack>
        )}
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper
          sx={{
            bgcolor: "white",
            borderRadius: "8px",
            paddingY: 3,
            paddingX: 2,
            position: "relative",
          }}
        >
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle2" color="text.secondary">
              Total:
            </Typography>
            <Typography variant="subtitle1">{`₦ ${cartTotal.toLocaleString()}`}</Typography>
          </Stack>
          <CustomDivider />
          <Stack spacing={1.5}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="subtitle1">Additional Comments</Typography>
              <Typography
                fontSize="13px"
                sx={{
                  backgroundColor: "#fce9ec",
                  color: "#d23f57",
                  borderRadius: "3px",
                  padding: "3px 8px",
                }}
              >
                Note
              </Typography>
            </Stack>

            <TextField
              fullWidth
              variant="outlined"
              type="text"
              multiline
              rows={5}
              size="small"
              onChange={(e) => {
                dispatch(getOrderMessage(e.target.value));
              }}
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
          </Stack>
          <CustomDivider />

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

export default CartPage;
