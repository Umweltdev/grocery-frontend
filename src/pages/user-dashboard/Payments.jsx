import { useEffect, useState } from "react";
import {
  Typography,
  Stack,
  Card,
  CardContent,
  IconButton,
  Box,
  Chip,
  Divider,
  Grid,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DeleteIcon from "@mui/icons-material/Delete";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import PropTypes from "prop-types";
import { base_url } from "../../utils/baseUrl";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getCards } from "../../features/auth/authSlice";
import Header from "./Header";


export const getCardImage = (brand) => {
  const cardLogos = {
    visa: "https://bazaar.ui-lib.com/assets/images/payment-methods/Visa.svg",
    master:
      "https://bazaar.ui-lib.com/assets/images/payment-methods/Mastercard.svg",
    verve: "https://bazaar.ui-lib.com/assets/images/payment-methods/Visa.svg",
  };

  const logo = cardLogos[brand?.toLowerCase()];
  if (!logo) return null;

  return (
    <img
      src={logo}
      alt={`${brand} logo`}
      width="100%"
      height="100%"
      style={{ objectFit: "contain" }}
    />
  );
};

const PaymentCard = ({ _id, cardDetails, isDeleted, setIsDeleted }) => {
  const { user } = useSelector((state) => state.auth);

  const deleteCard = async () => {
    try {
      await axios.delete(`${base_url}card/${_id}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setIsDeleted(!isDeleted);
    } catch (error) {
      console.error("Failed to delete card", error);
    }
  };

  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        transition: "all 0.3s ease",
        "&:hover": {
          borderColor: "primary.300",
          transform: "translateY(-2px)",
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack spacing={2}>
          {/* Card Top */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Box>
              <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    boxShadow: "rgba(3, 0, 71, 0.09) 0px 1px 3px",
                    overflow: "hidden",
                    width: "42px",
                    height: "28px",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {getCardImage(cardDetails?.brand)}
                </Box>
                <Typography variant="h6" fontWeight={600}>
                  **** **** **** {cardDetails?.last4}
                </Typography>
              </Stack>
              <Chip
                label={cardDetails?.brand?.toUpperCase() || "UNKNOWN"}
                size="small"
                sx={{
                  bgcolor: "primary.50",
                  color: "primary.main",
                  fontWeight: 500,
                }}
              />
            </Box>

            <IconButton
              size="small"
              onClick={deleteCard}
              sx={{
                bgcolor: "error.50",
                color: "error.main",
                "&:hover": { bgcolor: "error.100" },
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Stack>

          <Divider />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <PersonIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                <Typography variant="body2" color="text.secondary">
                  Cardholder
                </Typography>
              </Stack>
              <Typography variant="body1" fontWeight={500} ml={3}>
                {cardDetails?.account_name || "N/A"}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <CalendarTodayIcon
                  sx={{ fontSize: 18, color: "text.secondary" }}
                />
                <Typography variant="body2" color="text.secondary">
                  Expires
                </Typography>
              </Stack>
              <Typography variant="body1" fontWeight={500} ml={3}>
                {cardDetails?.exp_month || "MM"}/
                {cardDetails?.exp_year
                  ? cardDetails.exp_year.toString().slice(-2)
                  : "YY"}
              </Typography>
            </Grid>
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
};

PaymentCard.propTypes = {
  _id: PropTypes.string.isRequired,
  cardDetails: PropTypes.shape({
    brand: PropTypes.string,
    last4: PropTypes.string,
    account_name: PropTypes.string,
    exp_month: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    exp_year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  isDeleted: PropTypes.bool.isRequired,
  setIsDeleted: PropTypes.func.isRequired,
};

const Payments = ({ openDrawer }) => {
  const dispatch = useDispatch();
  const { cards = [] } = useSelector((state) => state.auth);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    dispatch(getCards());
  }, [isDeleted, dispatch]);

  return (
    <Stack spacing={4}>
      <Header
        Icon={CreditCardIcon}
        title="Payment Methods"
        openDrawer={openDrawer}
      />

      {cards.length === 0 ? (
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
            <CreditCardIcon
              sx={{
                fontSize: 64,
                color: "text.disabled",
                mb: 2,
              }}
            />
            <Typography variant="h6" color="text.secondary" mb={1}>
              No Payment Methods Found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Add a payment method to get started
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <>
          <Typography variant="body2" color="text.secondary">
            {cards.length} saved payment method{cards.length !== 1 ? "s" : ""}
          </Typography>

          <Grid container spacing={3}>
            {cards.map((card) => (
              <Grid item xs={12} md={6} key={card._id}>
                <PaymentCard
                  _id={card._id}
                  cardDetails={card}
                  isDeleted={isDeleted}
                  setIsDeleted={setIsDeleted}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Stack>
  );
};

Payments.propTypes = {
  openDrawer: PropTypes.func.isRequired,
};

export default Payments;
