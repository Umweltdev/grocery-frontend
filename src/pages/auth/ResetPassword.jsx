import React, { useState } from "react";
import {
  Typography,
  Box,
  Stack,
  Button,
  IconButton,
  Paper,
  TextField,
  Rating,
  styled,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
        <form>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <img
              src="https://bazaar.ui-lib.com/assets/images/bazaar-black-sm.svg"
              alt="bazaar logo"
              style={{
                margin: "0 auto",
                display: "block",
              }}
            />
          </Link>
          <Typography variant="body2" mt={2} mb={4} textAlign="center">
            Reset your Password
          </Typography>

          <Box mb={2}>
            <Typography
              variant="subtitle1"
              fontSize="12px"
              color="#4b566b"
              mb={1.5}
            >
              Password
            </Typography>
            <CustomTextField
              fullWidth
              variant="outlined"
              type={showPassword ? "text" : "password"}
              placeholder="*********"
              size="small"
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={handleTogglePassword}
                    edge="end"
                    sx={{ padding: 0, marginRight: "10px" }}
                  >
                    {showPassword ? (
                      <Visibility
                        sx={{
                          fontSize: "20px",
                        }}
                      />
                    ) : (
                      <VisibilityOff
                        sx={{
                          fontSize: "20px",
                          color: "#DAE1E7",
                        }}
                      />
                    )}
                  </IconButton>
                ),
              }}
            />
          </Box>
          <Box mb={2}>
            <Typography
              variant="subtitle1"
              fontSize="12px"
              color="#4b566b"
              mb={1.5}
            >
              Confirm Password
            </Typography>
            <CustomTextField
              fullWidth
              variant="outlined"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="*********"
              size="small"
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={handleToggleConfirmPassword}
                    edge="end"
                    sx={{ padding: 0, marginRight: "10px" }}
                  >
                    {showConfirmPassword ? (
                      <Visibility
                        sx={{
                          fontSize: "20px",
                        }}
                      />
                    ) : (
                      <VisibilityOff
                        sx={{
                          fontSize: "20px",
                          color: "#DAE1E7",
                        }}
                      />
                    )}
                  </IconButton>
                ),
              }}
            />
          </Box>
          <Button
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
            Reset
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default ResetPassword;
