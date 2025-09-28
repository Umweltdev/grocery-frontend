import { useEffect } from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Stack,
  IconButton,
  Chip,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../features/auth/authSlice";
import DashboardHeader from "./Header";

const Order = ({
  _id,
  orderId,
  orderStatus,
  orderDate,
  totalPrice,
  className,
  sx,
  style,
}) => {
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return { bgcolor: "#4CAF50", color: "white" };
      case "processing":
        return { bgcolor: "#1552bcff", color: "white" };
      case "dispatched":
        return { bgcolor: "#9819caff", color: "white" };
      case "pending":
        return { bgcolor: "#FF9800", color: "white" };
      case "cancelled":
        return { bgcolor: "#F44336", color: "white" };
      default:
        return { bgcolor: "#9E9E9E", color: "white" };
    }
  };

  return (
    <Card
      component={Link}
      to={`/user/orders/${_id}`}
      elevation={0}
      className={className}
      style={style}
      sx={{
        textDecoration: "none",
        boxShadow: "0 4px 12px 0 rgb(0 0 0 / 0.1)",
        borderColor: "divider",
        borderRadius: 3,
        transition: "all 0.2s ease-in-out",
        bgcolor: "#fff",
        "&:hover": {
          boxShadow: "0 4px 12px 0 rgb(0 0 0 / 0.2)",
          transform: "translateY(-2px)",
        },
        ...sx,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={3}>
            <Stack spacing={1}>
              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight={600}
              >
                ORDER ID
              </Typography>
              <Typography
                variant="body2"
                fontWeight={600}
                fontFamily="monospace"
              >
                #{orderId.substring(0, 8).toUpperCase()}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={6} sm={2}>
            <Stack spacing={1}>
              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight={600}
              >
                STATUS
              </Typography>
              <Chip
                label={orderStatus}
                size="small"
                sx={{
                  fontWeight: 600,
                  width: "fit-content",
                  px: 1,
                  py: 0.5,
                  textTransform: "capitalize",
                  ...getStatusStyle(orderStatus),
                }}
              />
            </Stack>
          </Grid>

          <Grid item xs={6} sm={3}>
            <Stack spacing={1}>
              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight={600}
              >
                DATE
              </Typography>
              <Typography variant="body2">
                {new Date(orderDate).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={8} sm={3}>
            <Stack spacing={1}>
              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight={600}
              >
                TOTAL
              </Typography>
              <Typography variant="h6" color="primary.main" fontWeight={700}>
                £{totalPrice.toLocaleString()}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={4} sm={1} sx={{ textAlign: "right" }}>
            <IconButton
              size="small"
              sx={{
                bgcolor: "primary.50",
                color: "primary.main",
                "&:hover": {
                  bgcolor: "primary.100",
                },
              }}
            >
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

Order.propTypes = {
  _id: PropTypes.string.isRequired,
  orderId: PropTypes.string.isRequired,
  orderStatus: PropTypes.string.isRequired,
  orderDate: PropTypes.string.isRequired,
  totalPrice: PropTypes.number.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  sx: PropTypes.object,
};

const Orders = ({ openDrawer, className, style, sx }) => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return (
    <Stack spacing={4} className={className} style={style} sx={sx}>
      <DashboardHeader
        Icon={ShoppingBagIcon}
        title={"My Orders"}
        openDrawer={openDrawer}
      />

      {orders.length === 0 ? (
        <Card
          elevation={0}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 3,
            textAlign: "center",
            py: 8,
          }}
        >
          <CardContent>
            <ShoppingBagIcon
              sx={{
                fontSize: 64,
                color: "text.disabled",
                mb: 2,
              }}
            />
            <Typography variant="h6" color="text.secondary" mb={1}>
              No Orders Yet
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Start shopping to see your orders here
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Stack spacing={3}>
          {orders.map((order, index) => (
            <Order {...order} key={order._id || index} />
          ))}
        </Stack>
      )}
    </Stack>
  );
};

Orders.propTypes = {
  openDrawer: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  sx: PropTypes.object,
};

export default Orders;
