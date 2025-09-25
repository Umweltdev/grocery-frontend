import { useState } from "react";
import axios from "axios";
import {
  Typography,
  Box,
  Stack,
  Tooltip,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Chip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { base_url } from "../../utils/baseUrl";
import makeToast from "../../utils/toaster";
import { addToCart } from "../../features/cart/cartSlice";
import { Link } from "react-router-dom";

const WishListCard = ({
  images,
  name,
  description,
  regularPrice,
  salePrice,
  totalstar,
  toggle,
  setToggle,
  _id,
}) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { user } = auth;

  const removeFromWishList = () => {
    axios
      .put(`${base_url}product/wishlist/${_id}`, null, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((response) => {
        makeToast("success", "Removed from wishlist");
        setToggle(!toggle);
      })
      .catch((error) => {
        makeToast("error", "Error removing from wishlist");
      });
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(
      addToCart({
        id: _id,
        image: images[0]?.url,
        price: salePrice || regularPrice,
        name,
      })
    );
    makeToast("success", "Added to cart");
  };

  const finalPrice = salePrice || regularPrice;
  const hasDiscount = salePrice && salePrice < regularPrice;

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        transition: "all 0.3s ease-in-out",
        position: "relative",
        "&:hover": {
          borderColor: "primary.300",
          boxShadow: "0 8px 25px 0 rgb(0 0 0 / 0.1)",
          transform: "translateY(-4px)",
        },
      }}
    >
      {/* Wishlist Heart Button */}
      <IconButton
        onClick={removeFromWishList}
        sx={{
          position: "absolute",
          top: 12,
          right: 12,
          zIndex: 2,
          bgcolor: "white",
          boxShadow: "0 2px 8px 0 rgb(0 0 0 / 0.1)",
          color: "error.main",
          "&:hover": {
            bgcolor: "error.50",
            transform: "scale(1.1)",
          },
        }}
      >
        <FavoriteIcon fontSize="small" />
      </IconButton>

      {/* Discount Badge */}
      {hasDiscount && (
        <Chip
          label={`-${Math.round(((regularPrice - salePrice) / regularPrice) * 100)}%`}
          color="error"
          size="small"
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
            zIndex: 2,
            fontWeight: 700,
            fontSize: "0.75rem",
          }}
        />
      )}

      {/* Product Image */}
      <CardMedia
        component={Link}
        to={`/product/${_id}`}
        sx={{
          height: 200,
          backgroundSize: "contain",
          backgroundPosition: "center",
          textDecoration: "none",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
        image={images[0]?.url}
        title={name}
      />

      {/* Product Content */}
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography
          component={Link}
          to={`/product/${_id}`}
          variant="h6"
          sx={{
            textDecoration: "none",
            color: "text.primary",
            fontWeight: 600,
            fontSize: "1rem",
            lineHeight: 1.3,
            mb: 1,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            "&:hover": {
              color: "primary.main",
            },
          }}
        >
          {name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={
            {
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              mb: 2,
              lineHeight: 1.4,
            }
          }
        >
          {description}
        </Typography>

        {/* Price Section */}
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <Typography
            variant="h6"
            color="primary.main"
            fontWeight={700}
            fontSize="1.1rem"
          >
            ₦{finalPrice.toLocaleString()}
          </Typography>
          {hasDiscount && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textDecoration: "line-through" }}
            >
              ₦{regularPrice.toLocaleString()}
            </Typography>
          )}
        </Stack>
      </CardContent>

      {/* Action Button */}
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<ShoppingCartIcon />}
          onClick={handleAddToCart}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 2,
            py: 1.2,
            boxShadow: "none",
            "&:hover": {
              boxShadow: "0 4px 12px 0 rgb(0 0 0 / 0.15)",
            },
          }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default WishListCard;
