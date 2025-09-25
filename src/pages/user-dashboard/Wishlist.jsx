import { useState, useEffect } from "react";
import { Typography, Stack, Button, Grid, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WishListCard from "./WishlistCard";
import { useSelector, useDispatch } from "react-redux";
import { base_url } from "../../utils/baseUrl";
import { getWishList } from "../../features/auth/authSlice";
import { addAllToCart } from "../../features/cart/cartSlice";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";

const WishList = ({ openDrawer }) => {
  const isNonMobile = useMediaQuery("(min-width:968px)");

  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [toggle, setToggle] = useState(false);
  const auth = useSelector((state) => state.auth);
  const { user, wishlist } = auth;

  useEffect(() => {
    dispatch(getWishList());
    getWishList();
  }, [toggle]);
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
            <FavoriteIcon
              sx={{
                color: "#D23F57",
              }}
            />

            <Typography variant="h5" fontSize={{ xs: "20px", md: "25px" }}>
              My WishList
            </Typography>
          </Stack>

          <Button
            disabled={wishlist.length === 0}
            onClick={() => {
              const productItems = wishlist.map((product) => ({
                id: product._id,
                image: product.images[0].url,
                price: product.salePrice
                  ? product.salePrice
                  : product.regularPrice,
                name: product.name,
              }));
              dispatch(addAllToCart(productItems));
            }}
            sx={{
              textTransform: "none",
              bgcolor: "#FCE9EC",
              color: "primary.main",
              fontSize: "subtitle2",
              paddingX: isNonMobile ? "40px" : "20px",

              fontWeight: 600,
              paddingY: "6px",
              "&:hover": {
                backgroundColor: "rgba(210, 63, 87, 0.04)",
              },
            }}
          >
            Add All To Cart
          </Button>
        </Stack>
        <IconButton
          onClick={openDrawer}
          sx={{
            display: isNonMobile ? "none" : "inline-flex",
          }}
        >
          <MenuIcon />
        </IconButton>
      </Stack>

      <Grid
        container
        spacing={3}
        sx={{
          marginLeft: "-24px !important",
        }}
      >
        {wishlist.map((item) => (
          <Grid item xs={12} sm={6} md={4}>
            <WishListCard {...item} toggle={toggle} setToggle={setToggle} />
          </Grid>
        ))}
        <Grid></Grid>
      </Grid>
    </Stack>
  );
};

export default WishList;
