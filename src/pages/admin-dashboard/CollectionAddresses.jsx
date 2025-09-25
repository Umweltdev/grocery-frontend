import { useState, useEffect } from "react";
import { Stack, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "./Header";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Table from "./Table";
import makeToast from "../../utils/toaster";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAddress,
  getCollectionAddresses,
  resetState,
} from "../../features/address/addressSlice";

const CollectionAddress = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getCollectionAddresses());
    };
    fetchData();
  }, []);
  const addressState = useSelector((state) => state.address);
  const { isSuccess, isError, isLoading, deletedAddress, collectionAddresses } =
    addressState;

  useEffect(() => {
    if (deletedAddress) {
      makeToast("success", "Address deleted successfully!");
      dispatch(resetState());
      dispatch(getCollectionAddresses());
    }
    if (isError) {
      makeToast("error", "Something went wrong");
    }
  }, [deletedAddress, isError]);

  const addresses = collectionAddresses.map((address) => ({
    id: address?._id,
    name: address?.fullName,
    phone: address?.phone,
    address: address?.address,
    state: address?.state,
    email: address?.email,
  }));
  return (
    <Stack
      spacing={3}
      bgcolor="background.paper"
      py={3}
      textTransform="capitalize"
    >
      <Header
        title={"Collection Addresses List"}
        placeholder="Search Address..."
        button="Add Address"
        route="address/create"
      />

      <Table>
        <DataGrid
          rows={addresses}
          columns={[
            {
              field: "name",
              headerName: "Name",
              width: 150,
            },
            {
              field: "phone",
              headerName: "Phone Number",
              width: 150,
            },
            {
              field: "email",
              headerName: "Email Address",
              width: 250,
            },
            {
              field: "address",
              headerName: "Address",

              width: 250,
            },
            {
              field: "state",
              headerName: "State",
              width: 100,
            },

            {
              field: "action",
              headerName: "Action",
              width: 100,
              headerAlign: "center",
              align: "center",
              renderCell: ({ row }) => (
                <Stack direction="row">
                  <Link to={`/admin/address/${row.id}`}>
                    <IconButton aria-label="Edit">
                      <EditIcon />
                    </IconButton>
                  </Link>

                  <IconButton
                    aria-label="Delete"
                    disabled={isLoading}
                    onClick={() => {
                      dispatch(deleteAddress(row.id));
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

export default CollectionAddress;
