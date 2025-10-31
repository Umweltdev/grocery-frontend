import { useState, useEffect, useMemo } from "react";
import {
  Stack,
  Typography,
  IconButton,
  Box,
  Tooltip,
  CircularProgress,
  Card,
  CardContent,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  useMediaQuery,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import Table from "./Table";
import makeToast from "../../utils/toaster";
import {
  deleteAddress,
  getCollectionAddresses,
  resetState,
} from "../../features/address/addressSlice";

const CollectionAddress = () => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width:768px)");
  const [confirmDialog, setConfirmDialog] = useState({ open: false, id: null });

  useEffect(() => {
    dispatch(getCollectionAddresses());
    return () => dispatch(resetState());
  }, [dispatch]);

  const { isError, isLoading, deletedAddress, collectionAddresses, message } =
    useSelector((state) => state.address);

  useEffect(() => {
    if (deletedAddress) {
      makeToast("success", "Address deleted successfully");
      dispatch(resetState());
      dispatch(getCollectionAddresses());
    }
    if (isError) {
      makeToast("error", message || "Something went wrong");
    }
  }, [deletedAddress, isError, message, dispatch]);

  const addresses = useMemo(
    () =>
      (collectionAddresses || []).map((address) => ({
        id: address?._id,
        name: address?.fullName,
        phone: address?.phone,
        address: address?.address,
        state: address?.state,
        email: address?.email,
      })),
    [collectionAddresses]
  );

  const columns = useMemo(
    () => [
      { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
      { field: "phone", headerName: "Phone", flex: 1, minWidth: 130 },
      { field: "email", headerName: "Email", flex: 1.2, minWidth: 200 },
      { field: "address", headerName: "Address", flex: 1.5, minWidth: 220 },
      { field: "state", headerName: "State", flex: 0.8, minWidth: 100 },
      {
        field: "action",
        headerName: "Actions",
        flex: 0.6,
        sortable: false,
        headerAlign: "center",
        align: "center",
        renderCell: ({ row }) => (
          <Stack direction="row" spacing={1}>
            <Tooltip title="Edit">
              <Link to={`/admin/address/${row.id}`}>
                <IconButton color="primary" size="small" aria-label="Edit">
                  <EditIcon fontSize="small" />
                </IconButton>
              </Link>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                color="error"
                size="small"
                aria-label="Delete"
                onClick={() => setConfirmDialog({ open: true, id: row.id })}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        ),
      },
    ],
    []
  );

  return (
    <Stack spacing={3} py={3}>
      <Header
        title="Collection Addresses"
        placeholder="Search Address..."
        button="Add Address"
        route="address/create"
      />

      {isLoading ? (
        <Box display="flex" justifyContent="center" py={6}>
          <CircularProgress />
        </Box>
      ) : addresses.length === 0 ? (
        <Box textAlign="center" py={6}>
          <Typography variant="h6" color="text.secondary">
            No addresses found
          </Typography>
        </Box>
      ) : isMobile ? (
        // 🔹 Mobile View - Cards
        <Stack spacing={2}>
          {addresses.map((addr) => (
            <Card key={addr.id} sx={{ borderRadius: 2, boxShadow: 1 }}>
              <CardContent>
                <Stack spacing={1}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {addr.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    📧 {addr.email}
                  </Typography>
                  <Typography variant="body2">📞 {addr.phone}</Typography>
                  <Typography variant="body2">🏠 {addr.address}</Typography>
                  <Typography variant="body2">🌍 {addr.state}</Typography>

                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Link to={`/admin/address/${addr.id}`}>
                      <IconButton color="primary" size="small">
                        <EditIcon />
                      </IconButton>
                    </Link>
                    <IconButton
                      color="error"
                      size="small"
                      onClick={() =>
                        setConfirmDialog({ open: true, id: addr.id })
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </Stack>
              </CardContent>
              <Divider />
            </Card>
          ))}
        </Stack>
      ) : (
        // 🔹 Desktop View - DataGrid
        <Card elevation={2} sx={{ borderRadius: 3 }}>
          <CardContent>
            <Table>
              <DataGrid
                autoHeight
                rows={addresses}
                columns={columns}
                disableRowSelectionOnClick
                pageSizeOptions={[5, 10, 20]}
                initialState={{
                  pagination: { paginationModel: { pageSize: 10 } },
                }}
                sx={{
                  border: "none",
                  "& .MuiDataGrid-columnHeaders": {
                    bgcolor: "grey.100",
                    fontWeight: 600,
                  },
                  "& .MuiDataGrid-row:hover": {
                    bgcolor: "action.hover",
                  },
                }}
              />
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog({ open: false, id: null })}
      >
        <DialogTitle>Delete Address</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this address? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setConfirmDialog({ open: false, id: null })}
            color="inherit"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              dispatch(deleteAddress(confirmDialog.id));
              setConfirmDialog({ open: false, id: null });
            }}
            color="error"
            disabled={isLoading}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default CollectionAddress;
