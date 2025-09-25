import { useEffect } from "react";
import { Stack, Grid, Typography, Button, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCards } from "../../features/auth/authSlice";
import { setSelectedCard } from "../../features/order/orderSlice";
import { getCardImage } from "../user-dashboard/Payments";
import { base_url } from "../../utils/baseUrl";
import axios from "axios";
import makeToast from "../../utils/toaster";

const Card = ({ _id, cardDetails }) => {
  const { brand, account_name, last4 } = cardDetails;
  const { selectedCard } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const isSelected = selectedCard === _id;
  const handleClick = () => {
    dispatch(setSelectedCard(_id));
  };

  return (
    <Stack
      bgcolor="#f6f9fc"
      borderRadius="8px"
      p={2}
      spacing={1}
      onClick={handleClick}
      sx={{
        cursor: "pointer",
        border: isSelected ? "1px solid #d23f57" : "none",
        textTransform: "capitalize",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          boxShadow: "rgba(3, 0, 71, 0.09) 0px 1px 3px",
          overflow: "hidden",
          width: "42px",
          height: "28px",
          borderRadius: "2px",
        }}
      >
        {getCardImage(brand)}
      </Box>

      <Typography variant="subtitle2" flex="1 1 0">
        {`**** **** **** ${last4}`}
      </Typography>
      <Typography variant="subtitle1">{account_name}</Typography>
    </Stack>
  );
};

const Cards = ({ option }) => {
  const dispatch = useDispatch();
  const { cards, user } = useSelector((state) => state.auth);
  const { orderMessage, selectedCard, selectedAddress } = useSelector(
    (state) => state.order
  );

  const createOrder = async () => {
    if (option === "voucher") {
      makeToast(
        "error",
        "Apologies! Currently, only cash/card payments are accepted."
      );
      return;
    }
    try {
      const response = await axios.post(
        `${base_url}user/order`,
        {
          address: selectedAddress._id,
          paymentMethod: option,
          deliveryDate: "2-2-23",
          deliveryTime: "9am",
          comment: orderMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      if (option === "card" && response.data.authorizationUrl) {
        window.location.href = response.data.authorizationUrl;
        localStorage.removeItem("cartState");
      }
    } catch (error) {
      console.log(error);
      makeToast("error", "Please try again, something went wrong");
    }
  };

  useEffect(() => {
    const getUserCards = async () => {
      dispatch(getCards());
    };
    getUserCards();
  }, []);

  if (cards.length === 0) return null;

  return (
    <Box
      sx={{
        px: 3,
        pb: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Stack
        direction="row"
        justifyContent={{ xs: "start", sm: "end" }}
        alignItems="center"
      >
        <Button
          variant="outlined"
          onClick={() => {
            dispatch(setSelectedCard(null));
            createOrder();
          }}
          sx={{
            textTransform: "none",
            bgcolor: "white",
            color: "primary.main",
            fontSize: "subtitle2",
            paddingX: "20px",
            fontWeight: 600,
            paddingY: "6px",
            "&:hover": {
              backgroundColor: "#FCE9EC",
            },
          }}
        >
          Pay with new card
        </Button>
      </Stack>
      <Typography variant="subtitle2">Saved Cards</Typography>
      <Grid container spacing={2}>
        {cards.map((card) => (
          <Grid item xs={12} sm={4}>
            <Card {...card} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Cards;
