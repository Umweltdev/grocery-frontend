import { useEffect } from "react";
import { Typography, Box, Stack, IconButton, Paper, Chip, Card, CardContent, Grid, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../features/auth/authSlice";
import DashboardHeader from "./Header";

const Order = ({ _id, orderId, orderStatus, orderDate, totalPrice }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return 'success';
      case 'processing': return 'info';
      case 'pending': return 'warning';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  return (
    <Card
      component={Link}
      to={`/user/orders/${_id}`}
      elevation={0}
      sx={{
        textDecoration: "none",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          borderColor: "primary.300",
          boxShadow: "0 4px 12px 0 rgb(0 0 0 / 0.1)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={3}>
            <Stack spacing={1}>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>
                ORDER ID
              </Typography>
              <Typography variant="body2" fontWeight={600} fontFamily="monospace">
                #{orderId.substring(0, 8).toUpperCase()}
              </Typography>
            </Stack>
          </Grid>
          
          <Grid item xs={6} sm={2}>
            <Stack spacing={1}>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>
                STATUS
              </Typography>
              <Chip
                label={orderStatus}
                color={getStatusColor(orderStatus)}
                variant="outlined"
                size="small"
                sx={{
                  fontWeight: 600,
                  textTransform: "capitalize",
                }}
              />
            </Stack>
          </Grid>
          
          <Grid item xs={6} sm={3}>
            <Stack spacing={1}>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>
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
              <Typography variant="caption" color="text.secondary" fontWeight={600}>
                TOTAL
              </Typography>
              <Typography variant="h6" color="primary.main" fontWeight={700}>
                ₦{totalPrice.toLocaleString()}
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

const Orders = ({ openDrawer }) => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.auth);
  
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return (
    <Stack spacing={4}>
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

export default Orders;
