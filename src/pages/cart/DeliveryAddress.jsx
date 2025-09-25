import { useState, useEffect } from "react";
import {
  Stack,
  Grid,
  Typography,
  TextField,
  Paper,
  Avatar,
  Autocomplete,
  Button,
  IconButton,
  Box,
  Modal,
  useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { statesInNigeria } from "../user-dashboard/data";
import { Formik } from "formik";
import * as yup from "yup";
import {
  getAddresses,
  createAddress,
  resetState,
  deleteAddress,
  getAddress,
  updateAddress,
} from "../../features/address/addressSlice";
import { setSelectedAddress } from "../../features/order/orderSlice";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import makeToast from "../../utils/toaster";

const Address = (prop) => {
  const {
    fullName,
    address,
    phone,
    state,
    _id,
    activeId,
    type,
    updateStepCompletion,
    handleOpen,
    setEditMode,
    editMode,
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
        <Typography fontSize="13px">{`${state} State`}</Typography>
        <Typography fontSize="13px">{phone}</Typography>
      </Stack>
      <Stack alignSelf="self-start" direction="row">
        <IconButton
          onClick={() => {
            handleOpen();
            setEditMode(!editMode);
            dispatch(getAddress(_id));
          }}
          sx={{
            padding: "3px",
          }}
          aria-label="Edit"
        >
          <EditIcon
            sx={{
              fontSize: "20px",
            }}
          />
        </IconButton>
        <IconButton
          onClick={() => {
            dispatch(deleteAddress(_id));
          }}
          sx={{
            padding: "3px",
          }}
          aria-label="Edit"
        >
          <DeleteIcon
            sx={{
              fontSize: "20px",
              color: "#d23f57",
            }}
          />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export const DeliveryAddress = ({ updateStepCompletion }) => {
  const [editMode, setEditMode] = useState(false);
  const Mobile = useMediaQuery("(min-width:968px)");
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch();
  const {
    addresses,
    isSuccess,
    isError,
    isLoading,
    createdAddress,
    deletedAddress,
    addressData,
    updatedAddress,
  } = useSelector((state) => state.address);
  const { selectedAddress } = useSelector((state) => state.order);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    if (editMode === true) {
      dispatch(resetState());
      setEditMode(!editMode);
    }
  };

  useEffect(() => {
    if ((isSuccess && createdAddress) || (isSuccess && updatedAddress)) {
      // makeToast("success", "Address Added Sucessfully!");
      handleClose();
      dispatch(resetState());
    }
    if (isError) {
      makeToast("error", "Something went wrong");
      dispatch(resetState());
    }
  }, [isSuccess, isError, isLoading]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getAddresses());
    };
    fetchData();
  }, [createdAddress, deletedAddress, editMode]);

  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
  const addressSchema = yup.object().shape({
    fullName: yup.string().required("required"),
    phone: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("required"),
    address: yup.string().required("required"),
    state: yup.string().required("required"),
  });

  const initialValues = {
    fullName: addressData?.fullName || "",
    phone: addressData?.phone || "",
    address: addressData?.address || "",
    state: addressData?.state || "",
  };

  return (
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
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent={{ sm: "space-between" }}
        spacing={{ xs: 1.5, sm: 0 }}
        alignItems={{ xs: "start", sm: "center" }}
      >
        <Stack direction="row" spacing={{ xs: 1, sm: 2 }} alignItems="center">
          <Avatar sx={{ bgcolor: "#d23f57" }}>2</Avatar>
          <Typography variant={"body2"}>Delivery Address</Typography>
        </Stack>
        <Button
          onClick={handleOpen}
          variant="outlined"
          sx={{
            textTransform: "none",
            bgcolor: "white",
            color: "primary.main",
            fontSize: "subtitle2",
            paddingX: isNonMobile ? "20px" : "10px",
            fontWeight: 600,
            paddingY: "6px",
            "&:hover": {
              backgroundColor: "#FCE9EC",
            },
          }}
        >
          Add New Address
        </Button>
      </Stack>
      <Typography variant="subtitle2">Delivery Address</Typography>
      <Grid container spacing={2}>
        {addresses.map((address) => (
          <Grid item xs={12} sm={4}>
            <Address
              {...address}
              activeId={selectedAddress}
              updateStepCompletion={updateStepCompletion}
              handleOpen={handleOpen}
              setEditMode={setEditMode}
              editMode={editMode}
            />
          </Grid>
        ))}
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper
          elevation={1}
          sx={{
            backgroundColor: "white",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: isNonMobile ? 600 : "95%",
            p: 3,
            pb: 6,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            borderRadius: "8px",
          }}
        >
          <Typography variant="h6" mb={2}>
            Add New Address Information
          </Typography>
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={addressSchema}
            onSubmit={(values, { resetForm }) => {
              if (editMode) {
                const data = { id: addressData._id, addressData: values };
                dispatch(updateAddress(data));
              } else {
                dispatch(createAddress(values));
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              isValid,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="20px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                  }}
                >
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label=" Full Name"
                    size="small"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.fullName}
                    name="fullName"
                    error={!!touched.fullName && !!errors.fullName}
                    helperText={touched.fullName && errors.fullName}
                    sx={{
                      gridColumn: "span 2",
                      "& .MuiInputBase-root": {
                        fontSize: "15px",
                      },
                    }}
                    InputLabelProps={{
                      style: { fontSize: "12px" },
                    }}
                  />

                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="Phone Number"
                    size="small"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phone}
                    name="phone"
                    error={!!touched.phone && !!errors.phone}
                    helperText={touched.phone && errors.phone}
                    sx={{
                      gridColumn: "span 2",
                      "& .MuiInputBase-root": {
                        fontSize: "15px",
                      },
                    }}
                    InputLabelProps={{
                      style: { fontSize: "14px" },
                    }}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="Address"
                    size="small"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.address}
                    name="address"
                    error={!!touched.address && !!errors.address}
                    helperText={touched.address && errors.address}
                    sx={{
                      gridColumn: "span 2",
                      "& .MuiInputBase-root": {
                        fontSize: "15px",
                      },
                    }}
                    InputLabelProps={{
                      style: { fontSize: "14px" },
                    }}
                  />
                  <Autocomplete
                    fullWidth
                    options={statesInNigeria}
                    value={values.state}
                    isOptionEqualToValue={(option, value) => option === value}
                    onChange={(event, newValue) => {
                      handleChange({
                        target: {
                          name: "state",
                          value: newValue,
                        },
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        variant="outlined"
                        type="text"
                        label="State"
                        size="small"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="state"
                        error={!!touched.state && !!errors.state}
                        helperText={touched.state && errors.state}
                        InputLabelProps={{
                          style: { fontSize: "14px" },
                        }}
                        sx={{
                          gridColumn: "span 2",
                          "& .MuiInputBase-root": {
                            fontSize: "15px",
                          },
                        }}
                      />
                    )}
                    sx={{
                      gridColumn: "span 2",
                    }}
                  />
                </Box>
                <Button
                  type="submit"
                  disabled={!isValid || isLoading}
                  sx={{
                    textTransform: "none",
                    bgcolor: "primary.main",
                    color: "white",
                    fontSize: "14px",
                    marginTop: "30px",
                    fontWeight: 500,
                    alignSelf: "start",
                    "&:hover": {
                      backgroundColor: "#E3364E",
                    },
                  }}
                >
                  Save
                </Button>
              </form>
            )}
          </Formik>{" "}
        </Paper>
      </Modal>
    </Paper>
  );
};
