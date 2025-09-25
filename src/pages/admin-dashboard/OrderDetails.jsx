import { useState, useEffect } from "react";
import {
  Divider,
  Stack,
  Typography,
  Paper,
  TextField,
  Button,
  styled,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Box,
} from "@mui/material";
import { base_url } from "../../utils/baseUrl";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IReview } from "../user-dashboard/OrderedProducts";
import axios from "axios";
import makeToast from "../../utils/toaster";

const orderStatus = [
  "Pending",
  "Processing",
  "Dispatched",
  "Cancelled",
  "Delivered",
];
const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    "& fieldset": {},
    "&:hover fieldset": {},
    "&.Mui-focused fieldset": {
      borderColor: "#4e97fd",
    },
  },
  "& .MuiInputLabel-root": {
    "&.Mui-focused": {
      color: "#4e97fd",
    },
  },
});
const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [value, setValue] = useState({ orderStatus: "", isPaid: false });
  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  const getOrder = () => {
    axios
      .get(`${base_url}user/order/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((response) => {
        setOrder(response.data);
        setValue({
          orderStatus: response.data?.orderStatus,
          isPaid: response.data?.isPaid,
        });
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getOrder();
  }, []);
  const handleStatusChange = (event) => {
    setValue({ ...value, orderStatus: event.target.value });
  };

  const updateOrderStatus = (event) => {
    event.preventDefault();
    axios
      .put(`${base_url}user/order/update-order/${id}`, value, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((response) => {
        makeToast("success", "Order Updated Sucessfully!");
        navigate("/admin/orders");
      })
      .catch((error) => {
        makeToast("error", "Something Went Wrong");
        console.log(error);
      });
  };

  if (!id || id === undefined)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" mt={10}>
        <Typography variant="h6" fontSize="21px">
          No Order ID to load Order Details
        </Typography>
      </Box>
    );

  return (
    <Stack spacing={3} bgcolor="background.paper" p={{ xs: 2, sm: 3 }}>
      <Typography variant="h6" fontSize={{ xs: "19px", sm: "21px" }}>
        Order Details
      </Typography>

      <Paper
        elevation={0}
        sx={{
          bgcolor: "white",
          borderRadius: "5px",
          padding: 2,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Stack spacing={2} direction={{ xs: "column", md: "row" }}>
          <Stack direction={"row"}>
            <Typography color="text.secondary" variant="subtitle2">
              Order ID:{" "}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                color: "text.primary",
              }}
            >
              {order?.orderId}
            </Typography>
          </Stack>
          <Stack direction="row">
            <Typography color="text.secondary" variant="subtitle2">
              Placed on:{" "}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                color: "text.primary",
              }}
            >
              {new Date(order?.orderDate).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </Typography>
          </Stack>
        </Stack>

        <CustomTextField
          select
          label="Order Status"
          fullWidth
          value={value.orderStatus}
          onChange={handleStatusChange}
          variant="outlined"
          InputLabelProps={{
            style: { fontSize: "15px" },
          }}
        >
          {orderStatus.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </CustomTextField>
        <FormControlLabel
          control={
            <Checkbox
              checked={value.isPaid}
              onChange={(e) => {
                setValue({ ...value, isPaid: e.target.checked });
              }}
              name="isPaid"
              sx={{
                fontSize: "16px",
                "&.Mui-checked": {
                  color: "#4e97fd",
                },
                "&:hover": {
                  color: "#4e97fd",
                },
                "& .MuiSvgIcon-root": { fontSize: 25 },
                "& .MuiTypography-body1": {
                  fontSize: "16px",
                },
              }}
            />
          }
          label={
            <Typography component="span" sx={{ fontSize: "15px" }}>
              Paid
            </Typography>
          }
        />
        <Stack spacing={3}>
          {order?.products.map((review, index) => (
            <IReview key={index} {...review} />
          ))}
        </Stack>
      </Paper>

      <Stack spacing={3} direction={{ xs: "column", md: "row" }}>
        <Stack
          spacing={6}
          flex={1}
          py={3}
          px={{ xs: 2, sm: 5 }}
          borderRadius={3}
          alignSelf={{ xs: "stretch", md: "start" }}
          sx={{
            background: "white",
            boxShadow: " 0px 1px 3px rgba(3, 0, 71, 0.09)",
          }}
        >
          <Stack>
            <Typography fontWeight="600" color="text.primary">
              Shipping Address
            </Typography>
            <Typography
              variant="subtitle2"
              color="text.primary"
              textTransform="capitalize"
            >
              {`${order?.address?.address} ${order?.address?.state}`}
            </Typography>
          </Stack>
          <Stack>
            <Typography fontWeight="600" color="text.primary">
              Customer's Note
            </Typography>
            <Typography
              variant="subtitle2"
              color="text.primary"
              textTransform="capitalize"
            >
              {order?.comment ? order?.comment : "No Comment "}
            </Typography>
          </Stack>
        </Stack>

        <Stack
          spacing={3}
          flex={1}
          py={3}
          px={{ xs: 2, sm: 5 }}
          borderRadius={3}
          sx={{
            background: "white",

            boxShadow: " 0px 1px 3px rgba(3, 0, 71, 0.09)",
          }}
        >
          <Typography variant="h6" color="text.primary">
            Total Summary
          </Typography>
          <Stack spacing={1}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle2" color="text.secondary">
                Subtotal:
              </Typography>
              <Typography variant="subtitle1" color="text.primary">
                {`₦ ${order?.totalPrice.toLocaleString()}`}
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle2" color="text.secondary">
                Shipping Fee:
              </Typography>
              <Typography variant="subtitle1" color="text.primary">
                ₦ 0.00
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle2" color="text.secondary">
                Discount:
              </Typography>
              <Typography variant="subtitle1" color="text.primary">
                ₦ 0.00
              </Typography>
            </Stack>
          </Stack>
          <Divider />
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle1" color="text.primary">
              Total:
            </Typography>
            <Typography variant="subtitle1" color="text.primary">
              {`₦ ${order?.totalPrice.toLocaleString()}`}
            </Typography>
          </Stack>

          <Typography
            variant="subtitle2"
            color="text.primary"
            textTransform="capitalize"
          >
            {order?.isPaid ? `Paid by ${order?.paymentMethod}` : "Pending"}
          </Typography>
        </Stack>
      </Stack>
      <Button
        type="submit"
        onClick={updateOrderStatus}
        // disabled={!isValid || !dirty}
        sx={{
          textTransform: "none",
          bgcolor: "#4e97fd",
          color: "white",
          fontSize: "14px",
          paddingX: "15px",
          fontWeight: 400,
          paddingY: "5px",
          alignSelf: "start",
          borderRadius: "8px",
          alignItems: "center",

          "&:hover": {
            backgroundColor: "#2756b6",
          },
        }}
      >
        Update Order Status
      </Button>
    </Stack>
  );
};

export default OrderDetails;
