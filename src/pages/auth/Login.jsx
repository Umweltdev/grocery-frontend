import { useEffect } from "react";
import {
  Typography,
  Box,
  Stack,
  Button,
  Paper,
  TextField,
  InputAdornment,
  CircularProgress,
  styled,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import {
  login,
  resetState,
  resetLoggedInFlag,
} from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import makeToast, { makeErrorAlert } from "../../utils/toaster";
import useMediaQuery from "@mui/material/useMediaQuery";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const CustomTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    fontSize: "14px",
    "& fieldset": {
      borderRadius: "10px",
    },
    "&:hover fieldset": {
      borderColor: "#1976d2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1976d2",
    },
  },
  "& .MuiInputLabel-root": {
    fontSize: "14px",
  },
}));

const Login = () => {
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const auth = useSelector((state) => state.auth);
  const { isSuccess, message, isError, isLoading, user, loggedFlag } = auth;
  const navigate = useNavigate();

useEffect(() => {
  if (isSuccess && user && loggedFlag && !isError) {
    makeToast("success", "Login Successful!");
    const timer = setTimeout(() => {
      dispatch(resetLoggedInFlag());
      navigate(user.role === "admin" ? "/admin" : "/");
    }, 2000);

    return () => clearTimeout(timer);
  }

  if (isError && !isSuccess) {
    makeErrorAlert(message);
    dispatch(resetState());
  }
}, [isSuccess, isError, user, loggedFlag, dispatch, navigate, message]);


  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f4f6f8",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          bgcolor: "transparent",
          borderRadius: "16px",
          width: isNonMobile ? "420px" : "100%",
          p: isNonMobile ? 5 : 3,
          boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
        }}
      >
        <Formik
          onSubmit={(values) => {
            dispatch(login(values));
          }}
          initialValues={initialValues}
          validationSchema={loginSchema}
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
              <Link to="/" style={{ textDecoration: "none" }}>
                <img
                  src="https://res.cloudinary.com/dkcgd7fio/image/upload/v1759144244/Gemini_Generated_Image_couzo3couzo3couz-removebg-preview_ugmc0u.png"
                  alt="bazaar logo"
                  style={{
                    margin: "0 auto",
                    display: "block",
                    width: "120px",
                  }}
                />
              </Link>
              <Typography
                variant="h6"
                mt={3}
                mb={4}
                textAlign="center"
                fontWeight={600}
                color="primary.main"
              >
                Welcome Back
              </Typography>
              <Box mb={3}>
                <CustomTextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="Email or Phone"
                  placeholder="maria@romax.com"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.emailOrPhone}
                  name="emailOrPhone"
                  error={!!touched.emailOrPhone && !!errors.emailOrPhone}
                  helperText={touched.emailOrPhone && errors.emailOrPhone}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box mb={3}>
                <CustomTextField
                  fullWidth
                  variant="outlined"
                  type="password"
                  label="Password"
                  placeholder="*********"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Button
                type="submit"
                disabled={!isValid || !dirty || isLoading}
                sx={{
                  textTransform: "none",
                  borderRadius: "10px",
                  bgcolor: "primary.main",
                  color: "white",
                  fontSize: "15px",
                  fontWeight: 600,
                  py: 1.5,
                  width: "100%",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                }}
              >
                {isLoading ? (
                  <CircularProgress size={22} sx={{ color: "white" }} />
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          )}
        </Formik>
        <Stack direction="row" spacing={1} justifyContent="center" mt={6}>
          <Typography>Don’t have an account?</Typography>
          <Link to="/signup" style={{ textDecoration: "none" }}>
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
              Sign Up
            </Typography>
          </Link>
        </Stack>
        <Stack direction="row" spacing={1} justifyContent="center" mt={2}>
          <Typography>Forgot your password?</Typography>
          <Link to="/forgot-password" style={{ textDecoration: "none" }}>
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
              Reset It
            </Typography>
          </Link>
        </Stack>
      </Paper>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const loginSchema = yup.object().shape({
  emailOrPhone: yup
    .string()
    .test("emailOrPhone", "Invalid email or phone number", function (value) {
      const isValidEmail = yup.string().email().isValidSync(value);
      const isValidPhone = phoneRegExp.test(value);
      return isValidEmail || isValidPhone;
    })
    .required("Email or phone number is required"),
  password: yup.string().required("Password is required"),
});

const initialValues = {
  emailOrPhone: "",
  password: "",
};

export default Login;
