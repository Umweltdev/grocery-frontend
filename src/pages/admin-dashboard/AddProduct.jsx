import { useEffect, useRef, useState } from "react";
import {
  Box,
  Paper,
  Stack,
  TextField,
  styled,
  MenuItem,
  Typography,
  Button,
  Switch,
  FormControlLabel,
  Divider,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Dropzone from "react-dropzone";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import { base_url } from "../../utils/baseUrl";

import { Formik } from "formik";
import * as yup from "yup";
import {
  createProducts,
  resetState,
  getProduct,
  updateProduct,
} from "../../features/product/productSlice";
import { getCategories } from "../../features/category/categorySlice";
import { getBrands } from "../../features/brand/brandSlice";

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

const AddProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:968px)");
  const Mobile = useMediaQuery("(min-width:600px)");

  const [categoryLevels, setCategoryLevels] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [touch, setTouched] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const newProduct = useSelector((state) => state.product);
  const { brands } = useSelector((state) => state.brand);
  const categories = useSelector((state) => state.category.categories);
  const {
    isSuccess,
    isError,
    isLoading,
    createdProduct,
    updatedProduct,
    productData,
  } = newProduct;
  const resetFormRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    // dispatch(getCategories(1));
    dispatch(getBrands());
  }, []);

  useEffect(() => {
    if (id !== "create") {
      dispatch(getProduct(id));
      setEditMode(true);
    } else {
      dispatch(resetState());
    }

    return () => {
      dispatch(resetState());
      setCategoryLevels([categories]);
      setSelectedCategories([]);
      setSelectedFiles([]);
    };
  }, [id]);

  useEffect(() => {
    if (isSuccess && createdProduct) {
      makeToast("success", "Product Added Sucessfully!");
      setCategoryLevels([]);
      setSelectedCategories([]);
      resetFormRef.current();
      setSelectedFiles([]);
      dispatch(resetState());
      dispatch(getCategories(1));
      dispatch(getBrands());
    }
    if (isSuccess && updatedProduct) {
      makeToast("success", "Product Updated Successfullly!");
      setSelectedFiles([]);

      navigate("/admin/products");
      dispatch(resetState());
    }
    if (isError) {
      makeToast("error", "Something went wrong");
      dispatch(resetState());
    }
  }, [isSuccess, isError, isLoading]);

  const initialValues = {
    name: productData?.name || "",
    description: productData?.description || "",
    stock: productData?.stock || 0,
    regularPrice: productData?.regularPrice || "",
    salePrice: productData?.salePrice || "",
    tags: productData?.tags || [],
    category: productData?.category?._id || "",
    brand: productData?.brand?._id || "",
    published: productData?.published || false,
    reStock: productData?.reStock || false,
    images: [],
  };
  useEffect(() => {
    if (categories.length > 0) {
      setCategoryLevels([categories]);
    }
  }, [categories]);
  useEffect(() => {
    if (productData) {
      setSelectedFiles(productData?.images);
    }
  }, [productData]);
  return (
    <Box bgcolor="background.paper" px={{ xs: 2, md: 4 }} py={{ xs: 4, md: 4 }}>
      <Stack spacing={3}>
        <Typography variant="h6" fontSize={{xs: "19px",  sm:"21px"}}>
          {id === "create" ? "Add New Product" : "Edit Product"}
        </Typography>
        <Paper
          elevation={0}
          sx={{
            borderRadius: "8px",
            bgcolor: "white",
            padding: isNonMobile ? 6 : 3,
          }}
        >
          <Formik
            enableReinitialize={true}
            onSubmit={(values, { resetForm }) => {
              if (id !== "create") {
                const data = {
                  id: id,
                  productData: { ...values, previousImages: selectedFiles },
                };
                dispatch(updateProduct(data));
                resetFormRef.current = resetForm;
              } else {
                dispatch(createProducts(values));
                resetFormRef.current = resetForm;
              }
            }}
            initialValues={initialValues}
            validationSchema={productSchema}
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
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="20px"
                  rowGap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                  }}
                >
                  <Box
                    sx={{
                      gridColumn: "span 4",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "20px",
                    }}
                  >
                    <CustomTextField
                      // fullWidth
                      variant="outlined"
                      type="text"
                      label="Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name}
                      name="name"
                      error={!!touched.name && !!errors.name}
                      helperText={touched.name && errors.name}
                      sx={{
                        width: isNonMobile ? "250px" : "100%",
                      }}
                      InputLabelProps={{
                        style: { fontSize: "15px" },
                      }}
                    />
                    <CustomTextField
                      select
                      label="Select Brand"
                      fullWidth
                      variant="outlined"
                      onBlur={handleBlur}
                      onChange={(event) => {
                        const selectedCategoryId = event.target.value;
                        setFieldValue("brand", selectedCategoryId);
                      }}
                      value={values.brand}
                      name="brand"
                      error={!!touched.brand && !!errors.brand}
                      helperText={touched.brand && errors.brand}
                      sx={{
                        width: isNonMobile ? "250px" : "100%",
                      }}
                      InputLabelProps={{
                        style: { fontSize: "15px" },
                      }}
                    >
                      {brands.map((option) => (
                        <MenuItem key={option._id} value={option._id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </CustomTextField>
                    <Dropdown
                      setCategoryLevels={setCategoryLevels}
                      setSelectedCategories={setSelectedCategories}
                      setFieldValue={setFieldValue}
                      categoryLevels={categoryLevels}
                      selectedCategories={selectedCategories}
                      field="category"
                      errors={errors}
                      editMode={editMode}
                      categoryId={productData?.category?._id}
                    />
                  </Box>
                  <CustomTextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="Description"
                    multiline
                    rows={6}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.description}
                    name="description"
                    error={!!touched.description && !!errors.description}
                    helperText={touched.description && errors.description}
                    sx={{
                      gridColumn: "span 4",
                    }}
                    InputLabelProps={{
                      style: { fontSize: "15px" },
                    }}
                  />
                  <Box
                    sx={{
                      gridColumn: "span 4",
                    }}
                  >
                    <div>
                      <Dropzone
                        onDrop={(acceptedFiles) => {
                          const files = acceptedFiles.map((file) => {
                            file.url = URL.createObjectURL(file);
                            return file;
                          });
                          setSelectedFiles((prevFiles) => [
                            ...files,
                            ...prevFiles,
                          ]);
                          setFieldValue("images", [...files, ...values.images]);
                        }}
                        // accept="image/*"
                        multiple={true} // Set multiple to true to allow multiple file uploads
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div
                            {...getRootProps()}
                            style={{
                              backgroundColor: "#F6F9FC",
                              width: "100%",
                              mt: 2,
                              border: `1px dashed ${
                                errors.images && touch ? "#f44336" : "#DAE1E7"
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
                            onBlur={() => setTouched(true)}
                          >
                            <input accept="image/*" {...getInputProps()} />
                            <Typography
                              variant="body2"
                              color={
                                errors.images && touch ? "#f44336" : "#7D879C"
                              }
                            >
                              {errors.images && touch
                                ? errors.images
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
                      {selectedFiles.length > 0 && (
                        <div
                          style={{
                            marginTop: "30px",
                          }}
                        >
                          {selectedFiles.map((file, index) => (
                            <div
                              key={index}
                              style={{
                                display: "inline-block",
                                position: "relative",
                                marginRight: "10px",
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
                                  setSelectedFiles((prevFiles) => {
                                    const updatedFiles = prevFiles.filter(
                                      (_, i) => i !== index
                                    );
                                    return updatedFiles;
                                  });
                                  const updatedImages = values.images.filter(
                                    (_, i) => i !== index
                                  );
                                  setFieldValue("images", updatedImages);
                                }}
                              />
                              <img
                                src={file.url}
                                alt="Selected"
                                style={{
                                  width: "100px",
                                  height: "100px",
                                  borderRadius: "8px",
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </Box>
                  <CustomTextField
                    fullWidth
                    variant="outlined"
                    type="number"
                    label="Stock"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.stock}
                    name="stock"
                    error={!!touched.stock && !!errors.stock}
                    helperText={touched.stock && errors.stock}
                    sx={{
                      gridColumn: "span 2",
                    }}
                    InputLabelProps={{
                      style: { fontSize: "15px" },
                    }}
                  />{" "}
                  <CustomTextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="Tags"
                    onBlur={handleBlur}
                    onChange={(event) => {
                      const value = event.target.value;
                      const tagsArray = value
                        .split(",")
                        .map((tag) => tag.trim());
                      setFieldValue("tags", tagsArray);
                    }}
                    value={
                      Array.isArray(values.tags) ? values.tags.join(",") : ""
                    }
                    name="tags"
                    error={!!touched.tags && !!errors.tags}
                    helperText={touched.tags && errors.tags}
                    sx={{
                      gridColumn: "span 2",
                    }}
                    InputLabelProps={{
                      style: { fontSize: "15px" },
                    }}
                  />
                  <CustomTextField
                    fullWidth
                    variant="outlined"
                    type="number"
                    label="Regular Price"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.regularPrice}
                    name="regularPrice"
                    error={!!touched.regularPrice && !!errors.regularPrice}
                    helperText={touched.regularPrice && errors.regularPrice}
                    sx={{
                      gridColumn: "span 2",
                    }}
                    InputLabelProps={{
                      style: { fontSize: "15px" },
                    }}
                  />{" "}
                  <CustomTextField
                    fullWidth
                    variant="outlined"
                    type="number"
                    label="Sales Price"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.salePrice}
                    name="salePrice"
                    error={!!touched.salePrice && !!errors.salePrice}
                    helperText={touched.salePrice && errors.salePrice}
                    sx={{
                      gridColumn: "span 2",
                    }}
                    InputLabelProps={{
                      style: { fontSize: "15px" },
                    }}
                  />
                </Box>
                <Box
                  mt="20px"
                  sx={{
                    display: "flex",
                    flexDirection: Mobile ? "row" : "column",
                    gap: Mobile ? 4 : 1,
                  }}
                >
                  <FormControlLabel
                    control={
                      <Switch
                        checked={values.published}
                        onChange={(e) => {
                          setFieldValue("published", e.target.checked);
                        }}
                        name="published"
                        sx={{
                          "& .MuiSwitch-thumb": {
                            color: "#2756b6",
                          },
                          "& .Mui-checked+.MuiSwitch-track": {
                            backgroundColor: "#4e97fd !important",
                          },
                        }}
                        // sx={{
                        //   fontSize: "16px",
                        //   "&.Mui-checked": {
                        //     color: "#4e97fd",
                        //   },
                        //   "&:hover": {
                        //     color: "#4e97fd",
                        //   },
                        //   "& .MuiSvgIcon-root": { fontSize: 25 },
                        //   "& .MuiTypography-body1": {
                        //     fontSize: "16px",
                        //   },
                        // }}
                      />
                    }
                    label={
                      <Typography component="span" sx={{ fontSize: "17px" }}>
                        Publish Product
                      </Typography>
                    }
                  />

                  <FormControlLabel
                    control={
                      <Switch
                        checked={values.reStock}
                        onChange={(e) => {
                          setFieldValue("reStock", e.target.checked);
                        }}
                        name="reStock"
                        sx={{
                          "& .MuiSwitch-thumb": {
                            color: "#2756b6",
                          },
                          "& .Mui-checked+.MuiSwitch-track": {
                            backgroundColor: "#4e97fd !important",
                          },
                        }}
                      />
                    }
                    label={
                      <Typography component="span" sx={{ fontSize: "17px" }}>
                        Product will be Restocked
                      </Typography>
                    }
                  />
                </Box>

                <Button
                  type="submit"
                  disabled={!isValid || (!dirty && id === "create") || isLoading}
                  // disabled={!isValid || (!dirty || !productData)}

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
                  {isLoading ? "Loading..." : "Save Product"}
                </Button>
              </form>
            )}
          </Formik>
        </Paper>
      </Stack>
    </Box>
  );
};

const productSchema = yup.object().shape({
  name: yup
    .string()
    .required("required")
    .min(5, "Name must be at least 5 characters"),
  description: yup
    .string()
    .required("required")
    .min(8, "Name must be at least 8 characters"),
  stock: yup.number().required("required"),
  regularPrice: yup.number().required("required"),
  category: yup.string().required("At least a category is required"),
  brand: yup.string().required("required"),
  images: yup
    .array()
    .of(
      yup
        .mixed()
        .test("fileType", "Only image files are allowed", function (value) {
          if (!value) return true;
          return ["image/jpeg", "image/png", "image/gif"].includes(value.type);
        })
        .required("Image file is required")
    )
    .required("At least one image is required"),
});

export default AddProduct;
