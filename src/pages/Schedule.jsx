import { Box, Container, Paper, Typography } from "@mui/material";
import Header from "../components/layouts/Header";
import OrderDeliveryForm from "../components/layouts/OrderDeliveryForm";

const Schedule = () => {
  return (
    <>
      <Header />
      <Container
        maxWidth="md"
        sx={{
          mt: { xs: 4, sm: 6 },
          mb: { xs: 4, sm: 6 },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            p: { xs: 3, sm: 5 },
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          <Typography
            variant="h4"
            color="primary.main"
            sx={{ fontWeight: 700, mb: 3, textAlign: "center" }}
          >
            Schedule Delivery
          </Typography>

          <Box>
            <OrderDeliveryForm />
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Schedule;
