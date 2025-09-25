import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Stack,
  Grid,
  Typography,
  TextField,
  Paper,
  Avatar,
  MenuItem,
  Button,
  IconButton,
  Box,
  Modal,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  getBillingAddresses,
  createAddress,
  resetState,
} from "../../features/address/addressSlice";
import { setBillingAddress } from "../../features/order/orderSlice";
import useMediaQuery from "@mui/material/useMediaQuery";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import makeToast from "../../utils/toaster";

const Address = (prop) => {
  const { billingAddress } = useSelector((state) => state.order);
  const { fullName, address, postal, country, state, _id } = prop;
  const dispatch = useDispatch();
  const isSelected = billingAddress?._id === _id;
  const handleClick = () => {
    dispatch(setBillingAddress({ ...prop }));
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
        <Typography fontSize="13px">{country}</Typography>
        <Typography fontSize="13px">{postal}</Typography>
      </Stack>
      <Stack alignSelf="self-start" direction="row">
        {/* <IconButton
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
        </IconButton> */}
        <IconButton
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

const BillingAddressForm = () => {
  const dispatch = useDispatch();
  const { billingAddresses, isSuccess, isError, isLoading, createdAddress } =
    useSelector((state) => state.address);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    if (isSuccess && createdAddress) {
      makeToast("success", "Address Added Sucessfully!");
      handleClose();
    }
    if (isError) {
      makeToast("error", "Something went wrong");
      dispatch(resetState());
    }
  }, [isSuccess, isError, isLoading]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch(getBillingAddresses());
    };
    fetchData();
  }, [isSuccess, createdAddress]);

  const initialValues = {
    fullName: "",
    phone: "",
    address: "",
    country: "",
    email: "",
    postal: "",
  };
  return (
    <Paper
      elevation={1}
      sx={{
        backgroundColor: "white",
        p: 3,
        pb: 6,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRadius: "8px",
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar sx={{ bgcolor: "#d23f57" }}>3</Avatar>
          <Typography variant="body2">Billing Address</Typography>
        </Stack>
        <Button
          variant="outlined"
          onClick={handleOpen}
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
          Add New Address
        </Button>
      </Stack>
      <Typography variant="subtitle2">Billing Address</Typography>

      <Grid container spacing={2}>
        {billingAddresses.map((address) => (
          <Grid item sm={4}>
            <Address {...address} />
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
            width: 650,
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
            initialValues={initialValues}
            validationSchema={addressSchema}
            onSubmit={(values, { resetForm }) => {
              dispatch(createAddress({ ...values, type: "billing" }));
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
                    type="email"
                    label="Email Address"
                    size="small"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
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

                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="State"
                    size="small"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.state}
                    name="state"
                    error={!!touched.state && !!errors.state}
                    helperText={touched.state && errors.state}
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
                    label="Country"
                    size="small"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.country}
                    name="country"
                    error={!!touched.country && !!errors.country}
                    helperText={touched.country && errors.country}
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
                    label="Postal Code"
                    size="small"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.postal}
                    name="postal"
                    error={!!touched.postal && !!errors.postal}
                    helperText={touched.postal && errors.postal}
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

export default BillingAddressForm;

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const addressSchema = yup.object().shape({
  fullName: yup.string().required("required"),
  email: yup.string().email("Enter Valid Email Address"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address: yup.string().required("required"),
  state: yup.string().required("required"),
  postal: yup.string().required("required"),
  country: yup.string().required("required"),
});
