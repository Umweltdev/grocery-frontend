import { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

// MUI Components
import {
  Stack,
  Card,
  Typography,
  IconButton,
  Avatar,
  Tooltip,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useTheme,
  useMediaQuery,
  Box,
  Divider,
  Skeleton, // Added for mobile loading state
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

// MUI Icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MailOutlineIcon from "@mui/icons-material/MailOutline"; // Added for mobile view

// Project Imports
import Header from "./Header";
import makeToast from "../../utils/toaster";
import {
  getCustomers,
  resetState,
  deleteCustomer,
} from "../../features/customer/customerSlice";

// ================================= //
// 1. HELPER HOOK (useDebounce)      //
// ================================= //
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// ================================= //
// 2. UI SUB-COMPONENTS              //
// ================================= //

// --- Shared Cell Components --- //
const NameCell = ({ name, imageUrl }) => (
  <Stack direction="row" alignItems="center" spacing={1.5}>
    <Avatar src={imageUrl} alt={name} sx={{ width: 36, height: 36 }}>
      {name?.charAt(0)}
    </Avatar>
    <Typography variant="body2" color="text.primary" noWrap>
      {name}
    </Typography>
  </Stack>
);
NameCell.propTypes = { name: PropTypes.string, imageUrl: PropTypes.string };

const ActionCell = ({ onDelete, rowId }) => (
  <Stack direction="row">
    <Tooltip title="Edit">
      <IconButton aria-label="edit" size="small">
        <EditIcon fontSize="inherit" />
      </IconButton>
    </Tooltip>
    <Tooltip title="Delete">
      <IconButton
        aria-label="delete"
        size="small"
        color="error"
        onClick={() => onDelete(rowId)}
      >
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </Tooltip>
  </Stack>
);
ActionCell.propTypes = {
  onDelete: PropTypes.func.isRequired,
  rowId: PropTypes.string.isRequired,
};

// --- Delete Confirmation Dialog --- //
const DeleteConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
}) => (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>{message}</DialogContentText>
    </DialogContent>
    <DialogActions sx={{ padding: "16px 24px" }}>
      <Button onClick={onClose} color="inherit">
        Cancel
      </Button>
      <Button onClick={onConfirm} color="error" variant="contained" autoFocus>
        Delete
      </Button>
    </DialogActions>
  </Dialog>
);
DeleteConfirmationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

// --- Desktop View: DataGrid Table --- //
const CustomerTable = ({ customers, isLoading, onDelete }) => {
  const columns = useMemo(
    () => [
      {
        field: "name",
        headerName: "Customer",
        flex: 1.5,
        minWidth: 220,
        renderCell: (params) => (
          <NameCell name={params.value} imageUrl={params.row.image} />
        ),
      },
      { field: "email", headerName: "Email", flex: 1.5, minWidth: 220 },
      { field: "phone", headerName: "Phone", flex: 1, minWidth: 150 },
      {
        field: "orders",
        headerName: "Orders",
        type: "number",
        flex: 0.5,
        minWidth: 100,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "action",
        headerName: "Actions",
        flex: 0.7,
        minWidth: 100,
        align: "center",
        headerAlign: "center",
        sortable: false,
        renderCell: (params) => (
          <ActionCell onDelete={onDelete} rowId={params.row.id} />
        ),
      },
    ],
    [onDelete]
  );

  return (
    <Card sx={{ boxShadow: "none", border: "1px solid #e0e0e0" }}>
      <DataGrid
        rows={customers}
        columns={columns}
        loading={isLoading}
        autoHeight
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize: 10 } },
        }}
        pageSizeOptions={[5, 10, 25]}
        sx={{
          "& .MuiDataGrid-columnHeaders": { backgroundColor: "grey.50" },
          "--DataGrid-overlayHeight": "300px",
          border: "none",
        }}
      />
    </Card>
  );
};
CustomerTable.propTypes = {
  customers: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

// --- NEW: Mobile View - List of Cards/Blocks --- //
const CustomerMobileList = ({ customers, isLoading, onDelete }) => {
  if (isLoading) {
    return (
      <Stack spacing={2}>
        {[...Array(5)].map((_, index) => (
          <Card
            key={index}
            sx={{ padding: 2, boxShadow: "none", border: "1px solid #e0e0e0" }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Skeleton variant="circular" width={36} height={36} />
              <Skeleton variant="text" width="60%" />
            </Box>
          </Card>
        ))}
      </Stack>
    );
  }

  return (
    <Stack spacing={2}>
      {customers.map((customer) => (
        <Card
          key={customer.id}
          sx={{ padding: 2, boxShadow: "none", border: "1px solid #e0e0e0" }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1.5,
            }}
          >
            <NameCell name={customer.name} imageUrl={customer.image} />
            <ActionCell onDelete={onDelete} rowId={customer.id} />
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              pt: 1.5,
              color: "text.secondary",
            }}
          >
            <MailOutlineIcon fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
              {customer.email}
            </Typography>
          </Box>
        </Card>
      ))}
    </Stack>
  );
};
CustomerMobileList.propTypes = {
  customers: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

// ================================= //
// 3. MAIN PAGE COMPONENT            //
// ================================= //
const Customers = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [customerToDelete, setCustomerToDelete] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);

  const { customers, isLoading, isError, deletedCustomer } = useSelector(
    (state) => state.customer
  );

  useEffect(() => {
    if (deletedCustomer) {
      makeToast("success", "Customer deleted successfully!");
      dispatch(getCustomers());
    }
    if (isError) {
      makeToast("error", "Something went wrong. Please try again.");
    }
    if (deletedCustomer || isError) {
      dispatch(resetState());
    }
  }, [deletedCustomer, isError, dispatch]);

  const filteredCustomers = useMemo(() => {
    if (!customers) return [];
    return customers.filter(
      (customer) =>
        customer.fullName
          .toLowerCase()
          .includes(debouncedSearchQuery.toLowerCase()) ||
        customer.email
          .toLowerCase()
          .includes(debouncedSearchQuery.toLowerCase()) ||
        (customer.phone && customer.phone.includes(debouncedSearchQuery))
    );
  }, [customers, debouncedSearchQuery]);

  const customerRows = useMemo(() => {
    return filteredCustomers.map((customer) => ({
      id: customer._id,
      name: customer.fullName,
      email: customer.email,
      phone: customer.phone || "N/A",
      image: customer.image?.url,
      orders: customer.orderCount || 0,
    }));
  }, [filteredCustomers]);

  const handleDeleteRequest = (id) => setCustomerToDelete(id);
  const handleConfirmDelete = () => {
    if (customerToDelete) {
      dispatch(deleteCustomer(customerToDelete));
      setCustomerToDelete(null);
    }
  };

  return (
    <>
      <Stack spacing={3} sx={{ padding: { xs: 2, md: 3 } }}>
        <Header
          title="Customers"
          placeholder="Search customers..."
          buttonText="Add Customer"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* --- CONDITIONAL RENDERING --- */}
        {/* If mobile, show the card list. Otherwise, show the data table. */}
        {isMobile ? (
          <CustomerMobileList
            customers={customerRows}
            isLoading={isLoading && !customers.length}
            onDelete={handleDeleteRequest}
          />
        ) : (
          <CustomerTable
            customers={customerRows}
            isLoading={isLoading && !customers.length}
            onDelete={handleDeleteRequest}
          />
        )}
      </Stack>

      <DeleteConfirmationDialog
        open={!!customerToDelete}
        onClose={() => setCustomerToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Customer"
        message="Are you sure you want to delete this customer? This action cannot be undone."
      />
    </>
  );
};

export default Customers;
