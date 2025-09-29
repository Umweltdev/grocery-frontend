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
import PropTypes from "prop-types";

const CustomDivider = styled(Divider)`
  margin: 16px 0px 20px;
  border-width: 0px 0px thin;
  border-style: solid;
  border-color: rgb(243, 245, 249);
`;

const CartCard = ({ name, image, id, price, count, total }) => {
  const dispatch = useDispatch();
  return (
    <Paper
      elevation={3}
      sx={{
        bgcolor: "background.paper",
        borderRadius: "10px",
        p: 3,
        position: "relative",
        width: "100%",
        maxWidth: "cover",
        transition: "box-shadow 0.3s",
        "&:hover": {
          boxShadow: 6,
        },
      }}
    >
      <IconButton
        onClick={() => dispatch(removeFromCart(id))}
        sx={{
          position: "absolute",
          top: "10px",
          right: "10px",
          color: "text.secondary",
          "&:hover": {
            color: "primary.main",
          },
        }}
      >
        <ClearIcon />
      </IconButton>

      <Stack direction="column" spacing={2} alignItems="center">
        <Box
          sx={{
            width: 250,
            height: 250,
            flexShrink: 0,
            mb: 2,
          }}
        >
          <img
            src={image}
            alt={name}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </Box>
        <Stack spacing={1.5} alignItems="center" sx={{ width: "100%" }}>
          <Typography variant="h6" fontWeight="600" textAlign="center">
            {name}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography color="text.secondary" variant="body1">
              {`£${price.toLocaleString()}`} x {count}
            </Typography>
            <Typography
              variant="body1"
              fontWeight="bold"
              sx={{ color: "primary.main" }}
            >
              {`£${total?.toLocaleString()}`}
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center" sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              disabled={count === 1}
              onClick={() => dispatch(decreaseQuantity(id))}
              sx={{
                minWidth: "40px",
                height: "40px",
                borderRight: "none",
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                borderColor: "divider",
                "&:hover": {
                  borderRight: "none",
                },
              }}
            >
              <RemoveIcon fontSize="small" />
            </Button>
            <Typography
              variant="body1"
              fontWeight="500"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "40px",
                width: "48px",
                borderTop: "1px solid",
                borderBottom: "1px solid",
                borderColor: "divider",
              }}
            >
              {count}
            </Typography>
            <Button
              onClick={() => dispatch(increaseQuantity(id))}
              variant="outlined"
              sx={{
                minWidth: "40px",
                height: "40px",
                borderLeft: "none",
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                borderColor: "divider",
                "&:hover": {
                  borderLeft: "none",
                },
              }}
            >
              <AddIcon fontSize="small" />
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

CartCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  total: PropTypes.number,
};

const CartPage = ({ updateStepCompletion }) => {
  const { products, cartTotal } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof updateStepCompletion === "function") {
      updateStepCompletion("Cart");
    }
  }, [updateStepCompletion]);

  return (
    <Grid container spacing={{ xs: 4, md: 6 }} mt={{ xs: 2, sm: 4 }}>
      <Grid item xs={12} md={8}>
        {products.length > 0 ? (
          <Stack spacing={2}>
            {products.map((product, index) => (
              <CartCard key={index} {...product} />
            ))}
          </Stack>
        ) : (
          <Stack spacing={2} alignItems="center">
            <Typography textAlign="center" variant="h6">
              To proceed with the checkout, kindly add items to your cart first.
            </Typography>
            <Typography textAlign="center" variant="h5">
              Happy shopping!
            </Typography>
          </Stack>
        )}
      </Grid>

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
            borderRadius: "12px",
            p: { xs: 3, md: 4 },
            width: { xs: "100%", sm: "100%", md: 400 },
            transition: "box-shadow 0.3s",
            "&:hover": { boxShadow: 8 },
          }}
        >
          {/* Total Amount */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ fontWeight: 600 }}
            >
              Total
            </Typography>
            <Typography
              variant="h4"
              color="primary.main"
              sx={{ fontWeight: 700 }}
            >
              {`£ ${cartTotal.toLocaleString()}`}
            </Typography>
          </Stack>

          <CustomDivider />

          {/* Additional Comments Section */}
          <Stack spacing={1.5} mt={3}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Additional Comments
              </Typography>
              <Typography
                fontSize="12px"
                sx={{
                  bgcolor: "#fce9ec",
                  color: "#d23f57",
                  borderRadius: 1,
                  px: 1.5,
                  py: 0.5,
                  fontWeight: 500,
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
              onChange={(e) => dispatch(getOrderMessage(e.target.value))}
              placeholder="Write any instructions or notes for your order..."
              sx={{
                "& .MuiInputBase-root": { fontSize: 15 },
                "& .MuiOutlinedInput-root": { borderRadius: 2 },
              }}
              InputLabelProps={{ style: { fontSize: 14 } }}
            />
          </Stack>

          <CustomDivider sx={{ my: 3 }} />

          {/* Voucher Section */}
          <Stack spacing={2}>
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Voucher"
              placeholder="Enter your voucher code"
              size="small"
              sx={{
                "& .MuiInputBase-root": { fontSize: 15 },
                "& .MuiOutlinedInput-root": { borderRadius: 2 },
              }}
              InputLabelProps={{ style: { fontSize: 14 } }}
            />
            <Button
              variant="contained"
              sx={{
                textTransform: "none",
                fontWeight: 600,
                bgcolor: "primary.main",
                color: "white",
                py: 1.5,
                "&:hover": { bgcolor: "#d23f57" },
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

CartPage.propTypes = {
  updateStepCompletion: PropTypes.func,
};

export default CartPage;
