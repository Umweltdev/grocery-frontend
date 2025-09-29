import { useEffect, useState } from "react";
import {
  Stack,
  Typography,
  IconButton,
  Chip,
  Switch,
  Grid,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Table from "./Table";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  deleteProduct,
  resetState,
} from "../../features/product/productSlice";
import Header from "./Header";
import makeToast from "../../utils/toaster";

// Render product name with image
const renderNameCell = (params) => {
  const { value, row } = params;
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <img src={row.image} alt={value} width={40} height={40} />
      <Stack>
        <Typography variant="subtitle2" color="#7d879c">
          {value}
        </Typography>
        <Typography fontSize="12px">{row.id}</Typography>
      </Stack>
    </Stack>
  );
};

const Products = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  const {
    products: productState,
    isError,
    isLoading,
    deletedProduct,
  } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (deletedProduct) {
      makeToast("success", "Product deleted successfully!");
      dispatch(resetState());
      dispatch(getProducts());
    }
    if (isError) makeToast("error", "Something went wrong");
  }, [deletedProduct, isError, dispatch]);

  // Filter products
  const filteredProducts = productState.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.productId.includes(searchQuery)
  );

  // Map products (only base price here)
  const products = filteredProducts.map((product) => ({
    _id: product._id,
    id: product.productId,
    name: product.name,
    image: product?.images?.[0]?.url,
    category: product?.category?.name || "N/A",
    brand: product?.brand?.name || "No Brand",
    publish: product.published,
    action: null,
    basePrice: product.regularPrice,
    stock: product?.stock,
  })).reverse();

  return (
    <Stack spacing={3} bgcolor="background.paper" py={3}>
      <Header
        title="Product List"
        placeholder="Search Product..."
        button="Add Product"
        route="product/create"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <Grid container>
        <Grid item xs={12}>
          <Table>
            <DataGrid
              rows={products}
              columns={[
                {
                  field: "name",
                  headerName: "Name",
                  width: 200,
                  renderCell: renderNameCell,
                },
                {
                  field: "category",
                  headerName: "Category",
                  width: 150,
                  renderCell: ({ value }) => (
                    <Chip label={value} sx={{ height: "25px" }} />
                  ),
                },
                {
                  field: "brand",
                  headerName: "Brand",
                  width: 150,
                  renderCell: ({ value }) => (
                    <Chip label={value} sx={{ height: "25px" }} />
                  ),
                },
                {
                  field: "basePrice",
                  headerName: "Base Price",
                  width: 120,
                  renderCell: ({ value }) => (
                    <Typography>
                      ${value ? value.toFixed(2) : "0.00"}
                    </Typography>
                  ),
                },
                { field: "stock", headerName: "Stock", width: 100 },
                {
                  field: "publish",
                  headerName: "Published",
                  width: 120,
                  renderCell: ({ value }) => (
                    <Switch
                      checked={value}
                      sx={{
                        "& .MuiSwitch-thumb": { color: "#2756b6" },
                        "& .Mui-checked+.MuiSwitch-track": {
                          backgroundColor: "#4e97fd !important",
                        },
                      }}
                    />
                  ),
                },
                {
                  field: "action",
                  headerName: "Action",
                  width: 200,
                  headerAlign: "center",
                  align: "center",
                  renderCell: ({ row }) => (
                    <Stack direction="row">
                      <Link to={`/admin/product/${row._id}`}>
                        <IconButton aria-label="Edit">
                          <EditIcon />
                        </IconButton>
                      </Link>
                      <Link to={`/product/${row._id}`}>
                        <IconButton aria-label="View">
                          <RemoveRedEyeIcon />
                        </IconButton>
                      </Link>
                      <IconButton
                        aria-label="Delete"
                        disabled={isLoading}
                        onClick={() => dispatch(deleteProduct(row._id))}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  ),
                },
              ]}
            />
          </Table>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Products;
