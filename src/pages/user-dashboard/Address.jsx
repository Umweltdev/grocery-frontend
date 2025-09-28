import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Autocomplete,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { statesInNigeria } from "./data";
import PlaceIcon from "@mui/icons-material/Place";
import { useDispatch, useSelector } from "react-redux";
import {
  createAddress,
  resetState,
  getAddress,
  updateAddress,
} from "../../features/address/addressSlice";
import makeToast from "../../utils/toaster";
import Header from "./Header";
import PropTypes from "prop-types";

const Address = ({ openDrawer }) => {
  const { id } = useParams();
  const isNonMobile = useMediaQuery("(min-width:968px)");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    isSuccess,
    isError,
    isLoading,
    createdAddress,
    updatedAddress,
    addressData,
  } = useSelector((state) => state.address);

  useEffect(() => {
    if (id !== "new") {
      dispatch(getAddress(id));
    } else {
      dispatch(resetState());
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (isSuccess && (createdAddress || updatedAddress)) {
      dispatch(resetState());
      navigate("/user/addresses");
    }
    if (isError) {
      makeToast("error", "Something went wrong");
    }
  }, [isSuccess, createdAddress, updatedAddress, isError, dispatch, navigate]);

  const initialValues = {
    fullName: addressData?.fullName || "",
    phone: addressData?.phone || "",
    address: addressData?.address || "",
    state: addressData?.state || "",
  };

  return (
    <Stack spacing={2}>
      <Header
        Icon={PlaceIcon}
        title={id === "new" ? "Add Address" : "Edit Address"}
        openDrawer={openDrawer}
        button="Back To Address"
        link="/user/addresses"
      />

      <Paper
        elevation={0}
        sx={{
          bgcolor: "white",
          px: isNonMobile ? 5 : 2,
          py: 4,
        }}
      >
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={addressSchema}
          onSubmit={(values) => {
            if (id !== "new") {
              dispatch(updateAddress({ id, addressData: values }));
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
            dirty,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                {/* Full Name */}
                <TextField
                  fullWidth
                  label="Enter Fullname"
                  size="small"
                  name="fullName"
                  value={values.fullName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.fullName && Boolean(errors.fullName)}
                  helperText={touched.fullName && errors.fullName}
                  sx={{
                    gridColumn: "span 2",
                    "& .MuiInputBase-root": { fontSize: "15px" },
                  }}
                  InputLabelProps={{ style: { fontSize: "14px" } }}
                />

                {/* Phone */}
                <TextField
                  fullWidth
                  label="Enter Phone-Number"
                  size="small"
                  name="phone"
                  value={values.phone}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.phone && Boolean(errors.phone)}
                  helperText={touched.phone && errors.phone}
                  sx={{
                    gridColumn: "span 2",
                    "& .MuiInputBase-root": { fontSize: "15px" },
                  }}
                  InputLabelProps={{ style: { fontSize: "14px" } }}
                />

                {/* Address */}
                <TextField
                  fullWidth
                  label="Address"
                  size="small"
                  name="address"
                  value={values.address}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.address && Boolean(errors.address)}
                  helperText={touched.address && errors.address}
                  sx={{
                    gridColumn: "span 2",
                    "& .MuiInputBase-root": { fontSize: "15px" },
                  }}
                  InputLabelProps={{ style: { fontSize: "14px" } }}
                />

                {/* State */}
                <Autocomplete
                  fullWidth
                  options={statesInNigeria}
                  value={values.state || ""}
                  isOptionEqualToValue={(option, value) => option === value}
                  onChange={(event, newValue) =>
                    handleChange({ target: { name: "state", value: newValue } })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="State"
                      size="small"
                      name="state"
                      error={touched.state && Boolean(errors.state)}
                      helperText={touched.state && errors.state}
                      InputLabelProps={{ style: { fontSize: "14px" } }}
                      sx={{
                        gridColumn: "span 2",
                        "& .MuiInputBase-root": { fontSize: "15px" },
                      }}
                    />
                  )}
                  sx={{ gridColumn: "span 2" }}
                />
              </Box>

              <Button
                type="submit"
                disabled={!isValid || (!dirty && id === "new") || isLoading}
                sx={{
                  mt: 4,
                  textTransform: "none",
                  bgcolor:
                    !isValid || isLoading || (!dirty && id === "new")
                      ? "#0000001f !important"
                      : "primary.main",
                  color: isLoading ? "#00000042 !important" : "white",
                  fontSize: "14px",
                  px: "20px",
                  py: "8px",
                  fontWeight: 500,
                  alignSelf: "start",
                  "&:hover": { backgroundColor: "#E3364E" },
                }}
              >
                {id === "new" ? "Save Address" : "Save Changes"}
              </Button>
            </form>
          )}
        </Formik>
      </Paper>
    </Stack>
  );
};

Address.propTypes = {
  openDrawer: PropTypes.func,
};

export default Address;

// Validation schema
const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const addressSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone number is required"),
  address: yup.string().required("Address is required"),
  state: yup.string().required("State is required"),
});
