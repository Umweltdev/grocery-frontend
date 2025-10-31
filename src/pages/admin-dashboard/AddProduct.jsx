import { useEffect, useRef, useState } from "react";
import {
  Box,
  Paper,
  Stack,
  TextField,
  MenuItem,
  Typography,
  Button,
  Switch,
  FormControlLabel,
  Grid,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import { CloudUpload, Delete } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import Dropzone from "react-dropzone";
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


const AddProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const resetFormRef = useRef();

  const [categoryLevels, setCategoryLevels] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const { brands } = useSelector((state) => state.brand);
  const { categories } = useSelector((state) => state.category);
  
  // Debug categories
  console.log('Categories:', categories);
  const {
    isSuccess,
    isError,
    isLoading,
    createdProduct,
    updatedProduct,
    productData,
  } = useSelector((state) => state.product);

  useEffect(() => {
    console.log('Fetching categories and brands...');
    dispatch(getCategories());
    dispatch(getBrands());
  }, [dispatch]);

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
    isFeatured: productData?.isFeatured || false,
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
    <Box bgcolor="background.paper" p={3}>
      <Typography variant="h5" mb={3}>
        {id === "create" ? "Add New Product" : "Edit Product"}
      </Typography>
      
      <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
          <Formik
            enableReinitialize={true}
            onSubmit={(values, { resetForm }) => {
              // Validate images
              if (selectedFiles.length === 0) {
                alert('Please upload at least one product image.');
                return;
              }
              
              // Ensure images are valid files
              const validImages = selectedFiles.filter(file => file instanceof File);
              
              if (id !== "create") {
                const data = {
                  id: id,
                  productData: { ...values, previousImages: selectedFiles, images: validImages },
                };
                dispatch(updateProduct(data));
                resetFormRef.current = resetForm;
              } else {
                const productData = { ...values, images: validImages };
                dispatch(createProducts(productData));
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
                <Grid container spacing={3}>
                  {/* Basic Information */}
                  <Grid item xs={12}>
                    <Typography variant="h6" mb={2}>Basic Information</Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Product Name"
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={!!touched.name && !!errors.name}
                          helperText={touched.name && errors.name}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          select
                          fullWidth
                          label="Brand"
                          name="brand"
                          value={values.brand}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={!!touched.brand && !!errors.brand}
                          helperText={touched.brand && errors.brand}
                        >
                          {brands.map((brand) => (
                            <MenuItem key={brand._id} value={brand._id}>
                              {brand.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          select
                          fullWidth
                          label="Category"
                          name="category"
                          value={values.category}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={!!touched.category && !!errors.category}
                          helperText={touched.category && errors.category}
                        >
                          {categories && categories.length > 0 ? (
                            categories.map((category) => (
                              <MenuItem key={category._id} value={category._id}>
                                {category.name}
                              </MenuItem>
                            ))
                          ) : (
                            <MenuItem disabled>No categories available</MenuItem>
                          )}
                        </TextField>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          multiline
                          rows={4}
                          label="Description"
                          name="description"
                          value={values.description}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={!!touched.description && !!errors.description}
                          helperText={touched.description && errors.description}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* Images */}
                  <Grid item xs={12}>
                    <Typography variant="h6" mb={2}>Product Images</Typography>
                    <Dropzone
                      onDrop={(acceptedFiles) => {
                        // Filter only valid image files
                        const validFiles = acceptedFiles.filter(file => 
                          file.type.startsWith('image/') && file.size <= 2000000 // 2MB limit
                        );
                        
                        const files = validFiles.map((file) => {
                          file.url = URL.createObjectURL(file);
                          return file;
                        });
                        
                        if (files.length > 0) {
                          setSelectedFiles((prev) => [...prev, ...files]);
                          setFieldValue("images", [...values.images, ...files]);
                        }
                        
                        if (acceptedFiles.length > validFiles.length) {
                          alert('Some files were rejected. Please upload only image files under 2MB.');
                        }
                      }}
                      accept={{
                        'image/jpeg': ['.jpg', '.jpeg'],
                        'image/png': ['.png'],
                        'image/gif': ['.gif']
                      }}
                      multiple
                      maxSize={2000000}
                    >

                      {({ getRootProps, getInputProps }) => (
                        <Box
                          {...getRootProps()}
                          sx={{
                            border: '2px dashed #ccc',
                            borderRadius: 2,
                            p: 3,
                            textAlign: 'center',
                            cursor: 'pointer',
                            '&:hover': { borderColor: 'primary.main' }

                          }}
                        >
                          <input {...getInputProps()} />
                          <CloudUpload sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
                          <Typography>Drag & drop images or click to select</Typography>
                        </Box>
                      )}

                    </Dropzone>
                    
                    {selectedFiles.length > 0 && (
                      <Grid container spacing={2} mt={2}>
                        {selectedFiles.map((file, index) => (
                          <Grid item xs={6} sm={4} md={3} key={index}>
                            <Card>
                              <Box position="relative">
                                <img
                                  src={file.url}
                                  alt="Preview"
                                  style={{ width: '100%', height: 120, objectFit: 'cover' }}
                                />
                                <IconButton
                                  size="small"
                                  sx={{ position: 'absolute', top: 4, right: 4, bgcolor: 'rgba(255,255,255,0.8)' }}
                                  onClick={() => {
                                    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
                                    setFieldValue("images", values.images.filter((_, i) => i !== index));
                                  }}
                                >
                                  <Delete fontSize="small" />
                                </IconButton>
                              </Box>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                    )}
                  </Grid>
                  {/* Pricing & Inventory */}
                  <Grid item xs={12}>
                    <Typography variant="h6" mb={2}>Pricing & Inventory</Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={3}>
                        <TextField
                          fullWidth
                          type="number"
                          label="Regular Price"
                          name="regularPrice"
                          value={values.regularPrice}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={!!touched.regularPrice && !!errors.regularPrice}
                          helperText={touched.regularPrice && errors.regularPrice}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          fullWidth
                          type="number"
                          label="Sale Price (Optional)"
                          name="salePrice"
                          value={values.salePrice}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={!!touched.salePrice && !!errors.salePrice}
                          helperText={touched.salePrice && errors.salePrice}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          fullWidth
                          type="number"
                          label="Stock Quantity"
                          name="stock"
                          value={values.stock}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={!!touched.stock && !!errors.stock}
                          helperText={touched.stock && errors.stock}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          fullWidth
                          label="Tags (comma separated)"
                          name="tags"
                          value={Array.isArray(values.tags) ? values.tags.join(", ") : ""}
                          onChange={(e) => {
                            const tagsArray = e.target.value.split(",").map(tag => tag.trim());
                            setFieldValue("tags", tagsArray);
                          }}
                          onBlur={handleBlur}
                          error={!!touched.tags && !!errors.tags}
                          helperText={touched.tags && errors.tags}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* Settings */}
                  <Grid item xs={12}>
                    <Typography variant="h6" mb={2}>Product Settings</Typography>
                    <Stack direction="row" spacing={4} flexWrap="wrap">
                      <FormControlLabel
                        control={
                          <Switch
                            checked={values.published}
                            onChange={(e) => setFieldValue("published", e.target.checked)}
                          />
                        }
                        label="Published"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={values.isFeatured}
                            onChange={(e) => setFieldValue("isFeatured", e.target.checked)}
                          />
                        }
                        label="Featured Product"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={values.reStock}
                            onChange={(e) => setFieldValue("reStock", e.target.checked)}
                          />
                        }
                        label="Will be Restocked"
                      />
                    </Stack>
                  </Grid>
                </Grid>

                <Box mt={3}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={!isValid || (!dirty && id === "create") || isLoading}
                    sx={{ mr: 2 }}
                  >
                    {isLoading ? "Saving..." : "Save Product"}
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate("/admin/products")}
                  >
                    Cancel
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
      </Paper>
    </Box>
  );
};

const productSchema = yup.object().shape({
  name: yup.string().required("Product name is required").min(3, "Name must be at least 3 characters"),
  description: yup.string().required("Description is required").min(10, "Description must be at least 10 characters"),
  stock: yup.number().required("Stock quantity is required").min(0, "Stock cannot be negative"),
  regularPrice: yup.number().required("Regular price is required").min(0, "Price cannot be negative"),
  salePrice: yup.number().min(0, "Sale price cannot be negative"),
  category: yup.string().required("Category is required"),
  brand: yup.string().required("Brand is required"),
  images: yup.array().min(1, "At least one image is required"),
});

export default AddProduct;


// import { v2 as cloudinary } from "cloudinary";

// (async function () {
//   // Configuration
//   cloudinary.config({
//     cloud_name: "dw4cj9csz",
//     api_key: "438336712639652",
//     api_secret: "<your_api_secret>", // Click 'View API Keys' above to copy your API secret
//   });

//   // Upload an image
//   const uploadResult = await cloudinary.uploader
//     .upload(
//       "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
//       {
//         public_id: "shoes",
//       }
//     )
//     .catch((error) => {
//       console.log(error);
//     });

//   console.log(uploadResult);

//   // Optimize delivery by resizing and applying auto-format and auto-quality
//   const optimizeUrl = cloudinary.url("shoes", {
//     fetch_format: "auto",
//     quality: "auto",
//   });

//   console.log(optimizeUrl);

//   // Transform the image: auto-crop to square aspect_ratio
//   const autoCropUrl = cloudinary.url("shoes", {
//     crop: "auto",
//     gravity: "auto",
//     width: 500,
//     height: 500,
//   });

//   console.log(autoCropUrl);
// })();