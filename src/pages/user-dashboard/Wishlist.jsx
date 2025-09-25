import { useState, useEffect } from "react";
import { Typography, Stack, Button, Grid, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector, useDispatch } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import PropTypes from "prop-types";

import WishListCard from "./WishlistCard";
import { getWishList } from "../../features/auth/authSlice";
import { addAllToCart } from "../../features/cart/cartSlice";

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
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="start">
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "start", md: "center" }}
          width={{ xs: "auto", md: "100%" }}
        >
          <Stack
            direction="row"
            spacing={{ xs: 1, md: 2 }}
            alignItems="center"
            mb={{ xs: 1.5, md: 0 }}
          >
            <FavoriteIcon sx={{ color: "#D23F57" }} />
            <Typography variant="h5" fontSize={{ xs: "20px", md: "25px" }}>
              My WishList
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
          >
            Add All To Cart
          </Button>
        </Stack>

        <IconButton
          onClick={openDrawer}
          sx={{ display: isNonMobile ? "none" : "inline-flex" }}
        >
          <MenuIcon />
        </IconButton>
      </Stack>

      <Grid container spacing={3}>
        {wishlist && wishlist.length > 0 ? (
          wishlist.map((item) => (
            <Grid key={item._id} item xs={12} sm={6} md={4}>
              <WishListCard {...item} toggle={toggle} setToggle={setToggle} />
            </Grid>
          ))
        ) : (
          <Typography variant="subtitle1" color="text.secondary" mt={3} mx={2}>
            Your wishlist is empty.
          </Typography>
        )}
      </Grid>
    </Stack>
  );
};

WishList.propTypes = {
  openDrawer: PropTypes.func.isRequired,
};

export default WishList;
