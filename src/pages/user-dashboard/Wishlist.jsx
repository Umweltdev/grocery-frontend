import { useState, useEffect } from "react";
import {
  Typography,
  Stack,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import WishListCard from "./WishlistCard";
import DashboardHeader from "./Header";
import { getWishList } from "../../features/auth/authSlice";
import { addAllToCart } from "../../features/cart/cartSlice";
import useMediaQuery from "@mui/material/useMediaQuery";

const WishList = ({ openDrawer }) => {
  const isNonMobile = useMediaQuery("(min-width:968px)");
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const { user, wishlist } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.token) {
      dispatch(getWishList());
    }
  }, [dispatch, toggle, user?.token]);

  const handleAddAllToCart = () => {
    const productItems = wishlist.map((product) => ({
      id: product._id,
      image: product.images[0]?.url || "/placeholder.png",
      price: product.salePrice || product.regularPrice,
      name: product.name,
    }));
    dispatch(addAllToCart(productItems));
  };

  return (
    <Stack spacing={4}>
      <DashboardHeader
        Icon={FavoriteIcon}
        title="My Wishlist"
        openDrawer={openDrawer}
        button={wishlist && wishlist.length > 0 ? "Add All to Cart" : null}
        link="#"
      />

      {(!wishlist || wishlist.length === 0) ? (
        <Card
          elevation={0}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 3,
            textAlign: "center",
            py: 8,
          }}
        >
          <CardContent>
            <FavoriteIcon
              sx={{ fontSize: 64, color: "text.disabled", mb: 2 }}
            />
            <Typography variant="h6" color="text.secondary" mb={1}>
              Your Wishlist is Empty
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Add products you love to see them here
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <>
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "start", md: "center" }}
            mb={2}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <FavoriteIcon sx={{ color: "#D23F57" }} />
              <Typography variant="h5" fontSize={{ xs: "20px", md: "25px" }}>
                {wishlist.length} item{wishlist.length !== 1 ? "s" : ""} in your wishlist
              </Typography>
            </Stack>

            <Button
              disabled={!wishlist || wishlist.length === 0}
              onClick={handleAddAllToCart}
              sx={{
                textTransform: "none",
                bgcolor: "#FCE9EC",
                color: "primary.main",
                fontSize: "subtitle2",
                fontWeight: 600,
                px: isNonMobile ? 4 : 2,
                py: 1,
                "&:hover": { backgroundColor: "rgba(210, 63, 87, 0.04)" },
              }}
              startIcon={<ShoppingCartIcon />}
            >
              Add All to Cart
            </Button>

            <IconButton
              onClick={openDrawer}
              sx={{ display: isNonMobile ? "none" : "inline-flex" }}
            >
              <MenuIcon />
            </IconButton>
          </Stack>

          <Grid container spacing={3}>
            {wishlist.map((item) => (
              <Grid key={item._id} item xs={12} sm={6} md={4}>
                <WishListCard {...item} toggle={toggle} setToggle={setToggle} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Stack>
  );
};

WishList.propTypes = {
  openDrawer: PropTypes.func.isRequired,
};

export default WishList;
