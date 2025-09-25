import { useEffect, useState } from "react";
import { Stack, Typography, IconButton, Chip, Box } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "./Header";
import { DataGrid } from "@mui/x-data-grid";
import Table from "./Table";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../features/order/orderSlice";

const columns = [
  { field: "id", headerName: "Order ID", width: 120 },
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
              sx={{ color: "#33d067", bgcolor: "#e7f9ed", height: "25px" }}
            />
          )}
          {(value === "Pending" || value === "Cancelled") && (
            <Chip
              label={value}
              sx={{ color: "#e94560", bgcolor: "#ffeaea", height: "25px" }}
            />
          )}
          {(value === "Processing" || value === "Dispatched") && (
            <Chip
              label={value}
              sx={{ color: "#ffcd4e", bgcolor: "#FFF8E5", height: "25px" }}
            />
          )}
        </Box>
      );
    },
  },
  {
    field: "action",
    headerName: "Action",
    // flex: 1,
    headerAlign: "center",
    align: "center",
    renderCell: ({ row }) => (
      <Stack direction="row">
        <Link to={`/admin/order/${row._id}`}>
          <IconButton aria-label="View">
            <RemoveRedEyeIcon />
          </IconButton>
        </Link>

        {/* <IconButton aria-label="Delete">
          <DeleteIcon />
        </IconButton> */}
      </Stack>
    ),
  },
];

const Orders = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const { orders } = useSelector((state) => state.order);

  const filteredOrders = orders.filter((order) =>
    order.orderId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const orderData = filteredOrders.map((order) => ({
    _id: order?._id,
    id: order?.orderId.substring(0, 8),
    date: new Date(order.orderDate).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    qty: order?.products.reduce((sum, product) => sum + product.count, 0),
    address: `${order?.address?.address} ${order?.address?.state}`,
    amount: `₦ ${order?.totalPrice.toLocaleString()}`,

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
