import PropTypes from "prop-types";
import {
  Box,
  Stack,
  IconButton,
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Rating,
} from "@mui/material";
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  ShoppingCartOutlined as ShoppingCartOutlinedIcon,
  Block as BlockIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const ProductCard = ({
  id,
  name,
  images,
  regularPrice,
  salePrice,
  description,
  stock,
  totalStar,
  count,
  onAddToCart,
  onRemoveFromCart,
  onToggleWishlist,
  wishlist,
  pricing,
}) => {
  const imageUrl = images[0]?.url || "/placeholder.png";

  return (
    <Card
      sx={{
        maxWidth: 384,
        width: "100%",
        borderRadius: 3,
        fontFamily: "sans-serif",
        boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
        transition: "all 500ms ease-in-out",
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.35)",
        },
      }}
    >
      {/* Image + Wishlist */}
      <Box sx={{ position: "relative" }}>
        <Link
          to={`/product/${id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <CardMedia
            component="img"
            image={imageUrl}
            alt={name}
            sx={{
              height: 240,
              objectFit: "contain",
              bgcolor: "#fafafa",
              transition: "transform 500ms",
              "&:hover": { transform: "scale(1.05)" },
            }}
          />
        </Link>

        <IconButton
          onClick={onToggleWishlist}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            color: wishlist ? "#E3364E" : "white",
            bgcolor: "rgba(0, 0, 0, 0.3)",
            "&:hover": { bgcolor: "rgba(0,0,0,0.6)" },
            transition: "all 300ms",
          }}
        >
          {wishlist ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Box>

      {/* Content */}
      <CardContent sx={{ p: 2.5 }}>
        {/* Name */}
        <Link to={`/product/${id}`} style={{ textDecoration: "none" }}>
          <Typography
            gutterBottom
            variant="h6"
            component="h3"
            sx={{
              fontWeight: 700,
              textAlign: "left",
              lineHeight: 1.3,
              color: "text.primary",
            }}
          >
            {name}
          </Typography>
        </Link>

        {/* Rating */}
        {totalStar > 0 && (
          <Rating value={totalStar} readOnly size="small" sx={{ mb: 1 }} />
        )}

        {/* Description */}
        {description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              mb: 1,
            }}
          >
            {description}
          </Typography>
        )}

        {/* Price */}
        <Stack direction="row" spacing={1} alignItems="center" mb={2}>
          {salePrice && (
            <Typography
              color="text.secondary"
              sx={{ textDecoration: "line-through", fontSize: "0.875rem" }}
            >
              £{regularPrice.toLocaleString()}
            </Typography>
          )}
          <Typography color="primary" variant="h6" sx={{ fontWeight: "bold" }}>
            £
            {(
              pricing?.finalPrice ||
              salePrice ||
              regularPrice
            ).toLocaleString()}
          </Typography>
          {pricing?.discount > 0 && (
            <Typography variant="caption" color="success.main" fontWeight={600}>
              -{pricing.discount.toFixed(1)}% RCD
            </Typography>
          )}
        </Stack>

        {/* Cart Actions */}
        <Stack direction="row" spacing={1} alignItems="center">
          {stock <= 0 ? (
            <Button
              disabled
              startIcon={<BlockIcon />}
              sx={{
                flex: 1,
                textTransform: "none",
                bgcolor: "#f0f0f0",
                color: "rgba(0,0,0,0.5)",
                borderRadius: 2,
                py: 1,
              }}
            >
              Out of Stock
            </Button>
          ) : count > 0 ? (
            <Stack direction="row" spacing={1} alignItems="center">
              <Button onClick={onRemoveFromCart} size="small">
                <RemoveIcon fontSize="small" />
              </Button>
              <Typography>{count}</Typography>
              <Button onClick={onAddToCart} size="small">
                <AddIcon fontSize="small" />
              </Button>
            </Stack>
          ) : (
            <Button
              onClick={onAddToCart}
              startIcon={<ShoppingCartOutlinedIcon />}
              fullWidth
              sx={{
                textTransform: "none",
                bgcolor: "#D23F57",
                color: "#fff",
                borderRadius: 2,
                py: 1.2,
                fontWeight: 600,
                "&:hover": { bgcolor: "#B93247" },
              }}
            >
              Add to Cart
            </Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

ProductCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.shape({ url: PropTypes.string })),
  regularPrice: PropTypes.number.isRequired,
  salePrice: PropTypes.number,
  description: PropTypes.string,
  stock: PropTypes.number,
  totalStar: PropTypes.number,
  count: PropTypes.number,
  onAddToCart: PropTypes.func,
  onRemoveFromCart: PropTypes.func,
  onToggleWishlist: PropTypes.func,
  wishlist: PropTypes.bool,
  pricing: PropTypes.shape({
    finalPrice: PropTypes.number,
    discount: PropTypes.number,
    mcdMultiplier: PropTypes.number,
  }),
};

ProductCard.defaultProps = {
  images: [],
  salePrice: null,
  description: "",
  stock: 0,
  totalStar: 0,
  count: 0,
  onAddToCart: () => {},
  onRemoveFromCart: () => {},
  onToggleWishlist: () => {},
  wishlist: false,
};

export default ProductCard;
