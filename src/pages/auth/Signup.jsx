import { useState, useEffect, useRef } from "react";
import {
  Typography,
  Box,
  Stack,
  Button,
  IconButton,
  Paper,
  TextField,
  styled,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import {
  signup,
  resetState,
  resetLoggedInFlag,
} from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import makeToast from "../../utils/toaster";

const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    fontSize: "14px",
    height: "45px",
  },
  "& .MuiInputLabel-root": {
    fontSize: "14px",
  },
});

const Signup = () => {
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePassword = () => setShowPassword(!showPassword);
  const handleToggleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const auth = useSelector((state) => state.auth);
  const { isSuccess, message, isError, isLoading, user, loggedFlag } = auth;
  const navigate = useNavigate();
  const resetFormRef = useRef();

  useEffect(() => {
    if (isSuccess && user && loggedFlag) {
      makeToast("success", "Signup Successful!");
      dispatch(resetLoggedInFlag());
      navigate("/");
    }
    if (isError) {
      makeToast("error", message);
      dispatch(resetState());
    }
  }, [isSuccess, isError, user, loggedFlag, dispatch, navigate, message]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "#F6F9FC",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          bgcolor: "white",
          borderRadius: "10px",
          width: isNonMobile ? "500px" : "95%",
          padding: isNonMobile ? "2.5rem 3rem" : "2rem",
          boxShadow: "rgba(3, 0, 71, 0.09) 0px 8px 45px",
        }}
      >
        <Formik
          onSubmit={(values, { resetForm }) => {
            dispatch(signup(values));
            resetFormRef.current = resetForm;
          }}
          initialValues={initialValues}
          validationSchema={userSchema}
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
              <Link to={"/"} style={{ textDecoration: "none" }}>
                <img
                  src="https://bazaar.ui-lib.com/assets/images/bazaar-black-sm.svg"
                  alt="bazaar logo"
                  style={{
                    margin: "0 auto",
                    display: "block",
                    width: "120px",
                  }}
                />
              </Link>

              <Typography variant="body2" mt={1} mb={4} textAlign="center">
                Create Your Account
              </Typography>
              <Box mb={2}>
                <Typography fontSize="12px" color="#4b566b" mb={1.5}>
                  Full Name
                </Typography>
                <CustomTextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  placeholder="Alakija Vincent"
                  size="small"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.fullName}
                  name="fullName"
                  error={!!touched.fullName && !!errors.fullName}
                  helperText={touched.fullName && errors.fullName}
                />
              </Box>
              <Box mb={2}>
                <Typography fontSize="12px" color="#4b566b" mb={1.5}>
                  Email
                </Typography>
                <CustomTextField
                  fullWidth
                  variant="outlined"
                  type="email"
                  placeholder="maria@romax.com"
                  size="small"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                />
              </Box>
              <Box mb={2}>
                <Typography fontSize="12px" color="#4b566b" mb={1.5}>
                  Phone Number
                </Typography>
                <CustomTextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  placeholder="09080000000"
                  size="small"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phone}
                  name="phone"
                  error={!!touched.phone && !!errors.phone}
                  helperText={touched.phone && errors.phone}
                />
              </Box>
              <Box mb={2}>
                <Typography fontSize="12px" color="#4b566b" mb={1.5}>
                  Password
                </Typography>
                <CustomTextField
                  fullWidth
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  placeholder="*********"
                  size="small"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={handleTogglePassword}
                        edge="end"
                        sx={{ padding: 0, marginRight: "10px" }}
                      >
                        {showPassword ? (
                          <Visibility sx={{ fontSize: "20px" }} />
                        ) : (
                          <VisibilityOff
                            sx={{ fontSize: "20px", color: "#DAE1E7" }}
                          />
                        )}
                      </IconButton>
                    ),
                  }}
                />
              </Box>
              <Box mb={2}>
                <Typography fontSize="12px" color="#4b566b" mb={1.5}>
                  Confirm Password
                </Typography>
                <CustomTextField
                  fullWidth
                  variant="outlined"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="*********"
                  size="small"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.confirmPassword}
                  name="confirmPassword"
                  error={!!touched.confirmPassword && !!errors.confirmPassword}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={handleToggleConfirmPassword}
                        edge="end"
                        sx={{ padding: 0, marginRight: "10px" }}
                      >
                        {showConfirmPassword ? (
                          <Visibility sx={{ fontSize: "20px" }} />
                        ) : (
                          <VisibilityOff
                            sx={{ fontSize: "20px", color: "#DAE1E7" }}
                          />
                        )}
                      </IconButton>
                    ),
                  }}
                />
              </Box>
              <Button
                type="submit"
                disabled={!isValid || !dirty}
                sx={{
                  textTransform: "none",
                  bgcolor:
                    !isValid || isLoading || !dirty
                      ? "#0000001f !important"
                      : "primary.main",
                  color: isLoading ? "#00000042 !important" : "white",
                  fontSize: "14px",
                  paddingY: "10px",
                  fontWeight: 600,
                  width: "100%",
                  mt: 5,
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#E3364E",
                  },
                }}
              >
                {isLoading ? "Loading..." : "Create Account"}
              </Button>
            </form>
          )}
        </Formik>
        <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
          <Typography>Already have an account?</Typography>
          <Link to={"/login"} style={{ textDecoration: "none" }}>
            <Typography
              fontWeight={600}
              color="primary.main"
              sx={{
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:hover": {
                  color: "primary.dark",
                  borderBottom: "2px solid",
                  borderColor: "primary.dark",
                },
              }}
            >
              Login
            </Typography>
          </Link>
        </Stack>
      </Paper>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const userSchema = yup.object().shape({
  fullName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  password: yup
    .string()
    .required("required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password must contain at least 8 characters, including letters and numbers"
    ),
  confirmPassword: yup
    .string()
    .required("required")
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.password === value;
    }),
});

const initialValues = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

export default Signup;
