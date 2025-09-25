import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {
  Typography,
  Box,
  Stack,
  Tooltip,
  Button,
  IconButton,
  Paper,
  Rating,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseQuantity } from "../../features/cart/cartSlice";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import BlockIcon from "@mui/icons-material/Block";
import { base_url } from "../../utils/baseUrl";
import makeToast from "../../utils/toaster";
import { Link } from "react-router-dom";

const DUMMY_PRODUCTS = [
  {
    _id: "1",
    name: "Fresh Apples",
    description: "Crisp and sweet red apples, perfect for snacking.",
    regularPrice: 2500,
    salePrice: 2000,
    stock: 12,
    totalstar: 4,
    images: [{ url: "/images/apples.jpg" }],
  },
  {
    _id: "2",
    name: "Organic Bananas",
    description: "Ripe organic bananas full of natural energy.",
    regularPrice: 1500,
    stock: 8,
    totalstar: 5,
    images: [{ url: "/images/bananas.jpg" }],
  },
  {
    _id: "3",
    name: "Fresh Milk",
    description: "1L full cream fresh milk from local farms.",
    regularPrice: 1800,
    stock: 0,
    totalstar: 3,
    images: [{ url: "/images/milk.jpg" }],
  },
];

const ICard = ({
  images = DUMMY_PRODUCTS[0].images,
  name = DUMMY_PRODUCTS[0].name,
  description = DUMMY_PRODUCTS[0].description,
  regularPrice = DUMMY_PRODUCTS[0].regularPrice,
  salePrice = DUMMY_PRODUCTS[0].salePrice,
  stock = DUMMY_PRODUCTS[0].stock,
  totalstar = DUMMY_PRODUCTS[0].totalstar,
  _id = DUMMY_PRODUCTS[0]._id,
  pricing,
}) => {
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.cart);
  const product = products.find((product) => product.id === _id);

  const auth = useSelector((state) => state.auth);
  const { user } = auth;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: _id,
        image: images[0]?.url,
        price: pricing?.finalPrice || salePrice || regularPrice,
        name,
      })
    );
    makeToast("success", "Added to Cart");
  };

  const handleRemoveCart = () => {
    dispatch(decreaseQuantity(_id));
    makeToast("error", "Removed from Cart");
  };

  const addToWishList = () => {
    if (!user?.token) {
      makeToast("error", "You must be logged in. Sign in.");
      return;
    }
    axios
      .put(`${base_url}product/wishlist/${_id}`, null, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then(() => setToggle(!toggle))
      .catch(() => makeToast("error", "Unable to update wishlist"));
  };

  return (
    <Paper
      elevation={3}
      sx={{
        backgroundColor: "#fff",
        height: "100%",
        margin: "auto",
        display: "flex",
        overflow: "hidden",
        borderRadius: "8px",
        position: "relative",
        flexDirection: "column",
        pb: 3,
      }}
    >
      <Link to={`/product/${_id}`} style={{ textDecoration: "none" }}>
        <img
          src={images[0]?.url}
          alt={name}
          className="card-image"
          style={{ width: "100%", objectFit: "cover" }}
        />
      </Link>

      <Link to={`/product/${_id}`} style={{ textDecoration: "none" }}>
        <Box px={2} textAlign="center">
          <Typography variant="body2" color="#373F50">
            {name}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" mt={1}>
            {description.length > 100
              ? `${description.substring(0, 85)}...`
              : description}
          </Typography>
          <Rating
            name="read-only-rating"
            value={totalstar || 0}
            precision={0.5}
            readOnly
            size="small"
            sx={{ mt: 1 }}
          />
        </Box>
      </Link>

      {stock > 0 ? (
        <Box mt={2} sx={{ alignSelf: "center" }}>
          {product?.count > 0 ? (
            <Stack direction="row" spacing={2} alignItems="center">
              <Button
                onClick={handleRemoveCart}
                variant="outlined"
                sx={{ p: 1, minWidth: 0 }}
              >
                <RemoveIcon />
              </Button>
              <Typography>{product?.count}</Typography>
              <Button
                onClick={handleAddToCart}
                variant="outlined"
                sx={{ p: 1, minWidth: 0 }}
              >
                <AddIcon />
              </Button>
            </Stack>
          ) : (
            <Button
              onClick={handleAddToCart}
              sx={{
                textTransform: "none",
                bgcolor: "primary.main",
                color: "white",
                fontSize: "14px",
                px: "20px",
                fontWeight: 500,
                py: "8px",
                borderRadius: "50px",
                gap: 1,
                "&:hover": { backgroundColor: "#E3364E" },
              }}
            >
              <ShoppingCartOutlinedIcon sx={{ fontSize: "20px" }} />
              <Typography variant="subtitle1">Add To Cart</Typography>
            </Button>
          )}
        </Box>
      ) : (
        <Box mt={2} sx={{ alignSelf: "center" }}>
          <Button
            disabled
            sx={{
              textTransform: "none",
              bgcolor: "#0000001f",
              fontSize: "14px",
              px: "20px",
              fontWeight: 500,
              py: "8px",
              borderRadius: "50px",
              gap: 1,
              cursor: "not-allowed",
            }}
          >
            <BlockIcon sx={{ fontSize: "20px" }} />
            <Typography variant="subtitle1">BACK SOON</Typography>
          </Button>
        </Box>
      )}

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        px={2}
        mt={2}
      >
        <Stack spacing={0.2} direction="row">
          {salePrice && (
            <Typography
              color="text.secondary"
              variant="subtitle2"
              fontSize="13px"
            >
              <del>₦{regularPrice.toLocaleString()}</del>
            </Typography>
          )}
          <Typography color="primary.main" variant="subtitle1" fontSize="13px">
            ₦{(pricing?.finalPrice || salePrice || regularPrice).toLocaleString()}
          </Typography>
          {pricing?.discount > 0 && (
            <Typography variant="caption" color="success.main" fontSize="10px">
              -{pricing.discount.toFixed(1)}% RCD
            </Typography>
          )}
        </Stack>

        <Tooltip title={toggle ? "Remove from wishlist" : "Add to wishlist"}>
          <span>
            <IconButton
              onClick={addToWishList}
              sx={{ color: toggle ? "#D23F57" : "#00000042" }}
            >
              <FavoriteIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
      </Stack>
    </Paper>
  );
};

ICard.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({ url: PropTypes.string })),
  name: PropTypes.string,
  description: PropTypes.string,
  regularPrice: PropTypes.number,
  salePrice: PropTypes.number,
  stock: PropTypes.number,
  totalstar: PropTypes.number,
  _id: PropTypes.string,
  pricing: PropTypes.shape({
    finalPrice: PropTypes.number,
    discount: PropTypes.number,
    mcdMultiplier: PropTypes.number,
  }),
};

export default ICard;
