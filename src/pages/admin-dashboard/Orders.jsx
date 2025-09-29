import { useEffect, useState } from "react";
import { Stack, IconButton, Chip, Box } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Link } from "react-router-dom";
import Header from "./Header";
import { DataGrid } from "@mui/x-data-grid";
import Table from "./Table";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../features/order/orderSlice";

const columns = [
  { field: "id", headerName: "Order ID", width: 120 },
  {
    field: "email",
    headerName: "Customer Email",
    width: 200,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "qty",
    headerName: "Qty",
    width: 100,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "date",
    headerName: "Purchase Date",
    width: 150,
    headerAlign: "center",
    align: "center",
  },

  {
    field: "address",
    headerName: "Billing Address",
    width: 300,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 150,
  },
  {
    field: "status",
    headerName: "Status",
    width: 120,

    renderCell: ({ value }) => {
      return (
        <Box>
          {value === "Delivered" && (
            <Chip
              label={value}
              sx={{ color: "white", bgcolor: "#4CAF50", height: "25px" }}
            />
          )}
          {value === "Pending" && (
            <Chip
              label={value}
              sx={{ color: "white", bgcolor: "#FF9800", height: "25px" }}
            />
          )}
          {value === "Processing" && (
            <Chip
              label={value}
              sx={{ color: "white", bgcolor: "#2196F3", height: "25px" }}
            />
          )}
          {value === "Dispatched" && (
            <Chip
              label={value}
              sx={{ color: "white", bgcolor: "#9C27B0", height: "25px" }}
            />
          )}
          {value === "Cancelled" && (
            <Chip
              label={value}
              sx={{ color: "white", bgcolor: "#F44336", height: "25px" }}
            />
          )}
        </Box>
      );
    },
  },
  {
    field: "action",
    headerName: "Action",
    headerAlign: "center",
    align: "center",
    renderCell: ({ row }) => (
      <Stack direction="row">
        <Link to={`/admin/order/${row._id}`}>
          <IconButton aria-label="View">
            <RemoveRedEyeIcon />
          </IconButton>
        </Link>
      </Stack>
    ),
  },
];

const Orders = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const { orders } = useSelector((state) => state.order);

  const filteredOrders = orders
    .filter((order) =>
      order.orderId.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .reverse();

  const orderData = filteredOrders.map((order) => ({
    _id: order?._id,
    id: order?.orderId.substring(0, 8),
    email: order?.orderBy?.email || "N/A",
    date: new Date(order.orderDate).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    qty: order?.products.reduce((sum, product) => sum + product.count, 0),
    address: `${order?.address?.address} ${order?.address?.state}`,
    amount: `£ ${order?.totalPrice.toLocaleString()}`,

    status: order?.orderStatus,
    action: null,
  }));

  useEffect(() => {
    const getUserOrders = async () => {
      dispatch(getOrders());
    };
    getUserOrders();
  }, [searchQuery]);

  return (
    <Stack spacing={3} bgcolor="background.paper" py={3}>
      <Header
        title={"Order List"}
        placeholder="Search Order..."
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Table>
        <DataGrid rows={orderData} columns={columns} />
      </Table>
    </Stack>
  );
};

export default Orders;
