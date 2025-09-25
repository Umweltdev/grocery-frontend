import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Typography,
  Box,
  Stack,
  Tooltip,
  IconButton,
  Paper,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { base_url } from "../../utils/baseUrl";
import makeToast from "../../utils/toaster";
import { Link } from "react-router-dom";

const WishListCard = ({
  images = [],
  name,
  description,
  regularPrice,
  salePrice,
  toggle,
  setToggle,
  _id,
}) => {
  const { user } = useSelector((state) => state.auth);

  const removeFromWishList = () => {
    axios
      .put(`${base_url}product/wishlist/${_id}`, null, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then(() => setToggle(!toggle))
      .catch(() => makeToast("error", "You must be logged in"));
  };

  return (
    <Paper
      elevation={3}
      sx={{
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        overflow: "hidden",
        width: "100%",
        maxWidth: 380,
        margin: "auto",
        paddingBottom: 2,
        boxSizing: "border-box",
      }}
    >
      <Link to={`/product/${_id}`} style={{ textDecoration: "none" }}>
        <Box
          component="img"
          src={images[0]?.url || "/placeholder.png"}
          alt={name}
          sx={{
            width: "100%",
            height: { xs: 250, sm: 300, md: 350 },
            objectFit: "contain",
          }}
        />
      </Link>
      <Link to={`/product/${_id}`} style={{ textDecoration: "none" }}>
        <Box px={2} pt={2}>
          <Typography
            variant="body1"
            color="text.primary"
            textAlign="center"
            noWrap
          >
            {name}
          </Typography>
          <Typography
            variant="subtitle1"
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
        <Stack direction="column" spacing={0.5}>
          {salePrice && (
            <Typography
              color="text.secondary"
              variant="subtitle2"
              fontSize={14}
              sx={{ textDecoration: "line-through" }}
            >
              £{regularPrice.toLocaleString()}
            </Typography>
          )}
          <Typography color="primary.main" variant="subtitle1" fontSize={16}>
            £{(salePrice || regularPrice).toLocaleString()}
          </Typography>
        </Stack>

        <Tooltip title="Remove from wishlist">
          <IconButton onClick={removeFromWishList} sx={{ color: "#D23F57" }}>
            <FavoriteIcon fontSize="medium" />
          </IconButton>
        </Tooltip>
      </Stack>
    </Paper>
  );
};

WishListCard.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
    })
  ),
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  regularPrice: PropTypes.number.isRequired,
  salePrice: PropTypes.number,
  toggle: PropTypes.bool.isRequired,
  setToggle: PropTypes.func.isRequired,
  _id: PropTypes.string.isRequired,
};

export default WishListCard;
