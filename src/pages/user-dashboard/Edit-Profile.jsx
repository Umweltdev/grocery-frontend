import { useEffect, useState } from "react";
import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Avatar,
  IconButton,
  Card,
  CardContent,
  Grid,
  Divider,
  Badge,
} from "@mui/material";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { Formik } from "formik";
import * as yup from "yup";
import PersonIcon from "@mui/icons-material/Person";
import SaveIcon from "@mui/icons-material/Save";
import { useDispatch, useSelector } from "react-redux";
import DashboardHeader from "./Header";
import {
  updateProfile,
  resetState,
  resetUpdatedFlag,
} from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import makeToast from "../../utils/toaster";
const EditProfile = ({ openDrawer }) => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureFile, setProfilePictureFile] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);
  const { isSuccess, isError, user, isLoading, userUpdated } = auth;
  
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setProfilePictureFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  useEffect(() => {
    if (isSuccess && userUpdated) {
      makeToast("success", "Profile updated successfully!");
      navigate("/user/profile");
      dispatch(resetUpdatedFlag());
    }
    if (isError) {
      makeToast("error", "Something went wrong, Please Try Again");
      dispatch(resetState());
    }
  }, [isSuccess, userUpdated, isError, navigate, dispatch]);
  
  const initialValues = {
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    dob: user?.dob || null,
  };

  return (
    <Stack spacing={4}>
      <DashboardHeader
        Icon={PersonIcon}
        title="Edit Profile"
        openDrawer={openDrawer}
        button="Back to Profile"
        link="/user/profile"
      />

      <Card
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Formik
            enableReinitialize={true}
            onSubmit={(values) => {
              dispatch(updateProfile({ ...values, image: profilePictureFile }));
            }}
            initialValues={initialValues}
            validationSchema={editSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              setFieldValue,
              isValid,
              dirty,
            }) => (
              <form onSubmit={handleSubmit}>
                {/* Profile Picture Section */}
                <Box textAlign="center" mb={4}>
                  <Typography variant="h6" fontWeight={600} mb={3}>
                    Profile Picture
                  </Typography>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    badgeContent={
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: "none" }}
                        id="profilePictureInput"
                      />
                    }
                  >
                    <Avatar
                      src={profilePicture || user?.image}
                      sx={{
                        width: 120,
                        height: 120,
                        border: "4px solid",
                        borderColor: "primary.100",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <PersonIcon sx={{ fontSize: 60 }} />
                    </Avatar>
                    <label htmlFor="profilePictureInput">
                      <IconButton
                        component="span"
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          right: 0,
                          bgcolor: "primary.main",
                          color: "white",
                          "&:hover": {
                            bgcolor: "primary.dark",
                            transform: "scale(1.1)",
                          },
                          transition: "all 0.2s ease",
                        }}
                      >
                        <CameraEnhanceIcon />
                      </IconButton>
                    </label>
                  </Badge>
                  <Typography variant="body2" color="text.secondary" mt={2}>
                    Click the camera icon to change your profile picture
                  </Typography>
                </Box>

                <Divider sx={{ mb: 4 }} />

                {/* Form Fields */}
                <Typography variant="h6" fontWeight={600} mb={3}>
                  Personal Information
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Full Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.fullName}
                      name="fullName"
                      error={!!touched.fullName && !!errors.fullName}
                      helperText={touched.fullName && errors.fullName}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="email"
                      label="Email Address"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      name="email"
                      error={!!touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Phone Number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.phone}
                      name="phone"
                      error={!!touched.phone && !!errors.phone}
                      helperText={touched.phone && errors.phone}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      label="Date of Birth"
                      value={values.dob ? dayjs(values.dob) : null}
                      onChange={(date) => {
                        setFieldValue("dob", date ? date.toISOString() : null);
                      }}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          variant: "outlined",
                          helperText: touched.dob && errors.dob,
                          error: !!touched.dob && !!errors.dob,
                          name: "dob",
                          onBlur: handleBlur,
                          sx: {
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                            },
                          },
                        },
                      }}
                    />
                  </Grid>
                </Grid>

                {/* Action Buttons */}
                <Stack direction="row" spacing={2} justifyContent="flex-end" mt={4}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate("/user/profile")}
                    sx={{
                      textTransform: "none",
                      fontWeight: 600,
                      borderRadius: 2,
                      px: 3,
                      py: 1.5,
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={!isValid || isLoading || !dirty}
                    startIcon={isLoading ? null : <SaveIcon />}
                    sx={{
                      textTransform: "none",
                      fontWeight: 600,
                      borderRadius: 2,
                      px: 3,
                      py: 1.5,
                      boxShadow: "none",
                      "&:hover": {
                        boxShadow: "0 4px 12px 0 rgb(0 0 0 / 0.15)",
                      },
                    }}
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </Stack>
              </form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Stack>
  );
};
const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const editSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  phone: yup.string().matches(phoneRegExp, "Invalid phone number").required("Phone number is required"),
  dob: yup.date().nullable(),
});
export default EditProfile;
