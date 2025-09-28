import { useEffect, useState } from "react";
import { Typography, Stack, Paper, IconButton, Box } from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DeleteIcon from "@mui/icons-material/Delete";
import { base_url } from "../../utils/baseUrl";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getCards } from "../../features/auth/authSlice";
import Header from "./Header";
import useMediaQuery from "@mui/material/useMediaQuery";

// helper to render correct card image
export const getCardImage = (brand) => {
  switch (brand?.toLowerCase()) {
    case "visa":
      return (
        <img
          src="https://bazaar.ui-lib.com/assets/images/payment-methods/Visa.svg"
          alt="Visa"
          width="100%"
        />
      );
    case "master":
    case "mastercard":
      return (
        <img
          src="https://bazaar.ui-lib.com/assets/images/payment-methods/Mastercard.svg"
          alt="Mastercard"
          width="100%"
        />
      );
    case "verve":
      return (
        <img
          src="https://bazaar.ui-lib.com/assets/images/payment-methods/Visa.svg"
          alt="Verve"
          width="100%"
        />
      );
    default:
      return (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            bgcolor: "grey.300",
          }}
        />
      );
  }
};

const PaymentCard = ({ _id, cardDetails, isDeleted, setIsDeleted }) => {
  const { user } = useSelector((state) => state.auth);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const deleteCard = () => {
    axios
      .delete(`${base_url}card/${_id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then(() => {
        setIsDeleted(!isDeleted);
      })
      .catch((error) => console.error(error));
  };

  return (
    <Paper
      elevation={0}
      sx={{
        px: 2,
        py: 1.5,
        display: "flex",
        flexDirection: isNonMobile ? "row" : "column",
        alignItems: isNonMobile ? "center" : "flex-start",
        gap: isNonMobile ? 2 : 1.5,
        bgcolor: "white",
        borderRadius: 2,
      }}
    >
      {/* Brand + Name */}
      <Stack
        direction="row"
        spacing={1.5}
        alignItems="center"
        flex={isNonMobile ? "1 1 0" : "unset"}
        width="100%"
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            boxShadow: "rgba(3, 0, 71, 0.09) 0px 1px 3px",
            overflow: "hidden",
            width: 42,
            height: 28,
            borderRadius: "2px",
            flexShrink: 0,
          }}
        >
          {getCardImage(cardDetails?.brand)}
        </Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 500, flexGrow: 1 }}>
          {cardDetails?.account_name}
        </Typography>
      </Stack>

      {/* Card Number */}
      <Typography
        variant="subtitle2"
        flex={isNonMobile ? "1 1 0" : "unset"}
        textAlign={isNonMobile ? "left" : "center"}
        width="100%"
      >
        {`**** **** **** ${cardDetails?.last4}`}
      </Typography>

      {/* Expiry */}
      <Typography
        variant="subtitle2"
        mx={isNonMobile ? 3 : 0}
        textAlign={isNonMobile ? "left" : "center"}
        width="100%"
      >
        {`${cardDetails?.exp_month}/${String(cardDetails?.exp_year).slice(-2)}`}
      </Typography>

      {/* Delete Button */}
      <Stack
        direction="row"
        justifyContent={isNonMobile ? "flex-end" : "center"}
        width="100%"
      >
        <IconButton onClick={deleteCard}>
          <DeleteIcon sx={{ fontSize: "1.8rem" }} />
        </IconButton>
      </Stack>
    </Paper>
  );
};

const Payments = ({ openDrawer }) => {
  const dispatch = useDispatch();
  const { cards } = useSelector((state) => state.auth);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    dispatch(getCards());
  }, [isDeleted, dispatch]);

  return (
    <Stack spacing={2}>
      <Header
        Icon={CreditCardIcon}
        title="Payment Methods"
        openDrawer={openDrawer}
      />
      <Stack spacing={2}>
        {cards?.length ? (
          cards.map((card) => (
            <PaymentCard
              key={card._id}
              {...card}
              isDeleted={isDeleted}
              setIsDeleted={setIsDeleted}
            />
          ))
        ) : (
          <Typography variant="body2" color="text.secondary" textAlign="center">
            No saved cards available.
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};

export default Payments;

import PropTypes from "prop-types";

// If your card component is named PaymentCard, use that instead of Card
PaymentCard.propTypes = {
  _id: PropTypes.string.isRequired,
  cardDetails: PropTypes.shape({
    brand: PropTypes.string,
    account_name: PropTypes.string,
    last4: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    exp_month: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    exp_year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  isDeleted: PropTypes.bool.isRequired,
  setIsDeleted: PropTypes.func.isRequired,
};

// ✅ Payments Component PropTypes
Payments.propTypes = {
  openDrawer: PropTypes.func, // If it's optional, don’t mark as required
};
