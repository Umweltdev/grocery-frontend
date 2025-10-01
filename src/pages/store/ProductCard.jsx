import { useState } from "react";
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
  Link as MuiLink,
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
  const [expanded, setExpanded] = useState(false);

  const truncateText = (text, limit = 50) => {
    if (expanded || text.length <= limit) return text;
    return text.slice(0, limit) + "...";
  };

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
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.35)",
        },
      }}
    >
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

      <CardContent
        sx={{ p: 2.5, flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <Box sx={{ flexGrow: 1 }}>
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

          {totalStar > 0 && (
            <Rating value={totalStar} readOnly size="small" sx={{ mb: 1 }} />
          )}

          {description && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 1, fontWeight: 500 }}
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
          )}

          <Stack direction="row" spacing={1} alignItems="center" mb={2}>
            {salePrice && (
              <Typography
                color="text.secondary"
                sx={{ textDecoration: "line-through", fontSize: "0.875rem" }}
              >
                £{regularPrice.toLocaleString()}
              </Typography>
            )}
            <Typography
              color="primary"
              variant="h6"
              sx={{ fontWeight: "bold" }}
            >
              £
              {(
                pricing?.finalPrice ||
                salePrice ||
                regularPrice
              ).toLocaleString()}
            </Typography>
            {pricing?.discount > 0 && (
              <Typography
                variant="caption"
                color="success.main"
                fontWeight={600}
              >
                -{pricing.discount.toFixed(1)}% RCD
              </Typography>
            )}
          </Stack>
        </Box>

        {/* Bottom-aligned Add to Cart */}
        <Box>
          {stock <= 0 ? (
            <Button
              disabled
              startIcon={<BlockIcon />}
              fullWidth
              sx={{
                textTransform: "none",
                bgcolor: "#f0f0f0",
                color: "rgba(0,0,0,0.5)",
                borderRadius: 2.5,
                py: 1.5,
                fontWeight: 600,
              }}
            >
              Out of Stock
            </Button>
          ) : count > 0 ? (
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              justifyContent="center"
            >
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
                mt: 2,
                py: 1.5,
                bgcolor: "#D23F57",
                color: "#fff",
                borderRadius: 2.5,
                fontWeight: "bold",
                fontSize: "1rem",
                boxShadow: 3,
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#B93247",
                  transform: "translateY(-3px)",
                  boxShadow: 6,
                },
              }}
            >
              Add to Cart
            </Button>
          )}
        </Box>
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
