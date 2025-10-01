import React from "react";
import {
  ThemeProvider,
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Stack,
  Link,
} from "@mui/material";
import {
  CheckCircle,
  MailOutline,
  CalendarToday,
} from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { theme } from "../../theme.js";

const gradientText = {
  background: "#fff",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  display: "inline-block",
  fontWeight: 700,
};

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  React.useEffect(() => {
    localStorage.removeItem("quoteBuilderState");
    localStorage.removeItem("cartState");
    
    // Log the session ID for debugging
    if (sessionId) {
      console.log('Stripe checkout session completed:', sessionId);
    }
  }, [sessionId]);

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 2, sm: 3 },
          background: "linear-gradient(170deg, #f8fafc 0%, #eef2f9 100%)",
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, sm: 5 },
              borderRadius: 4,
              textAlign: "center",
              border: "1px solid rgba(0, 0, 0, 0.08)",
              boxShadow: "0px 16px 40px -12px rgba(0,0,0,0.05)",
            }}
          >
            <Stack spacing={3} alignItems="center">
              <CheckCircle sx={{ fontSize: 60, color: "success.main" }} />

              <Typography
                variant="h3"
                component="h1"
                sx={{ fontSize: { xs: "2.2rem", sm: "3rem" } }}
              >
                Payment
                <Box component="span" sx={gradientText}>
                  Successful!
                </Box>
              </Typography>

              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ fontWeight: 400, maxWidth: "500px" }}
              >
                Thank you for your order! Your payment has been processed successfully and your order is being prepared.
              </Typography>

              <Paper
                variant="outlined"
                sx={{
                  p: 3,
                  width: "100%",
                  textAlign: "left",
                  backgroundColor: "rgba(46, 212, 122, 0.05)",
                  borderColor: "rgba(46, 212, 122, 0.2)",
                  borderRadius: 3,
                }}
              >
                <Typography
                  variant="h6"
                  component="p"
                  sx={{ fontWeight: "bold", mb: 2 }}
                >
                  What happens next?
                </Typography>
                <Stack spacing={2}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <MailOutline sx={{ color: "success.dark" }} />
                    <Typography variant="body1">
                      You&apos;ll receive a confirmation email with your order
                      details within the next few minutes.
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <CalendarToday sx={{ color: "success.dark" }} />
                    <Typography variant="body1">
                      Your order will be prepared and ready for collection/delivery as scheduled.
                    </Typography>
                  </Box>
                </Stack>
              </Paper>

              <Typography variant="body1" color="text.secondary" sx={{ pt: 2 }}>
                Need immediate assistance? Contact our support team at<br/>
                <Link
                  href="mailto:prevailclient@gmail.com"
                  sx={{ fontWeight: "bold", color: "primary.main" }}
                >
                  Kaccocashandcarry@gmail.com
                </Link>
              </Typography>

              <Button
                variant="contained"
                onClick={handleBackToHome}
                size="large"
                sx={{
                  minWidth: 220,
                  py: 1.5,
                  fontSize: "1.4rem",
                  borderRadius: "12px",
                  textTransform: "none",
                  background: "primary.main",
                  transition: "transform 0.2s ease",
                  "&:hover": {
                    transform: "scale(1.03)",
                    background: "secondary.main",
                  },
                }}
              >
                Continue Shopping
              </Button>
            </Stack>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default CheckoutSuccess;
