import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  Typography,
  Box,
  Stack,
  Tooltip,
  IconButton,
  Button,
  Paper,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { base_url } from "../../utils/baseUrl";
import makeToast from "../../utils/toaster";
import { addToCart } from "../../features/cart/cartSlice";
import { Link } from "react-router-dom";

const WishListCard = ({
  images = [],
  name = "Unnamed Product",
  description = "No description available",
  regularPrice = 0,
  salePrice,
  toggle,
  setToggle,
  _id = "no-id",
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const finalPrice = salePrice || regularPrice;
  const hasDiscount = salePrice && salePrice < regularPrice;

  const removeFromWishList = () => {
    if (!user?.token) {
      makeToast("error", "You must be logged in");
      return;
    }
    axios
      .put(`${base_url}product/wishlist/${_id}`, null, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then(() => setToggle(!toggle))
      .catch(() => makeToast("error", "Unable to update wishlist"));
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(
      addToCart({
        id: _id,
        image: images?.[0]?.url || "/placeholder.png",
        price: finalPrice,
        name,
      })
    );
    makeToast("success", "Added to cart");
  };

  return (
    <Paper
      elevation={3}
      sx={{
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        // border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        overflow: "hidden",
        width: "100%",
        maxWidth: 380,
        margin: "auto",
        position: "relative",
        bgcolor: "#fff",
        boxShadow: "0 8px 25px 0 rgb(0 0 0 / 0.1)",
        "&:hover": {
          borderColor: "primary.300",
          boxShadow: "0 8px 25px 0 rgb(0 0 0 / 0.3)",
          transform: "translateY(-4px)",
        },
      }}
    >
      <Link to={`/product/${_id}`} style={{ textDecoration: "none" }}>
        <Box
          component="img"
          src={images?.[0]?.url || "/placeholder.png"}
          alt={name}
          sx={{
            width: "100%",
            height: { xs: 250, sm: 300, md: 350 },
            objectFit: "contain",
          }}
        />
      </Link>

      {/* Wishlist & Price */}
      <Stack direction="row" justifyContent="space-between" px={2} mt={2}>
        <Stack direction="column" spacing={0.5}>
          {hasDiscount && (
            <Typography
              color="text.secondary"
              variant="subtitle2"
              sx={{ textDecoration: "line-through" }}
            >
              £{regularPrice.toLocaleString()}
            </Typography>
          )}
          <Typography color="primary.main" variant="subtitle1" fontWeight={600}>
            £{finalPrice.toLocaleString()}
          </Typography>
        </Stack>

        <Tooltip title="Remove from wishlist">
          <IconButton onClick={removeFromWishList} sx={{ color: "#D23F57" }}>
            <FavoriteIcon fontSize="medium" />
          </IconButton>
        </Tooltip>
      </Stack>

      {/* Product Info */}
      <Box px={2} pt={1} textAlign="center">
        <Link to={`/product/${_id}`} style={{ textDecoration: "none" }}>
          <Typography variant="body1" color="text.primary" noWrap>
            {name}
          </Typography>
        </Link>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          mt={0.5}
          noWrap
        >
          {description ? (description.length > 100 ? `${description.substring(0, 90)}...` : description) : ""}
        </Typography>
      </Box>

      {/* Add to Cart Button */}
      <Box px={2} pt={2}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<ShoppingCartIcon />}
          onClick={handleAddToCart}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 2,
            py: 1,
            boxShadow: "none",
            color: "#fff",
            "&:hover": { boxShadow: "0 4px 12px 0 rgb(0 0 0 / 0.15)" },
          }}
        >
          Add to Cart
        </Button>
      </Box>
    </Paper>
  );
};

WishListCard.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
    })
  ),
  name: PropTypes.string,
  description: PropTypes.string,
  regularPrice: PropTypes.number,
  salePrice: PropTypes.number,
  toggle: PropTypes.bool.isRequired,
  setToggle: PropTypes.func.isRequired,
  _id: PropTypes.string,
};

export default WishListCard;
