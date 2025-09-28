import { useEffect } from "react";
import PropTypes from "prop-types";
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
import PlaceIcon from "@mui/icons-material/Place";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAddress,
  getAddresses,
} from "../../features/address/addressSlice";
import Header from "./Header";

const Address = ({ _id, fullName, address, phone, state }) => {
  const dispatch = useDispatch();

  return (
    <Card
      elevation={0}
      sx={{
        borderColor: "divider",
        borderRadius: 3,
        bgcolor: "#fff",
        boxShadow: "0 4px 12px 0 rgb(0 0 0 / 0.1)",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          borderColor: "primary.300",
          transform: "translateY(-2px)",
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)",
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Box>
              <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                <PersonIcon sx={{ fontSize: 20, color: "primary.main" }} />
                <Typography
                  variant="h6"
                  fontWeight={600}
                  sx={{ textTransform: "capitalize" }}
                >
                  {fullName}
                </Typography>
              </Stack>
              <Chip
                label="Home"
                size="small"
                sx={{
                  bgcolor: "primary.50",
                  color: "primary.main",
                  fontWeight: 500,
                }}
              />
            </Box>

            <Stack direction="row" spacing={0.5}>
              <Link
                to={`/user/addresses/${_id}`}
                style={{ textDecoration: "none" }}
              >
                <IconButton
                  size="small"
                  sx={{
                    bgcolor: "primary.50",
                    color: "primary.main",
                    "&:hover": { bgcolor: "primary.100" },
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Link>

              <IconButton
                size="small"
                onClick={() => dispatch(deleteAddress(_id))}
                sx={{
                  bgcolor: "error.50",
                  color: "error.main",
                  "&:hover": { bgcolor: "error.100" },
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>

          <Divider />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <PhoneIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                <Typography variant="body2" color="text.secondary">
                  Phone
                </Typography>
              </Stack>
              <Typography variant="body1" fontWeight={500} ml={3}>
                {phone}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Stack direction="row" alignItems="flex-start" spacing={1}>
                <LocationOnIcon
                  sx={{ fontSize: 18, color: "text.secondary", mt: 0.2 }}
                />
                <Box>
                  <Typography variant="body2" color="text.secondary" mb={0.5}>
                    Address
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ textTransform: "capitalize" }}
                  >
                    {address}, {state} State
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
};

Address.propTypes = {
  _id: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
};

const Addresses = ({ openDrawer }) => {
  const dispatch = useDispatch();
  const { addresses, deletedAddress } = useSelector((state) => state.address);

  useEffect(() => {
    dispatch(getAddresses());
  }, [deletedAddress, dispatch]);

  return (
    <Stack spacing={4}>
      <Header
        Icon={PlaceIcon}
        title="My Addresses"
        openDrawer={openDrawer}
        button="Add New Address"
        link="/user/addresses/new"
      />

      {addresses.length === 0 ? (
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
            <PlaceIcon
              sx={{
                fontSize: 64,
                color: "text.disabled",
                mb: 2,
              }}
            />
            <Typography variant="h6" color="text.secondary" mb={1}>
              No Addresses Found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Add your first address to get started
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <>
          <Typography variant="body2" color="text.secondary">
            {addresses.length} saved address{addresses.length !== 1 ? "es" : ""}
          </Typography>

          <Grid container spacing={3}>
            {addresses.map((address, index) => (
              <Grid item xs={12} md={6} key={address._id || index}>
                <Address {...address} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Stack>
  );
};

Addresses.propTypes = {
  openDrawer: PropTypes.func.isRequired,
};

export default Addresses;
