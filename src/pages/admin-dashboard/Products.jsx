import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Stack,
  Typography,
  IconButton,
  Chip,
  Switch,
  Paper,
  Tooltip,
  Box,
  useMediaQuery,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  deleteProduct,
  resetState,
} from "../../features/product/productSlice";
import Header from "./Header";
import makeToast from "../../utils/toaster";
import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const renderNameCell = (params) => {
  const { value, row } = params;
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: 2,
          overflow: "hidden",
          border: "1px solid #eee",
          bgcolor: "#fafafa",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={row.image}
          alt={value}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>
      <Stack spacing={0.5}>
        <Typography variant="subtitle1" fontWeight={600}>
          {value}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {row.id}
        </Typography>
      </Stack>
    </Stack>
  );
};

renderNameCell.propTypes = {
  params: PropTypes.shape({
    value: PropTypes.string.isRequired,
    row: PropTypes.shape({
      image: PropTypes.string,
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const MobileProductCard = ({
  row,
  onTogglePublish,
  onDelete,
  updatingProduct,
  isLoading,
}) => {
  return (
    <Card sx={{ borderRadius: 2 }}>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: 2,
              overflow: "hidden",
              border: "1px solid #eee",
            }}
          >
            <img
              src={row.image}
              alt={row.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
          <Stack flex={1}>
            <Typography fontWeight={600}>{row.name}</Typography>
            <Typography variant="caption" color="text.secondary">
              {row.category} • {row.brand}
            </Typography>
            <Typography fontWeight={600} color="primary">
              ${row.basePrice ? row.basePrice.toFixed(2) : "0.00"}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="body2">Published:</Typography>
              <Switch
                size="small"
                checked={row.publish}
                onChange={(e) => onTogglePublish(row._id, e.target.checked)}
                disabled={updatingProduct === row._id}
                color="success"
              />
            </Stack>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Link to={`/admin/product/${row._id}`}>
              <IconButton size="small" color="primary">
                <EditIcon />
              </IconButton>
            </Link>
            <Link to={`/product/${row._id}`}>
              <IconButton size="small" color="info">
                <RemoveRedEyeIcon />
              </IconButton>
            </Link>
            <IconButton
              size="small"
              color="error"
              disabled={isLoading}
              onClick={() => onDelete(row._id)}
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
    </Card>
  );
};

MobileProductCard.propTypes = {
  row: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
    category: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    basePrice: PropTypes.number,
    publish: PropTypes.bool.isRequired,
  }).isRequired,
  onTogglePublish: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  updatingProduct: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
};

const Products = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [updatingProduct, setUpdatingProduct] = useState(null);
  const isMobile = useMediaQuery("(max-width:768px)");

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

  // Toggle publish function
  const handleTogglePublish = async (productId, isPublished) => {
    setUpdatingProduct(productId);
    try {
      const response = await axios.put(
        `${base_url}/product/admin/toggle-publish/${productId}`,
        { published: isPublished },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        makeToast(
          "success",
          `Product ${isPublished ? "published" : "unpublished"} successfully!`
        );
        dispatch(getProducts());
      } else {
        makeToast(
          "error",
          response.data.message || "Failed to update product status"
        );
      }
    } catch (error) {
      console.error("Toggle publish error:", error);
      makeToast("error", "Failed to update product status. Please try again.");
      dispatch(getProducts());
    } finally {
      setUpdatingProduct(null);
    }
  };

  // Delete product handler
  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const filteredProducts = productState.filter(
    (product) =>
      product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category?.name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      product.brand?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.productId?.includes(searchQuery)
  );

  const products = filteredProducts
    .map((product) => ({
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
    }))
    .reverse();

  const columns = [
    {
      field: "name",
      headerName: "Product",
      flex: 1,
      minWidth: 220,
      renderCell: renderNameCell,
    },
    {
      field: "category",
      headerName: "Category",
      width: 150,
      renderCell: ({ value }) => <Chip label={value} />,
    },
    {
      field: "brand",
      headerName: "Brand",
      width: 150,
      renderCell: ({ value }) => <Chip label={value} />,
    },
    {
      field: "basePrice",
      headerName: "Price",
      width: 120,
      renderCell: ({ value }) => (
        <Typography fontWeight={600}>
          ${value ? value.toFixed(2) : "0.00"}
        </Typography>
      ),
    },
    { field: "stock", headerName: "Stock", width: 100 },
    {
      field: "publish",
      headerName: "Published",
      width: 120,
      renderCell: ({ row }) => (
        <Switch
          checked={row.publish}
          onChange={(e) => handleTogglePublish(row._id, e.target.checked)}
          disabled={updatingProduct === row._id}
          color="success"
        />
      ),
    },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit">
            <Link to={`/admin/product/${row._id}`}>
              <IconButton size="small" color="primary">
                <EditIcon />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title="View">
            <Link to={`/product/${row._id}`}>
              <IconButton size="small" color="info">
                <RemoveRedEyeIcon />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              size="small"
              color="error"
              disabled={isLoading}
              onClick={() => handleDeleteProduct(row._id)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <Stack spacing={3} py={3}>
      <Header
        title="Product List"
        placeholder="Search Product..."
        button="Add Product"
        route="product/create"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {!isMobile && (
        <Paper sx={{ p: 2, borderRadius: 3 }}>
          <DataGrid
            autoHeight
            rows={products}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            disableRowSelectionOnClick
            getRowHeight={() => 120}
            loading={isLoading}
            sx={{
              border: "none",
              "& .MuiDataGrid-columnHeaders": {
                bgcolor: "grey.50",
                fontWeight: 600,
              },
              "& .MuiDataGrid-cell": { borderBottom: "1px solid #f5f5f5" },
            }}
          />
        </Paper>
      )}
      {isMobile && (
        <Stack spacing={2}>
          {products.map((row) => (
            <MobileProductCard
              key={row._id}
              row={row}
              onTogglePublish={handleTogglePublish}
              onDelete={handleDeleteProduct}
              updatingProduct={updatingProduct}
              isLoading={isLoading}
            />
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default Products;
