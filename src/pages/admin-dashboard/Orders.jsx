import { useEffect, useState } from "react";
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
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";

import Header from "./Header";
import {
  getCategories,
  deleteCategory,
  resetState,
} from "../../features/category/categorySlice";
import makeToast from "../../utils/toaster";

const renderVisibilityCell = ({ value }) => (
  <Chip
    label={value ? "Visible" : "Hidden"}
    color={value ? "success" : "default"}
    size="small"
  />
);

renderVisibilityCell.propTypes = {
  value: PropTypes.bool,
};

const Categories = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useMediaQuery("(max-width:768px)");

  const { categories, deletedCategory, isError, isLoading } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    dispatch(getCategories(1));
  }, [dispatch]);

  useEffect(() => {
    if (deletedCategory) {
      makeToast("success", "Category deleted successfully!");
      dispatch(getCategories(1));
    }
    if (isError) {
      makeToast("error", "Something went wrong");
    }
    return () => dispatch(resetState());
  }, [deletedCategory, isError, dispatch]);

  const filteredCategories = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.categoryId.includes(searchQuery)
  );

  const categoryData = filteredCategories.map((cat) => ({
    _id: cat._id,
    id: cat.categoryId,
    name: cat.name,
    level: cat.level,
    visible: cat.visible,
  }));

  const handleDelete = (id) => {
    dispatch(deleteCategory(id));
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 100 },
    {
      field: "name",
      headerName: "Name",
      flex: 1.5,
      minWidth: 150,
      renderCell: ({ value }) => <Chip label={value} size="small" />,
    },
    { field: "level", headerName: "Level", flex: 1, minWidth: 100 },
    {
      field: "visible",
      headerName: "Visible",
      flex: 1,
      minWidth: 100,
      renderCell: renderVisibilityCell,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 0.8,
      minWidth: 120,
      sortable: false,
      renderCell: ({ row }) => (
        <Tooltip title="Delete">
          <IconButton
            size="small"
            color="error"
            disabled={isLoading}
            onClick={() => handleDelete(row._id)}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <Stack spacing={3} py={3}>
      <Header
        title="Category List"
        placeholder="Search Category..."
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        button="Add Category"
        route="category/create"
      />

      {/* Desktop Table */}
      {!isMobile && (
        <Paper sx={{ p: 2, borderRadius: 3, boxShadow: 2 }}>
          <DataGrid
            autoHeight
            rows={categoryData}
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

      {/* Mobile Card View */}
      {isMobile && (
        <Stack spacing={2}>
          {categoryData.map((row) => (
            <Card key={row._id} sx={{ borderRadius: 2 }}>
              <CardContent>
                <Stack spacing={1}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="subtitle2">
                      Category #{row.id}
                    </Typography>
                    {renderVisibilityCell({ value: row.visible })}
                  </Stack>
                  <Typography variant="body2">{row.name}</Typography>
                  <Typography variant="body2">Level: {row.level}</Typography>
                  <Stack direction="row" justifyContent="flex-end" spacing={1}>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        color="error"
                        disabled={isLoading}
                        onClick={() => handleDelete(row._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Stack>
              </CardContent>
              <Divider />
            </Card>
          ))}
        </Stack>
      )}
    </Stack>
  );
};

Categories.propTypes = {};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  button: PropTypes.string,
  route: PropTypes.string,
};

export default Categories;
