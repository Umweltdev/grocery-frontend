import { useEffect } from "react";
import PropTypes from "prop-types";
import { Stack, Grid, Typography, Paper, Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCollectionAddresses } from "../../features/address/addressSlice";
import { setSelectedAddress } from "../../features/order/orderSlice";
import useMediaQuery from "@mui/material/useMediaQuery";

// Single address card
const Address = ({
  fullName,
  address,
  phone,
  state,
  _id,
  type,
  activeId,
  updateStepCompletion,
}) => {
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
      p={2}
      direction="column"
      onClick={handleClick}
      sx={{
        cursor: "pointer",
        border: isSelected ? "2px solid #d23f57" : "1px solid #e0e0e0",
        "&:hover": { borderColor: "#d23f57" },
        textTransform: "capitalize",
        width: { xs: "100%", sm: "100%", md: "400px" },
        transition: "border 0.2s",
      }}
      spacing={0.5}
    >
      <Typography variant="subtitle1">{fullName}</Typography>
      <Typography variant="body2">{address}</Typography>
      <Typography variant="body2">{state}</Typography>
      <Typography variant="body2">{phone}</Typography>
    </Stack>
  );
};

Address.propTypes = {
  fullName: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  type: PropTypes.string,
  activeId: PropTypes.object,
  updateStepCompletion: PropTypes.func.isRequired,
};

export const CollectionAddress = ({ updateStepCompletion }) => {
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { collectionAddresses } = useSelector((state) => state.address);
  const { selectedAddress } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getCollectionAddresses());
  }, [dispatch]);

  return (
    <Paper
      elevation={1}
      sx={{
        backgroundColor: "white",
        p: isNonMobile ? 3 : 2,
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center" mb={1}>
        <Avatar sx={{ bgcolor: "#d23f57" }}>2</Avatar>
        <Typography variant="body2" fontWeight={600}>
          Collection Address
        </Typography>
      </Stack>

      <Typography variant="subtitle2" color="text.secondary" mb={1}>
        Select your collection address
      </Typography>

      <Grid container spacing={3}>
        {collectionAddresses.map((address) => (
          <Grid item xs={12} sm={6} md={4} key={address._id}>
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

CollectionAddress.propTypes = {
  updateStepCompletion: PropTypes.func.isRequired,
};
