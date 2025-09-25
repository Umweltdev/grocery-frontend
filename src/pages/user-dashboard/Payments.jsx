import { useEffect, useState } from "react";
import {
  Typography,
  Stack,
  Button,
  Paper,
  IconButton,
  Box,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DeleteIcon from "@mui/icons-material/Delete";
import { base_url } from "../../utils/baseUrl";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getCards } from "../../features/auth/authSlice";
import Header from "./Header";
import useMediaQuery from "@mui/material/useMediaQuery";


export const getCardImage = (card) => {
  switch (card) {
    case "visa":
      return (
        <img
          src="https://bazaar.ui-lib.com/assets/images/payment-methods/Visa.svg"
          width="100%"
        />
      );
    case "master":
      return (
        <img
          src="https://bazaar.ui-lib.com/assets/images/payment-methods/Mastercard.svg"
          width="100%"
        />
      );
    case "verve":
      return (
        <img
          src="https://bazaar.ui-lib.com/assets/images/payment-methods/Visa.svg"
          width="100%"
        />
      );
    default:
      return true;
  }
};

const Card = ({ _id, cardDetails, isDeleted, setIsDeleted }) => {
  const auth = useSelector((state) => state.auth);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const { user } = auth;
  const deleteCard = () => {
    axios
      .delete(`${base_url}card/${_id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((response) => {
        setIsDeleted(!isDeleted);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Paper
      elevation={0}
      
      sx={{
        paddingX: 2,
        paddingY: 1,
        display: "flex",
        bgcolor: "white",
        borderRadius: "10px",
        alignItems: "center",
        flexDirection: isNonMobile? "row" : "column",
        columnGap: 1.5,
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="center" flex="1 1 0">
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
          {getCardImage(cardDetails?.brand)}
        </Box>
        <Typography variant="subtitle1">{cardDetails?.account_name}</Typography>
      </Stack>

      <Typography variant="subtitle2" flex="1 1 0" textAlign={{xs:"center", sm:"left"}}>
        {`**** **** **** ${cardDetails?.last4}`}
      </Typography>
      <Typography variant="subtitle2" mx={{xs:2,sm:3}}>
        {`${cardDetails?.exp_month}/${cardDetails?.exp_year.substr(2)}`}
      </Typography>

      <Stack direction="row" justifyContent="end">
        <IconButton onClick={deleteCard}>
          <DeleteIcon
            sx={{
              fontSize: "1.8rem",
            }}
          />
        </IconButton>
      </Stack>
    </Paper>
  );
};

const Payments = ({openDrawer}) => {
  const dispatch = useDispatch();
  const { cards } = useSelector((state) => state.auth);
  const [isDeleted, setIsDeleted] = useState(false);
  useEffect(() => {
    const getUserCards = async () => {
      dispatch(getCards());
    };
    getUserCards();
  }, [isDeleted]);
  return (
    <Stack spacing={2}>
      
      <Header
        Icon={CreditCardIcon}
        title="Payment Methods"
        openDrawer={openDrawer}
        
      />
      <Stack spacing={2} >
        {cards.map((card, index) => ( 
          <Card
            {...card}
            isDeleted={isDeleted}
            setIsDeleted={setIsDeleted}
            key={index}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default Payments;
