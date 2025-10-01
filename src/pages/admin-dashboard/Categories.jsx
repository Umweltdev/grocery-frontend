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
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import Header from "./Header";
import {
  getCategories,
  deleteCategory,
  resetState,
  updateCategory,
} from "../../features/category/categorySlice";
import makeToast from "../../utils/toaster";

const renderVisibilityCell = ({ value }) => (
  <Chip label={value ? "Visible" : "Hidden"} sx={{ height: 25, fontWeight: 300 }} />
);

renderVisibilityCell.propTypes = { value: PropTypes.bool };

const Categories = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

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
    if (isError) makeToast("error", "Something went wrong");
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

  const handleEditOpen = (category) => {
    setSelectedCategory(category);
    setEditOpen(true);
  };

  const handleEditSave = () => {
    dispatch(updateCategory(selectedCategory));
    setEditOpen(false);
  };

  const handleEditChange = (field, value) => {
    setSelectedCategory((prev) => ({ ...prev, [field]: value }));
  };

  const columns = [
    { field: "id", headerName: "Category ID", flex: 1, minWidth: 150, headerAlign: "center", align: "center" },
    { field: "name", headerName: "Name", flex: 1.5, minWidth: 120, headerAlign: "center", align: "center" },
    { field: "level", headerName: "Level", flex: 1, minWidth: 100, headerAlign: "center", align: "center" },
    {
      field: "visible",
      headerName: "Visible",
      flex: 1,
      minWidth: 100,
      headerAlign: "center",
      align: "center",
      renderCell: renderVisibilityCell,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 180,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1} justifyContent="center">
          <Tooltip title="Edit">
            <IconButton size="small" color="primary" onClick={() => handleEditOpen(row)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton size="small" color="error" disabled={isLoading} onClick={() => handleDelete(row._id)}>
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
        title="Category List"
        placeholder="Search Category..."
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        button="Add Category"
        route="category/create"
      />

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
              "& .MuiDataGrid-columnHeaders": { bgcolor: "grey.50", fontWeight: 400 },
              "& .MuiDataGrid-cell": { borderBottom: "1px solid #f5f5f5", display: "flex", alignItems: "center", justifyContent: "center" },
            }}
          />
        </Paper>
      )}

      {isMobile && (
        <Stack spacing={2}>
          {categoryData.map((row) => (
            <Card key={row._id} sx={{ borderRadius: 2 }}>
              <CardContent>
                <Stack spacing={1}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle2">Category #{row.id}</Typography>
                    {renderVisibilityCell({ value: row.visible })}
                  </Stack>
                  <Typography variant="body2" color="text.secondary">{row.level}</Typography>
                  <Typography variant="body1">{row.name}</Typography>
                  <Stack direction="row" justifyContent="flex-end" spacing={1}>
                    <Tooltip title="Edit">
                      <IconButton size="small" color="primary" onClick={() => handleEditOpen(row)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton size="small" color="error" disabled={isLoading} onClick={() => handleDelete(row._id)}>
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

      {/* Edit Dialog */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          {selectedCategory && (
            <Stack spacing={2} mt={1}>
              <TextField
                label="Category Name"
                value={selectedCategory.name}
                onChange={(e) => handleEditChange("name", e.target.value)}
                fullWidth
              />
              <TextField
                label="Level"
                value={selectedCategory.level}
                onChange={(e) => handleEditChange("level", e.target.value)}
                fullWidth
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={selectedCategory.visible}
                    onChange={(e) => handleEditChange("visible", e.target.checked)}
                    color="primary"
                  />
                }
                label="Visible"
              />
              <Button variant="contained" color="primary" onClick={handleEditSave}>
                Save Changes
              </Button>
            </Stack>
          )}
        </DialogContent>
      </Dialog>
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
