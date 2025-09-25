import { useState, useEffect } from "react";
import { Stack, Grid, Typography, Paper, Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getCollectionAddresses,
} from "../../features/address/addressSlice";
import {
  setSelectedAddress
} from "../../features/order/orderSlice";
import useMediaQuery from "@mui/material/useMediaQuery";

const Address = (prop) => {
  const {
    fullName,
    address,
    phone,
    state,
    _id,
    type,
    activeId,
    updateStepCompletion,
  } = prop;
  const dispatch = useDispatch();
  const isSelected = activeId?._id === _id;

  const handleClick = () => {
    dispatch(
      setSelectedAddress({ fullName, address, phone, state, _id, type })
    );
    updateStepCompletion("Checkout");
  };
  return (
    <Stack
      bgcolor="#f6f9fc"
      borderRadius="8px"
      p={1}
      direction="row"
      justifyContent="space-between"
      onClick={handleClick}
      sx={{
        cursor: "pointer",
        border: isSelected ? "1px solid #d23f57" : "none",
        textTransform: "capitalize",
      }}
    >
      <Stack>
        <Typography variant="subtitle1">{fullName}</Typography>
        <Typography fontSize="13px">{address}</Typography>
        <Typography fontSize="13px">{state}</Typography>
        <Typography fontSize="13px">{phone}</Typography>
      </Stack>
    </Stack>
  );
};

export const CollectionAddress = ({ updateStepCompletion }) => {
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { collectionAddresses} = useSelector(
    (state) => state.address
  );
  const { selectedAddress } = useSelector((state) => state.order);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getCollectionAddresses());
    };
    fetchData();
  }, []);
  return (
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
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar sx={{ bgcolor: "#d23f57" }}>2</Avatar>
        <Typography variant="body2">Collection Address</Typography>
      </Stack>

      <Typography variant="subtitle2">Collection Address</Typography>
      <Grid container spacing={2}>
        {collectionAddresses.map((address) => (
          <Grid item xs={12} sm={4}>
            <Address
              {...address}
              activeId={selectedAddress}
              updateStepCompletion={updateStepCompletion}
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};
