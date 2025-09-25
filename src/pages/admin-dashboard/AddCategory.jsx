import { useEffect, useRef, useState } from "react";
import {
  Box,
  Paper,
  Stack,
  TextField,
  styled,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import axios from "axios";
import useMediaQuery from "@mui/material/useMediaQuery";
import ClearIcon from "@mui/icons-material/Clear";
import Dropzone from "react-dropzone";
import { useParams } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  resetState,
} from "../../features/category/categorySlice";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import makeToast from "../../utils/toaster";
import Dropdown from "./DropDown";
const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    "&.Mui-focused fieldset": {
      borderColor: "#4e97fd",
    },
  },
});

const AddCategory = () => {
  const { id } = useParams();
  const isNonMobile = useMediaQuery("(min-width:968px)");
  const Mobile = useMediaQuery("(min-width:600px)");
  const [categoryLevels, setCategoryLevels] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const dispatch = useDispatch();
  const categoryState = useSelector((state) => state.category);
  const [editMode, setEditMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const {
    categories,
    isSuccess,
    isError,
    isLoading,
    createdCategory,
    updatedCategory,
    categoryData,
  } = categoryState;
  const resetFormRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
     dispatch(getCategories(1));
  }, [dispatch]);

  useEffect(() => {
    if (id !== "create") {
      dispatch(getCategory(id));
      setEditMode(!editMode);
    } else {
      dispatch(resetState());
    }
  }, [id]);

  useEffect(() => {
    if (isSuccess && createdCategory) {
      makeToast("success", "Category Added Sucessfully!");
      setCategoryLevels([]);
      setSelectedCategories([]);
      resetFormRef.current();
      dispatch(resetState());
      dispatch(getCategories(1));
    }
    if (isSuccess && updatedCategory) {
      makeToast("success", "Category Updated Successfullly!");
      navigate("/admin/categories");
      dispatch(resetState());
    }
    if (isError) {
      makeToast("error", "Something went wrong");
      dispatch(resetState());
      dispatch(getCategories(1));
    }
  }, [isSuccess, isLoading]);
  const initialValues = {
    name: categoryData?.name || "",
    parent: "",
    image: null,
  };
  useEffect(() => {
    if (categories.length > 0) {
      setCategoryLevels([categories]);
    }
  }, [categories]);
  return (
    <Box
      bgcolor="background.paper"
      px={{ xs: 2, md: 4 }} py={{ xs: 4, md: 4 }}
      sx={{
        height: "calc(100vh - 75px)",
        boxSizing: "border-box",
      }}
    >
      <Stack spacing={3}>
        <Typography variant="h6" fontSize={{xs: "19px",  sm:"21px"}}>
          {id === "create" ? "Create Category" : "Edit Category"}
        </Typography>
        <Paper
          elevation={0}
          sx={{
            borderRadius: "8px",
            bgcolor: "white",
            padding: isNonMobile ? 6 : 3,
            display: "flex",
            gap: "20px",
            flexDirection: "column",
          }}
        >
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              const categoryData = { name: values.name, image: values.image };
              if (values.parent) {
                categoryData.parent = values.parent;
              }
              dispatch(createCategory(categoryData));
              resetFormRef.current = resetForm;

              // if (id !== "create") {
              //   const data = {
              //     id: id,
              //     categoryData: {
              //       name: values.name,
              //       isFeatured: values.isFeatured,
              //     },
              //   };
              //   if (values.parent) {
              //     data.categoryData.parent = values.parent;
              //   }
              //   dispatch(updateCategory(data));
              // } else {
              //   const categoryData = {
              //     name: values.name,
              //     isFeatured: values.isFeatured,
              //   };
              // if (values.parent) {
              //   categoryData.parent = values.parent;
              // }
              // dispatch(createCategory(categoryData));
              // resetFormRef.current = resetForm;
              // }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              setFieldValue,
              isValid,
              dirty,
            }) => (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <Box display="flex" gap="20px" flexWrap="wrap" mb={3}>
                  <Dropdown
                    setCategoryLevels={setCategoryLevels}
                    setSelectedCategories={setSelectedCategories}
                    setFieldValue={setFieldValue}
                    categoryLevels={categoryLevels}
                    selectedCategories={selectedCategories}
                    field="parent"
                    editMode={editMode}
                  />
                  <CustomTextField
                    variant="outlined"
                    type="text"
                    label="Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    name="name"
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                    InputLabelProps={{
                      style: { fontSize: "15px" },
                    }}
                    sx={{
                      width: isNonMobile ? "250px" : "100%",

                    }}
                  />
                </Box>
                <div>
                  <Dropzone
                    onDrop={(acceptedFiles) => {
                      const file = acceptedFiles[0];
                      setSelectedFile(file);
                      setFieldValue("image", file);
                    }}
                    // accept="image/*"
                    multiple={false}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div
                        {...getRootProps()}
                        style={{
                          backgroundColor: "#F6F9FC",
                          width: "100%",
                          mt: 2,
                          border: `1px dashed ${
                            errors.image ? "#f44336" : "#DAE1E7"
                          }`,
                          display: "flex",
                          justifyContent: "center",
                          gap: "20px",
                          alignItems: "center",
                          flexDirection: "column",
                          minHeight: "200px",
                          py: 4,
                          borderRadius: "8px",
                        }}
                      >
                        <input accept="image/*" {...getInputProps()} />
                        <Typography
                          variant="body2"
                          color={errors.image ? "#f44336" : "#7D879C"}
                        >
                          {errors.image
                            ? errors.image
                            : "Drag and drop images here"}{" "}
                        </Typography>
                        <Box width="300px">
                          <Divider
                            sx={{
                              color: "#DAE1E7",
                            }}
                          >
                            OR
                          </Divider>
                        </Box>

                        <Button
                          variant="outlined"
                          sx={{
                            color: "#4E97FD",
                            borderColor: "#4e97fd80",
                            textTransform: "none",
                            fontSize: "15px",
                            fontWeight: 500,
                            paddingX: "30px",
                            //    paddingY: "8px",
                            borderRadius: "8px",
                            "&:hover": {
                              backgroundColor: "rgba(78, 151, 253, 0.04)",
                              border: "1px solid #4E97FD",
                            },
                          }}
                          component="span"
                        >
                          Select File
                        </Button>
                      </div>
                    )}
                  </Dropzone>
                  {selectedFile && (
                    <div
                      style={{
                        marginTop: "30px",
                        position: "relative",
                        display: "inline-block",
                      }}
                    >
                      <ClearIcon
                        sx={{
                          position: "absolute",
                          fontSize: "14px",
                          top: "-10px",
                          right: "-7px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setSelectedFile(null);
                          setFieldValue("image", null);
                        }}
                      />
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        alt="Selected"
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "8px",
                        }}
                      />
                    </div>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={!isValid || (!dirty && id === "create") || isLoading}
                  sx={{
                    textTransform: "none",
                    bgcolor:
                      !isValid || (!dirty && id === "create") || isLoading
                        ? "#0000001f"
                        : "#4e97fd",
                    color: isLoading ? "#00000042" : "white",
                    fontSize: "14px",
                    paddingX: "15px",
                    fontWeight: 400,
                    paddingY: "5px",
                    alignSelf: "start",
                    borderRadius: "8px",
                    alignItems: "center",
                    mt: "20px",

                    "&:hover": {
                      backgroundColor: "#2756b6",
                    },
                  }}
                >
                                    {isLoading ? "Loading..." : "Save Category"}

                </Button>
              </form>
            )}
          </Formik>
        </Paper>
      </Stack>
    </Box>
  );
};
const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  image: yup
    .mixed()
    .notRequired()
    .test("fileType", "Only image files are allowed", function (value) {
      if (!value) return true; // Skip validation if no file is selected
      return ["image/jpeg", "image/png", "image/gif"].includes(value.type);
    }),
});
export default AddCategory;
