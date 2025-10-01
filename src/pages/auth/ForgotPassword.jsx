import {
  Typography,
  Box,
  Stack,
  Button,
  Paper,
  TextField,
  styled,
  Alert,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    fontSize: "14px",
    height: "45px",
    "& fieldset": {},
    "&:hover fieldset": {},
    "&.Mui-focused fieldset": {},
  },
  "& .MuiInputLabel-root": {
    fontSize: "14px",
  },
});

// changes done

const ForgotPassword = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    
    setLoading(true);
    setError("");
    setMessage("");
    
    try {
      await axios.post(
        "http://localhost:8080/api/user/forgot-password",
        { email: email.trim() }
      );
      setMessage("Password reset email sent! Check your inbox.");
      setEmail("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
        bgcolor: "#F6F9FC",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          bgcolor: "white",
          radius: "8px",
          width: isNonMobile ? "500px" : "95%",
          padding: isNonMobile ? "2rem 3rem" : "2rem 2rem",
          boxShadow: "rgba(3, 0, 71, 0.09) 0px 8px 45px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <img
              src="https://res.cloudinary.com/dkcgd7fio/image/upload/v1759144244/Gemini_Generated_Image_couzo3couzo3couz-removebg-preview_ugmc0u.png"
              alt="bazaar logo"
              style={{
                margin: "0 auto",
                display: "block",
              }}
            />
          </Link>
          <Typography variant="body2" mt={2} mb={2} textAlign="center">
            Forgot Password?
          </Typography>
          <Typography mb={4} textAlign="center">
            Enter your email to reset password.
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}

          <CustomTextField
            fullWidth
            variant="outlined"
            type="email"
            label="Email"
            placeholder="maria@romax.com"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Button
            type="submit"
            disabled={loading}
            sx={{
              textTransform: "none",
              bgcolor: "primary.main",
              color: "white",
              fontSize: "14px",
              paddingY: "10px",
              fontWeight: 600,
              width: "100%",
              marginTop: "20px",
              "&:hover": {
                backgroundColor: "#E3364E",
              },
            }}
          >
            {loading ? "Sending..." : "Submit"}
          </Button>
        </form>
        <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
          <Typography variant="subtitle2">Don&apos;t have account?</Typography>
          <Link to={"/signup"} style={{ textDecoration: "none" }}>
            <Typography
              variant="subtitle1"
              color="#2b3445"
              sx={{
                borderBottom: "1.5px solid #2b3445",
              }}
            >
              Sign Up
            </Typography>
          </Link>
        </Stack>
      </Paper>
    </Box>
  );
};

export default ForgotPassword;