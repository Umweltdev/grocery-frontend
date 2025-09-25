import { useEffect } from "react";
import {
  Stack,
  Typography,
  Paper,
  Avatar,
  FormGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import { DeliveryAddress } from "./DeliveryAddress";
import { CollectionAddress } from "./CollectionAddress";
import useMediaQuery from "@mui/material/useMediaQuery";
import { setDeliveryOption } from "../../features/order/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

const DeliveryCollection = ({ updateStepCompletion }) => {
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { deliveryOption } = useSelector((state) => state.order);
  const { cartTotal } = useSelector((state) => state.cart);

  const isDeliveryAllowed = cartTotal >= 150;

  useEffect(() => {
    if (!isDeliveryAllowed && deliveryOption === "delivery") {
      dispatch(setDeliveryOption("collection"));
    } else if (!deliveryOption) {
      dispatch(
        setDeliveryOption(isDeliveryAllowed ? "delivery" : "collection")
      );
    }
  }, [cartTotal, deliveryOption, isDeliveryAllowed, dispatch]);

  const handleSelectedOption = (event) => {
    const selectedOption = event.target.value;
    dispatch(setDeliveryOption(selectedOption));
  };

  const addressOptions = [
    { label: "Delivery", value: "delivery" },
    { label: "Collection", value: "collection" },
  ];

  return (
    <Stack spacing={3}>
      <Paper
        elevation={1}
        sx={{
          backgroundColor: "white",
          p: isNonMobile ? 3 : 1.5,
          pb: 6,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRadius: "8px",
        }}
      >
        <Stack direction="row" spacing={{ xs: 1, sm: 2 }} alignItems="center">
          <Avatar sx={{ bgcolor: "#d23f57" }}>1</Avatar>
          <Typography variant="body2">Delivery/Collection</Typography>
        </Stack>

        <FormGroup>
          {addressOptions.map((a, index) => (
            <FormControlLabel
              key={index}
              control={
                <Radio
                  value={a.value}
                  checked={deliveryOption === a.value}
                  onChange={handleSelectedOption}
                  disabled={a.value === "delivery" && !isDeliveryAllowed}
                />
              }
              label={a.label}
            />
          ))}
        </FormGroup>
      </Paper>

      {deliveryOption === "delivery" && (
        <DeliveryAddress updateStepCompletion={updateStepCompletion} />
      )}
      {deliveryOption === "collection" && (
        <CollectionAddress updateStepCompletion={updateStepCompletion} />
      )}
    </Stack>
  );
};

DeliveryCollection.propTypes = {
  updateStepCompletion: PropTypes.func,
};

export default DeliveryCollection;
