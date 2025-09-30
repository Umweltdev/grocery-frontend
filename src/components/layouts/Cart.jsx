import {
  Drawer,
  Typography,
  Stack,
  Box,
  IconButton,
  Button,
  Avatar,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ClearIcon from "@mui/icons-material/Clear";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseQuantity,
  removeFromCart,
  decreaseQuantity,
} from "../../features/cart/cartSlice";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Cart = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, cartTotal } = useSelector((state) => state.cart);
  const count = products.reduce((sum, product) => sum + product.count, 0);


  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor="right"
      bgcolor="white"
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: "white",
        },
      }}
    >
      <Box
        width={{ xs: "300px", sm: "350px" }}
        sx={{
          bgcolor: "white",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box
          sx={{
            overflow: "auto",
            height: "calc((100vh - 90px) - 2.25rem)",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            p={2}
            px={{ xs: 2, sm: 3 }}
          >
            <Stack
              color="text.secondary"
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <ShoppingBagOutlinedIcon />
              <Typography variant="subtitle1">{`${count} ${count <= 1 ? "item" : "items"
                }`}</Typography>
            </Stack>
            <IconButton onClick={onClose}>
              <ClearIcon />
            </IconButton>
          </Stack>
          <Divider />
          <Stack>
            {products.map((product, index) => (
              <Box
                py={2}
                px={{ xs: 2, sm: 3 }}
                key={index}
                sx={{
                  borderBottom: "1px solid rgb(243, 245, 249)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Stack alignItems="center">
                    <Button
                      disabled={product.count === 1}
                      onClick={() => dispatch(decreaseQuantity(product.id))}
                      variant="outlined"
                      sx={{
                        padding: "1px",
                        minWidth: 0,
                        borderRadius: "50%",
                      }}
                    >
                      <RemoveIcon />
                    </Button>
                    <Typography>{product?.count}</Typography>
                    <Button
                      onClick={() => dispatch(increaseQuantity(product.id))}
                      variant="outlined"
                      sx={{
                        padding: "1px",
                        minWidth: 0,
                        borderRadius: "50%",
                      }}
                    >
                      <AddIcon />
                    </Button>
                  </Stack>
                  <Stack direction="row" spacing={1.5} flex={1}>
                    <Avatar
                      alt={product?.name}
                      src={product?.image}
                      sx={{ width: 70, height: 70, borderRadius: "0" }}
                    />
                    <Stack>
                      <Typography variant="subtitle1">
                        {product?.name}
                      </Typography>
                      <Typography
                        color="text.secondary"
                        variant="subtitle2"
                        fontSize="10px"
                      >
                        {`£ ${product?.price?.toLocaleString()}`} X{" "}
                        {product?.count}
                      </Typography>
                      <Typography color="primary.main" variant="subtitle1">
                        {`£ ${product?.total?.toLocaleString()}`}
                      </Typography>
                    </Stack>
                  </Stack>

                  <IconButton
                    onClick={() => dispatch(removeFromCart(product.id))}
                  >
                    <ClearIcon />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Stack>
        </Box>
        {count > 0 && (
          <Box
            p={3}
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography
              sx={{
                textTransform: "none",
                bgcolor: "primary.main",
                color: "white",
                fontSize: "14px",
                paddingY: "10px",
                fontWeight: 600,
                width: "100%",
                textAlign: "center",
                borderRadius: "3px",
              }}
            >
              {`TOTAL (£ ${cartTotal.toLocaleString()})`}
            </Typography>
            <Button
              onClick={() => navigate("/cart")}
              variant="outlined"
              sx={{
                textTransform: "none",
                color: "primary.main",
                fontSize: "14px",
                paddingY: "10px",
                fontWeight: 600,
                width: "100%",
              }}
            >
              View cart
            </Button>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}
export default Cart;

Cart.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
