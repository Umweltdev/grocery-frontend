import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {
  Typography,
  Box,
  Stack,
  Button,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  Rating,
  Link as MuiLink,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { base_url } from "../../utils/baseUrl";
import makeToast from "../../utils/toaster";
import { Link } from "react-router-dom";

const ICard = ({
  images = [
    "https://res.cloudinary.com/dkcgd7fio/image/upload/v1758917148/samples/breakfast.jpg",
  ],
  name = "Fresh Organic Bananas",
  description = "Sweet and nutritious organic bananas, perfect for smoothies, baking, or a healthy snack. Rich in potassium and natural energy.",
  regularPrice = 2.99,
  salePrice = 1.99,
  totalstar = 4,
  _id,
  reviewCount = 1,
}) => {
  const dispatch = useDispatch();
  const { user, wishlist } = useSelector((state) => state.auth);

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setIsWishlisted(wishlist?.some((item) => item._id === _id) ?? false);
  }, [wishlist, _id]);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: _id,
        image:
          (typeof images[0] === "string" ? images[0] : images[0]?.url) ||
          "/placeholder.jpg",
        price: salePrice ?? regularPrice,
        name,
      })
    );
    makeToast("success", `${name} added to cart`);
  };

  const toggleWishlist = (e) => {
    e.preventDefault();
    if (!user?.token) {
      makeToast("error", "You must be logged in to manage your wishlist.");
      return;
    }

    axios
      .put(`${base_url}product/wishlist/${_id}`, null, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then(() => {
        setIsWishlisted(!isWishlisted);
        makeToast(
          "success",
          !isWishlisted ? "Added to wishlist" : "Removed from wishlist"
        );
      })
      .catch(() => makeToast("error", "Unable to update wishlist"));
  };

  const imageUrl =
    (typeof images[0] === "string" ? images[0] : images[0]?.url) ||
    "/placeholder.png";

  const truncateText = (text, limit = 50) => {
    if (expanded || text.length <= limit) return text;
    return text.slice(0, limit) + "...";
  };

  return (
    <Link
      to={`/product/${_id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Card
        sx={{
          maxWidth: 384,
          width: "100%",
          borderRadius: 3,
          fontFamily: "sans-serif",
          boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
          transition: "all 500ms ease-in-out",
          overflow: "hidden",
          height: "100%",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.35)",
          },
        }}
      >
        <Box sx={{ position: "relative", overflow: "hidden" }}>
          <CardMedia
            component="img"
            image={imageUrl}
            alt={name}
            sx={{
              height: 250,
              objectFit: "cover",
              transition: "transform 500ms",
              "&:hover": { transform: "scale(1.1)" },
            }}
          />

          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              p: 2.5,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
              color: "white",
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Rating
                name="read-only"
                value={totalstar}
                readOnly
                precision={0.5}
                size="small"
                sx={{ color: "#FFC107" }}
              />
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                ({reviewCount.toLocaleString()} reviews)
              </Typography>
            </Stack>
          </Box>

          <IconButton
            onClick={toggleWishlist}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              color: isWishlisted ? "red" : "white",
              bgcolor: "rgba(0, 0, 0, 0.2)",
              transition: "all 300ms",
              "&:hover": {
                bgcolor: "rgba(0, 0, 0, 0.5)",
                transform: "scale(1.1)",
              },
            }}
          >
            <FavoriteIcon />
          </IconButton>
        </Box>

        <CardContent
          sx={{
            p: 2.5,
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            mb: "10",
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="h3"
            sx={{ fontWeight: "800", lineHeight: 1.2 }}
          >
            {name}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1, fontWeight: 500 }}
          >
            {truncateText(description, 50)}{" "}
            {description.length > 50 && (
              <MuiLink
                component="button"
                variant="body2"
                onClick={(e) => {
                  e.preventDefault();
                  setExpanded(!expanded);
                }}
                sx={{ color: "#D23F57", fontWeight: "bold" }}
              >
                {expanded ? "See less" : "See more"}
              </MuiLink>
            )}
          </Typography>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mt={2.5}
          >
            <Box>
              <Typography
                variant="h4"
                component="span"
                sx={{ fontWeight: "bold" }}
              >
                £{salePrice.toLocaleString()}
              </Typography>
              <Typography
                variant="body1"
                component="span"
                sx={{
                  textDecoration: "line-through",
                  color: "text.secondary",
                  ml: 1.5,
                  fontWeight: 500,
                }}
              >
                £{regularPrice.toLocaleString()}
              </Typography>
            </Box>

            <Stack direction="row" spacing={0.5}>
              {["#3B82F6", "#000000", "#EF4444"].map((color) => (
                <Box
                  key={color}
                  sx={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    bgcolor: color,
                    border: "2px solid white",
                    boxShadow: 1,
                  }}
                />
              ))}
            </Stack>
          </Stack>

          {/* Cart Button */}
          <Button
            fullWidth
            variant="contained"
            startIcon={<ShoppingCartIcon />}
            onClick={handleAddToCart}
            sx={{
              mt: "auto",
              py: 1.5,
              bgcolor: "#D23F57",
              color: "white",
              borderRadius: 2.5,
              fontWeight: "bold",
              fontSize: "1rem",
              boxShadow: 3,
              transition: "all 300ms ease-in-out",
              "&:hover": {
                bgcolor: "#B93247",
                transform: "translateY(-4px)",
                boxShadow: 6,
              },
            }}
          >
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
};

ICard.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({ url: PropTypes.string })),
  name: PropTypes.string,
  description: PropTypes.string,
  regularPrice: PropTypes.number,
  salePrice: PropTypes.number,
  totalstar: PropTypes.number,
  _id: PropTypes.string.isRequired,
  reviewCount: PropTypes.number,
};

export default ICard;
