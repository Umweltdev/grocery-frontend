import {
  Typography,
  Box,
  Button,
  Paper,
  TextField,
  styled,
  Alert,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { base_url } from "../../utils/baseUrl";

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

const ResetPassword = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    setLoading(true);
    setError("");
    setMessage("");
    
    try {
      await axios.put(`${base_url}api/user/reset-password/${token}`, {
        password,
      });
      setMessage("Password reset successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password");
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
            Reset Password
          </Typography>
          <Typography mb={4} textAlign="center">
            Enter your new password below.
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}

          <CustomTextField
            fullWidth
            variant="outlined"
            type="password"
            label="New Password"
            placeholder="Enter new password"
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{ mb: 2 }}
          />

          <CustomTextField
            fullWidth
            variant="outlined"
            type="password"
            label="Confirm Password"
            placeholder="Confirm new password"
            size="small"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default ResetPassword;