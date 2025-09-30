import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Stack,
  Typography,
  TextField,
  Button,
  MenuItem,
  Paper,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const OrderDeliveryForm = ({ defaultData = {}, onSubmit }) => {
  const [mode, setMode] = useState("order");
  const [formData, setFormData] = useState({
    orderId: "",
    customerName: "",
    address: "",
    date: null,
    time: null,
  });

  // ✅ Sync with defaultData whenever it changes
  useEffect(() => {
    if (defaultData) {
      setFormData((prev) => ({
        ...prev,
        orderId: defaultData.orderId || prev.orderId,
        customerName: defaultData.customerName || prev.customerName,
        address: defaultData.address || prev.address,
        date: defaultData.date ? dayjs(defaultData.date) : prev.date,
        time: defaultData.time ? dayjs(defaultData.time) : prev.time,
      }));

      // Auto-select mode
      if (defaultData.date || defaultData.time) {
        setMode("delivery");
      } else {
        setMode("order");
      }
    }
  }, [defaultData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ mode, ...formData });
    } else {
      console.log("Form Submitted:", { mode, ...formData });
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper
        elevation={2}
        sx={{
          p: 4,
          maxWidth: 600,
          mx: "auto",
          borderRadius: 3,
          boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        <Stack spacing={1} mb={3} textAlign="center">
          <Typography
            variant="h5"
            fontWeight={700}
            color="primary"
            textAlign="center"
            sx={{ letterSpacing: 0.5 }}
          >
            {mode === "order" ? "Create New Order" : "Schedule Delivery"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {mode === "order"
              ? "Order details are prefilled from your cart/order info."
              : "Select dispatch date & time for delivery."}
          </Typography>
        </Stack>

        <TextField
          select
          label="Form Type"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          fullWidth
          sx={{ mb: 3 }}
        >
          <MenuItem value="order">Pick Up</MenuItem>
          <MenuItem value="delivery">Delivery</MenuItem>
        </TextField>

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {mode === "order" ? (
              <>
                {/* Order ID should come from defaultData and NOT editable */}
                <TextField
                  label="Order ID"
                  value={formData.orderId}
                  fullWidth
                  InputProps={{ readOnly: true }}
                />
                {/* Customer Name should be editable */}
                <TextField
                  label="Customer Name"
                  value={formData.customerName}
                  onChange={(e) => handleChange("customerName", e.target.value)}
                  fullWidth
                  required
                />
                {/* Billing Address should be editable */}
                <TextField
                  label="Billing Address"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  multiline
                  rows={3}
                  fullWidth
                  required
                />
              </>
            ) : (
              <>
                <DatePicker
                  label="Dispatch Date"
                  value={formData.date}
                  onChange={(newValue) => handleChange("date", newValue)}
                  slotProps={{
                    textField: { fullWidth: true, required: true },
                  }}
                />
                <TimePicker
                  label="Dispatch Time"
                  value={formData.time}
                  onChange={(newValue) => handleChange("time", newValue)}
                  slotProps={{
                    textField: { fullWidth: true, required: true },
                  }}
                />
              </>
            )}

            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                bgcolor: "primary.main",
                textTransform: "none",
                fontWeight: 600,
                textAlign: "center",
                py: 1.5,
                borderRadius: 2,
                "&:hover": { bgcolor: "primary.dark" },
              }}
            >
              {mode === "order" ? "Confirm Order" : "Schedule Delivery"}
            </Button>
          </Stack>
        </form>
      </Paper>
    </LocalizationProvider>
  );
};

OrderDeliveryForm.propTypes = {
  defaultData: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default OrderDeliveryForm;
