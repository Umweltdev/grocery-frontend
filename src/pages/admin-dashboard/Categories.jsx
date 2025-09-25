import { useState, useEffect } from "react";
import { Stack, Tooltip, IconButton, Chip, Switch } from "@mui/material";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "./Header";
import { DataGrid } from "@mui/x-data-grid";
import Table from "./Table";
import { useDispatch, useSelector } from "react-redux";
import makeToast from "../../utils/toaster";
import { base_url } from "../../utils/baseUrl";
import axios from "axios";
import {
  getCategories,
  deleteCategory,
  resetState,
} from "../../features/category/categorySlice";

const Categories = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      dispatch(getCategories(1));
    };
    fetchData();
  }, [searchQuery]);

  const categoryState = useSelector((state) => state.category);
  const { isSuccess, isError, isLoading, deletedCategory } = categoryState;
  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  useEffect(() => {
    if (deletedCategory) {
      makeToast("success", "Category deleted successfully!");
      dispatch(getCategories(1));
    }
    if (isError) {
      makeToast("error", "Something went wrong");
    }

    return () => {
      dispatch(resetState());
    };
  }, [deletedCategory]);
  const filteredCategories = categoryState.categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.categoryId.includes(searchQuery)
  );

  const categories = filteredCategories.map((category) => ({
    _id: category._id,
    id: category.categoryId,
    name: category.name,
    level: category.level,
    visible: category.visible,
    action: null,
  }));

  const updateVisibility = (id, visible) => {
    axios
      .put(
        `${base_url}category/visible/${id}`,
        { visible: visible },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((response) => {
        dispatch(getCategories(1));
      })
      .catch((error) => console.log(error));
  };
  return (
    <Stack spacing={3} bgcolor="background.paper" py={3}>
      <Header
        title={"Category List"}
        placeholder="Search Category..."
        button="Add Category"
        route="category/create"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <Table>
        <DataGrid
          rows={categories}
          columns={[
            {
              field: "id",
              headerName: "ID",
              width: 150,
              headerAlign: "center",
              align: "center",
            },
            {
              field: "name",
              headerName: "Name",
              width: 200,
              headerAlign: "center",
              align: "center",

              renderCell: ({ value }) => (
                <Chip label={value} sx={{ height: "25px" }} />
              ),
            },
            {
              field: "level",
              headerName: "Level",
              flex: 1,

              headerAlign: "center",
              align: "center",
            },
            {
              field: "visible",
              headerName: "Visible",
              width: 100,
              headerAlign: "center",
              align: "center",
              renderCell: ({ value, row }) => {
                const handleSwitchChange = (event) => {
                  const inputValue = event.target.checked;
                  updateVisibility(row._id, inputValue);
                };

                return (
                  <Switch
                    checked={value}
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
                  {/* <Link to={`/admin/category/${row._id}`}>
                    <IconButton aria-label="Edit">
                      <EditIcon />
                    </IconButton>
                  </Link> */}
                  <Tooltip title="Delete">
                    <IconButton
                      aria-label="Delete"
                      disabled={isLoading}
                      onClick={() => {
                        dispatch(deleteCategory(row._id));
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
              ),
            },
          ]}
        />
      </Table>
    </Stack>
  );
};

export default Categories;
