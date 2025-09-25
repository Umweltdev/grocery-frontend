import { useState, useEffect } from "react";
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

const DeliveryCollection = ({ updateStepCompletion }) => {
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { deliveryOption } = useSelector(
    (state) => state.order
  );
  const handleSelectedOption = (event) => {
    event.stopPropagation();
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
          p: isNonMobile? 3: 1.5,
          pb: 6,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRadius: "8px",
        }}
      >
        <Stack direction="row" spacing={{xs:1,sm:2}} alignItems="center">
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

      {/* {selectedAddress && <BillingAddressForm />} */}
    </Stack>
  );
};

export default DeliveryCollection;
