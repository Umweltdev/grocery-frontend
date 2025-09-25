import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  Autocomplete,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { statesInNigeria } from "./data";
// import Header from "../../components/Header";
import { Link, useNavigate } from "react-router-dom";
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

const Address = ({ openDrawer }) => {
  const { id } = useParams();
  const isNonMobile = useMediaQuery("(min-width:968px)");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addressState = useSelector((state) => state.address);
  const {
    isSuccess,
    isError,
    isLoading,
    createdAddress,
    updatedAddress,
    addressData,
  } = addressState;
  useEffect(() => {
    if (id !== "new") {
      dispatch(getAddress(id));
    } else {
      dispatch(resetState());
    }
  }, [id]);
  useEffect(() => {
    if (isSuccess && createdAddress) {
      dispatch(resetState());
      navigate("/user/addresses");
    }
    if (isSuccess && updatedAddress) {
      dispatch(resetState());
      navigate("/user/addresses");
    }
    if (isError) {
      makeToast("error", "Something went wrong");
      // dispatch(resetState())
    }
  }, [isSuccess, createdAddress, isError, updatedAddress]);
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
        link={`/user/addresses`}
      />

      <Paper
        elevation={0}
        sx={{
          bgcolor: "white",
          paddingX: isNonMobile ? 5 : 2,
          paddingY: 4,
        }}
      >
        <Formik
          enableReinitialize={true}
          onSubmit={(values) => {
            if (id !== "new") {
              const data = { id: id, addressData: values };
              dispatch(updateAddress(data));
            } else {
              dispatch(createAddress(values));
            }
          }}
          initialValues={initialValues}
          validationSchema={addressSchema}
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
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="Enter Fullname"
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
                    style: { fontSize: "14px" },
                  }}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="Enter Phone-Number"
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
                  paddingX: "20px",
                  fontWeight: 500,
                  paddingY: "8px",
                  alignSelf: "start",
                  "&:hover": {
                    backgroundColor: "#E3364E",
                  },
                }}
              >
                {/* {isLoading && !addressData  ? "Saving..." : id === "new" ? "Save Address" : "Save Changes"} */}

                {id === "new" ? "Save Address" : "Save Changes"}
              </Button>
            </form>
          )}
        </Formik>{" "}
      </Paper>
    </Stack>
  );
};

export default Address;

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
