import {
  Typography,
  TextField,
  Stack,
  Button,
  Paper,
  Box,
  IconButton,
} from "@mui/material";
import { useParams } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";

import CreditCardIcon from "@mui/icons-material/CreditCard";

import { Link } from "react-router-dom";

const Payment = () => {
  const { id } = useParams();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const handleExpiryChange = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, "");
    if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d{0,2})$/, "$1/$2");
    }
    event.target.value = value;
  };
  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={2} alignItems="center">
          <CreditCardIcon
            sx={{
              color: "#D23F57",
              fontSize: "30px",
            }}
          />

          <Typography variant="h5" fontSize="23px">
            {id === "new" ? "Add New Payment Method" : "Edit Payment Method"}
          </Typography>
        </Stack>

        <Link
          to={`/user/payments`}
          style={{
            textDecoration: "none",
          }}
        >
          <Button
            sx={{
              textTransform: "none",
              bgcolor: "#FCE9EC",
              color: "primary.main",
              fontSize: "subtitle2",
              paddingX: "40px",
              fontWeight: 600,
              paddingY: "6px",
              "&:hover": {
                backgroundColor: "rgba(210, 63, 87, 0.04)",
              },
            }}
          >
            Back To Payment Methods
          </Button>
        </Link>
      </Stack>

      <Paper
        elevation={0}
        sx={{
          bgcolor: "white",
          paddingX: 5,
          paddingY: 4,
        }}
      >
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
            label="Card Number"
            size="small"
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
            label="Name on Card"
            size="small"
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
            label="Expiry Date"
            size="small"
            placeholder="MM/YY"
            inputProps={{
              inputMode: "numeric",
              maxLength: 5,
              pattern: "\\d{2}/\\d{2}",
            }}
            InputProps={{
              disableUnderline: true,
              style: { fontSize: "16px" },
              onChange: handleExpiryChange,
            }}
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
          <TextField
            fullWidth
            variant="outlined"
            type="number"
            label="CVC"
            size="small"
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
        </Box>
        <Button
          sx={{
            mt: 4,
            textTransform: "none",
            bgcolor: "primary.main",
            color: "white",
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
          {id === "new" ? "Save Payment Method" : "Save Changes"}
        </Button>
      </Paper>
    </Stack>
  );
};

export default Payment;
