import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import {
  Stack,
  Typography,
  IconButton,
  Chip,
  Paper,
  Tooltip,
  useMediaQuery,
  Card,
  CardContent,
  Divider,
  Dialog,
  DialogContent,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

import { getOrders } from "../../features/order/orderSlice";
import Header from "./Header";
import OrderDeliveryForm from "../../components/layouts/OrderDeliveryForm";

const renderStatusCell = ({ value }) => {
  let color;
  let bgcolor;

  switch (value) {
    case "Delivered":
      color = "#33d067";
      bgcolor = "#e7f9ed";
      break;
    case "Pending":
    case "Cancelled":
      color = "#e94560";
      bgcolor = "#ffeaea";
      break;
    case "Processing":
    case "Dispatched":
      color = "#ffcd4e";
      bgcolor = "#FFF8E5";
      break;
    default:
      color = "#888";
      bgcolor = "#f0f0f0";
  }

  return (
    <Chip label={value} sx={{ color, bgcolor, height: 25, fontWeight: 300 }} />
  );
};

renderStatusCell.propTypes = {
  value: PropTypes.string,
};

const Orders = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const isMobile = useMediaQuery("(max-width:768px)");

  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const filteredOrders =
    orders
      ?.filter((order) =>
        order?.orderId?.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .reverse() || [];

  const orderData = filteredOrders.map((order) => ({
    _id: order?._id,
    id: order?.orderId?.substring(0, 8),
    email: order?.orderBy?.email || "N/A",
    date: new Date(order?.orderDate).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    qty: order?.products?.reduce((sum, product) => sum + product.count, 0),
    address: `${order?.address?.address || ""} ${order?.address?.state || ""}`,
    amount: `£ ${order?.totalPrice?.toLocaleString()}`,
    status: order?.orderStatus,
    customerName: order?.customerName,
  }));

  const columns = [
    { field: "id", headerName: "Order ID", flex: 1, minWidth: 120 },
    {
      field: "email",
      headerName: "Customer Email",
      flex: 1,
      minWidth: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "qty",
      headerName: "Qty",
      flex: 0.5,
      minWidth: 80,
      align: "center",
      headerAlign: "center",
    },
    { field: "date", headerName: "Purchase Date", flex: 1, minWidth: 150 },
    { field: "address", headerName: "Billing Address", flex: 2, minWidth: 200 },
    { field: "amount", headerName: "Amount", flex: 1, minWidth: 120 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 140,
      renderCell: renderStatusCell,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 0.6,
      minWidth: 100,
      sortable: false,
      renderCell: ({ row }) => (
        <Tooltip title="View Order">
          <Link to={`/admin/order/${row._id}`}>
            <IconButton size="small" color="info">
              <RemoveRedEyeIcon />
            </IconButton>
          </Link>
        </Tooltip>
      ),
    },
    {
      field: "delivery",
      headerName: "Delivery",
      flex: 0.8,
      minWidth: 120,
      sortable: false,
      renderCell: ({ row }) => (
        <Tooltip title="Schedule Delivery">
          <IconButton
            size="small"
            color="primary"
            onClick={() => {
              setSelectedOrder(row);
              setOpenForm(true);
            }}
          >
            <LocalShippingIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <Stack spacing={3} py={3}>
      <Header
        title="Order List"
        placeholder="Search Order..."
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {!isMobile && (
        <Paper sx={{ p: 2, borderRadius: 3, boxShadow: 2 }}>
          <DataGrid
            autoHeight
            rows={orderData}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            disableRowSelectionOnClick
            getRowId={(row) => row._id}
            sx={{
              border: "none",
              "& .MuiDataGrid-columnHeaders": {
                bgcolor: "grey.50",
                fontWeight: 400,
              },
              "& .MuiDataGrid-cell": { borderBottom: "1px solid #f5f5f5" },
            }}
          />
        </Paper>
      )}

      {isMobile && (
        <Stack spacing={2}>
          {orderData.map((row) => (
            <Card key={row._id} sx={{ borderRadius: 2,  }}>
              <CardContent>
                <Stack spacing={1}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography fontWeight={400}>Order #{row.id}</Typography>
                    {renderStatusCell({ value: row.status })}
                  </Stack>

                  <Typography variant="body2" color="text.secondary">
                    {row.date}
                  </Typography>
                  <Typography variant="body2">{row.address}</Typography>
                  <Typography fontWeight={400}>{row.amount}</Typography>

                  <Stack direction="row" justifyContent="flex-end" spacing={1}>
                    <Link to={`/admin/order/${row._id}`}>
                      <IconButton size="small" color="info">
                        <RemoveRedEyeIcon />
                      </IconButton>
                    </Link>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => {
                        setSelectedOrder(row);
                        setOpenForm(true);
                      }}
                    >
                      <LocalShippingIcon />
                    </IconButton>
                  </Stack>
                </Stack>
              </CardContent>
              <Divider />
            </Card>
          ))}
        </Stack>
      )}

      <Dialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          {selectedOrder && (
            <OrderDeliveryForm
              defaultData={{
                orderId: selectedOrder.id,
                customerName: selectedOrder.customerName,
                address: selectedOrder.address,
              }}
              onSubmit={(data) => {
                console.log("Delivery Submitted:", data);
                setOpenForm(false);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Stack>
  );
};

Orders.propTypes = {};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
};

OrderDeliveryForm.propTypes = {
  defaultData: PropTypes.shape({
    orderId: PropTypes.string,
    customerName: PropTypes.string,
    address: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
};

export default Orders;
