import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  Stack,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const OrderDeliveryForm = ({ defaultData = {}, onSubmit }) => {
  const user = useSelector((state) => state.user);

  const [status, setStatus] = useState("order");
  const [formData, setFormData] = useState({
    orderId: "",
    customerName: "",
    address: "",
    date: null,
    time: null,
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      orderId: defaultData.orderId || prev.orderId || `ORD-${Date.now()}`,
      customerName: defaultData.customerName || user?.name || prev.customerName,
      address: defaultData.address || user?.address || prev.address,
      date: defaultData.date ? dayjs(defaultData.date) : prev.date,
      time: defaultData.time ? dayjs(defaultData.time) : prev.time,
    }));

    if (defaultData.date || defaultData.time) {
      setStatus("delivery");
    }
  }, [defaultData, user]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const submission = { status, ...formData };

    if (status === "order") {
      setStatus("delivery");
      setFormData((prev) => ({
        ...prev,
        date: prev.date || dayjs(),
        time: prev.time || dayjs().hour(9).minute(0),
      }));
    } else if (status === "delivery") {
      setStatus("scheduled");
      if (onSubmit) onSubmit(submission);
      console.log("Delivery Scheduled:", submission);
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
        <Stack spacing={2} textAlign="center" mb={3}>
          {status !== "scheduled" ? (
            <>
              <Typography variant="h5" fontWeight={700} color="primary">
                {status === "order" ? "Create New Order" : "Schedule Delivery"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {status === "order"
                  ? "Order details are prefilled from your account."
                  : "Select dispatch date & time for delivery."}
              </Typography>
            </>
          ) : (
            <Typography variant="h5" fontWeight={700} color="success.main">
              Delivery Scheduled!
            </Typography>
          )}
        </Stack>

        {status !== "scheduled" && (
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              {status === "order" ? (
                <>
                  <TextField
                    label="Order ID"
                    value={formData.orderId}
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    label="Customer Name"
                    value={formData.customerName}
                    onChange={(e) =>
                      handleChange("customerName", e.target.value)
                    }
                    fullWidth
                    required
                  />
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
                    minDate={dayjs()}
                    slotProps={{
                      textField: { fullWidth: true, required: true },
                    }}
                  />
                  <TimePicker
                    label="Dispatch Time"
                    value={formData.time}
                    onChange={(newValue) => handleChange("time", newValue)}
                    minTime={
                      formData.date && formData.date.isSame(dayjs(), "day")
                        ? dayjs()
                        : dayjs().hour(0).minute(0)
                    }
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
                  py: 1.5,
                  borderRadius: 2,
                  "&:hover": { bgcolor: "primary.dark" },
                }}
              >
                {status === "order" ? "Confirm Order" : "Schedule Delivery"}
              </Button>
            </Stack>
          </form>
        )}

        {status === "scheduled" && (
          <Stack spacing={2} mt={2}>
            <Typography>Order ID: {formData.orderId}</Typography>
            <Typography>Customer: {formData.customerName}</Typography>
            <Typography>Address: {formData.address}</Typography>
            <Typography>
              Delivery Date: {formData.date.format("DD/MM/YYYY")} at{" "}
              {formData.time.format("HH:mm")}
            </Typography>
          </Stack>
        )}
      </Paper>
    </LocalizationProvider>
  );
};

OrderDeliveryForm.propTypes = {
  defaultData: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default OrderDeliveryForm;
