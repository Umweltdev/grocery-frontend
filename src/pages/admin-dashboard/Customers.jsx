import { useState, useEffect } from "react";
import { Stack, Typography, IconButton, Avatar } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "./Header";
import { DataGrid } from "@mui/x-data-grid";
import Table from "./Table";
import { useDispatch, useSelector } from "react-redux";
import makeToast from "../../utils/toaster";
import {
  getCustomers,
  resetState,
  deleteCustomer,
} from "../../features/customer/customerSlice";

const renderNameCell = (params) => {
  const { value, row } = params;
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Avatar alt="Remy Sharp" src={row.image} />

      <Typography variant="subtitle2" color=" #7d879c">
        {value}
      </Typography>
    </Stack>
  );
};

const Customers = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getCustomers());
    };
    fetchData();
  }, [searchQuery]);
  const customerState = useSelector((state) => state.customer);
  const { isSuccess, isError, isLoading, deletedCustomer } = customerState;

  useEffect(() => {
    if (deletedCustomer) {
      makeToast("success", "Customer deleted successfully!");
      dispatch(getCustomers());
    }
    if (isError) {
      makeToast("error", "Something went wrong");
    }

    return () => {
      dispatch(resetState());
    };
  }, [deletedCustomer]);
  const filteredCustomers = customerState.customers.filter(
    (customer) =>
      customer.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)
  );
  const customers = filteredCustomers.map((customer) => ({
    id: customer?._id,
    name: customer?.fullName,
    email: customer?.email,
    phone: customer?.phone,
    image: customer?.image?.url,
    orders: customer?.orderCount,
    action: null,
  }));

  return (
    <Stack spacing={3} bgcolor="background.paper" py={3}>
      <Header
        title={"Customers"}
        placeholder="Search Customer..."
        button="Add Customer"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <Table>
        <DataGrid
          rows={customers}
          columns={[
            {
              field: "name",
              headerName: "Name",
              width: 250,
              renderCell: renderNameCell,
            },
            {
              field: "phone",
              headerName: "Phone",
              width: 200,
            },
            {
              field: "email",
              headerName: "Email",
              width: 300,
            },
            {
              field: "orders",
              headerName: "No Of Orders",
              headerAlign: "center",
              align: "center",
              width: 150,
            },

            {
              field: "action",
              headerName: "Action",
              width: 150,
              headerAlign: "center",
              align: "center",
              renderCell: ({ row }) => (
                <Stack direction="row">
                  <IconButton
                    aria-label="Delete"
                    disabled={isLoading}
                    onClick={() => {
                      dispatch(deleteCustomer(row.id));
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              ),
            },
          ]}
        />
      </Table>
    </Stack>
  );
};

export default Customers;
