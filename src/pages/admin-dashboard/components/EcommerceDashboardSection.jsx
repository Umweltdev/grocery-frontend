import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getProducts } from "../../../features/product/productSlice";
import { getOrders } from "../../../features/order/orderSlice";
import { Button, Chip, Grid, IconButton, Paper, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";


export const EcommerceDashboardSection = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { products } = useSelector((state) => state.product);
    const { orders } = useSelector((state) => state.order);

    useEffect(() => {
        dispatch(getProducts());
        dispatch(getOrders());
    }, [dispatch]);

    const productData = products
        .filter((p) => p.stock <= 0)
        .map((p) => ({
            id: p._id,
            product: p?.name,
            amount: p.salePrice ? `£ ${p.salePrice.toLocaleString()}` : `£ ${p.regularPrice.toLocaleString()}`,
            stock: p?.stock,
        }));

    const orderData = orders.map((o) => ({
      id: o._id,
      orderId: o?.orderId.substring(0, 8),
      qty: o?.products.reduce((sum, p) => sum + p.count, 0),
      amount: `£ ${o?.totalPrice.toLocaleString()}`,
      status: o?.orderStatus,
      action: null,
    }));
    
    const orderColumns = [
      { field: "orderId", headerName: "Order ID", flex: 0.7 },
      { field: "qty", headerName: "Quantity", flex: 0.5 },
      {
        field: "status",
        headerName: "Status",
        flex: 1,
        renderCell: ({ value }) => (
          <Chip
            label={value}
            size="small"
            color={
              value === "Delivered"
                ? "success"
                : value === "Pending" || value === "Cancelled"
                  ? "error"
                  : "warning"
            }
            variant="outlined"
          />
        ),
      },
      { field: "amount", headerName: "Amount", flex: 0.5 },
      {
        field: "action",
        headerName: "Action",
        flex: 0.5,
        headerAlign: "center",
        align: "center",
        renderCell: ({ row }) => (
          <Stack direction="row">
            <Link to={`/admin/order/${row.id}`}>
              <IconButton size="small">
                <RemoveRedEyeIcon />
              </IconButton>
            </Link>
          </Stack>
        ),
      },
    ];

    const productColumns = [
        { field: "product", headerName: "Product", flex: 1 },
        { field: "stock", headerName: "Stock", flex: 0.5 },
        { field: "amount", headerName: "Amount", flex: 0.5 },
    ];

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} lg={7}>
                <Paper elevation={1} sx={{ p: 2, borderRadius: "10px", height: '100%' }}>
                    <Stack direction="row" justifyContent="space-between" p={1} alignItems="center">
                        <Typography variant="h6">Recent Purchases</Typography>
                        <Button onClick={() => navigate("/admin/orders")} variant="outlined" size="small" sx={{textTransform: 'none'}}>All Orders</Button>
                    </Stack>
                    <DataGrid rows={orderData} columns={orderColumns} autoHeight disableRowSelectionOnClick sx={{ border: 0 }} />
                </Paper>
            </Grid>
            <Grid item xs={12} lg={5}>
                <Paper elevation={1} sx={{ p: 2, borderRadius: "10px", height: '100%' }}>
                    <Stack direction="row" justifyContent="space-between" p={1} alignItems="center">
                        <Typography variant="h6">Stock Out Products</Typography>
                        <Button onClick={() => navigate("/admin/products")} variant="outlined" size="small" sx={{textTransform: 'none'}}>All Products</Button>
                    </Stack>
                    <DataGrid rows={productData} columns={productColumns} autoHeight disableRowSelectionOnClick sx={{ border: 0 }} />
                </Paper>
            </Grid>
        </Grid>
    );
};