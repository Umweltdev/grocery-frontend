import { useState, useEffect } from "react";
import {
  Typography,
  Stack,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import WishListCard from "./WishlistCard";
import { useSelector, useDispatch } from "react-redux";
import { getWishList } from "../../features/auth/authSlice";
import { addAllToCart } from "../../features/cart/cartSlice";
import DashboardHeader from "./Header";

const WishList = ({ openDrawer }) => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const auth = useSelector((state) => state.auth);
  const { wishlist } = auth;

  useEffect(() => {
    dispatch(getWishList());
  }, [dispatch, toggle]);

  const handleAddAllToCart = () => {
    const productItems = wishlist.map((product) => ({
      id: product._id,
      image: product.images[0]?.url,
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
        button={wishlist.length > 0 ? "Add All to Cart" : null}
        link="#"
      />

      {wishlist.length === 0 ? (
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
              sx={{
                fontSize: 64,
                color: "text.disabled",
                mb: 2,
              }}
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
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="body2" color="text.secondary">
              {wishlist.length} item{wishlist.length !== 1 ? "s" : ""} in your
              wishlist
            </Typography>
            <Button
              variant="outlined"
              startIcon={<ShoppingCartIcon />}
              onClick={handleAddAllToCart}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 2,
              }}
            >
              Add All to Cart
            </Button>
          </Stack>

          <Grid container spacing={3}>
            {wishlist.map((item, index) => (
              <Grid item xs={12} sm={6} lg={4} key={item._id || index}>
                <WishListCard {...item} toggle={toggle} setToggle={setToggle} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Stack>
  );
};

export default WishList;
