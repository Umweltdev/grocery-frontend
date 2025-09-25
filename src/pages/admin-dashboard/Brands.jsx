import { useState, useEffect } from "react";
import { Stack, IconButton, Chip, Switch } from "@mui/material";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "./Header";
import { DataGrid } from "@mui/x-data-grid";
import Table from "./Table";
import { useDispatch, useSelector } from "react-redux";
import makeToast from "../../utils/toaster";
import {
  getBrands,
  deleteABrand,
  resetState,
} from "../../features/brand/brandSlice";

const Brands = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      dispatch(getBrands());
    };
    fetchData();
  }, [searchQuery]);
  const brandState = useSelector((state) => state.brand);
  const { isSuccess, isError, isLoading, deletedBrand } = brandState;

  useEffect(() => {
    if (deletedBrand) {
      makeToast("success", "Brand deleted successfully!");
      dispatch(getBrands());
      dispatch(resetState());
    }
    if (isError) {
      makeToast("error", "Something went wrong");
    }
  }, [deletedBrand]);

  const filteredBrands = brandState.brands.filter(
    (brand) =>
      brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brand.brandId.includes(searchQuery)
  );

  const brands = filteredBrands.map((brand) => ({
    _id: brand._id,
    id: brand.brandId,
    name: brand.name,
    featured: brand.isFeatured,
    action: null,
  }));
  return (
    <Stack spacing={3} bgcolor="background.paper" py={3}>
      <Header
        title={"Brand List"}
        placeholder="Search Brand..."
        button="Add Brand"
        route="brand/create"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <Table>
        <DataGrid
          rows={brands}
          columns={[
            { field: "id", headerName: "ID", flex: 1 },
            {
              field: "name",
              headerName: "Name",
              flex: 1,
              renderCell: ({ value }) => (
                <Chip label={value} sx={{ height: "25px" }} />
              ),
            },
            {
              field: "featured",
              headerName: "Featured",
              flex: 1,
              renderCell: ({ value, row }) => {
                const [checked, setChecked] = useState(value);

                const handleSwitchChange = () => {
                  const updatedRow = { ...row, publish: !checked };
                  setChecked(!checked);
                };

                return (
                  <Switch
                    checked={checked}
                    onChange={handleSwitchChange}
                    sx={{
                      "& .MuiSwitch-thumb": {
                        color: "#2756b6",
                      },
                      "& .Mui-checked+.MuiSwitch-track": {
                        backgroundColor: "#4e97fd !important",
                      },
                    }}
                  />
                );
              },
            },

            {
              field: "action",
              headerName: "Action",
              flex: 1,
              headerAlign: "center",
              align: "center",
              renderCell: ({ row }) => (
                <Stack direction="row">
                  <Link to={`/admin/brand/${row._id}`}>
                    <IconButton aria-label="Edit">
                      <EditIcon />
                    </IconButton>
                  </Link>
                  <IconButton
                    aria-label="Delete"
                    disabled={isLoading}
                    onClick={() => {
                      dispatch(deleteABrand(row._id));
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

export default Brands;
