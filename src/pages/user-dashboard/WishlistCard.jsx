import { useState } from "react";
import axios from "axios";
import {
  Typography,
  Box,
  Stack,
  Tooltip,
  IconButton,
  Paper,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { base_url } from "../../utils/baseUrl";
import makeToast from "../../utils/toaster";
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
        // makeToast("success", "Product Added to WishList");
        setToggle(!toggle);
      })
      .catch((error) => {
        makeToast("error", "You must be logged. Sign in");
      });
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
        paddingBottom: 3,
      }}
    >
      <Link to={`/product/${_id}`} style={{ textDecoration: "none" }}>
        <img src={images[0]?.url} style={{ width: "100%", height: "auto" }} />
        {/* {images[0].url} */}
      </Link>

      <Link to={`/product/${_id}`} style={{ textDecoration: "none" }}>
        <Box px={2}>
          <Typography variant="body2" color="#373F50" textAlign="center">
            {name}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            textAlign="center"
            mt={1}
          >
            {description.length > 100
              ? `${description.substring(0, 90)}...`
              : description}
          </Typography>
        </Box>
      </Link>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        px={2}
        mt={2}
      >
        <Stack spacing={0.2} direction="row">
          <Typography
            color="text.secondary"
            variant="subtitle2"
            fontSize="13px"
          >
            <del>{salePrice ? `₦${regularPrice.toLocaleString()}` : ""}</del>
          </Typography>
          <Typography color="primary.main" variant="subtitle1" fontSize="13px">
            {`₦${(salePrice ? salePrice : regularPrice).toLocaleString()}`}
          </Typography>
        </Stack>

        <Tooltip title={"Remove from wishlist"}>
          <IconButton
            onClick={() => removeFromWishList()}
            sx={{
              color: "#D23F57",
            }}
          >
            <FavoriteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
    </Paper>
  );
};

export default WishListCard;
