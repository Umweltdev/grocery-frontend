import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import productService from "./productService";


// Get all products
export const getProducts = createAsyncThunk(
  "product/get-products",
  async (data, thunkAPI) => {
    try {
      return await productService.getProducts(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Create new product
export const createProducts = createAsyncThunk(
  "product/create-products",
  async (productData, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("description", productData.description);
      formData.append("regularPrice", productData.regularPrice);
      formData.append("mcdPrice", productData.mcdPrice);   // ✅ Added
      formData.append("rcdPrice", productData.rcdPrice);   // ✅ Added
      formData.append("tags", productData.tags);
      formData.append("salePrice", productData.salePrice);
      formData.append("stock", productData.stock);
      formData.append("category", productData.category);
      formData.append("brand", productData.brand);
      formData.append("published", productData.published);
      formData.append("reStock", productData.reStock);

      productData.images.forEach((image) => {
        formData.append("images", image);
      });

      return await productService.createProduct(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Delete product
export const deleteProduct = createAsyncThunk(
  "product/delete-product",
  async (id, thunkAPI) => {
    try {
      return await productService.deleteProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Update product
export const updateProduct = createAsyncThunk(
  "product/update-product",
  async (data, thunkAPI) => {
    const { id, productData } = data;
    try {
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("description", productData.description);
      formData.append("regularPrice", productData.regularPrice);
      formData.append("mcdPrice", productData.mcdPrice);   // ✅ Added
      formData.append("rcdPrice", productData.rcdPrice);   // ✅ Added
      productData.tags.forEach((tag, index) => {
        formData.append(`tags[${index}]`, tag);
      });
      formData.append("salePrice", productData.salePrice);
      formData.append("stock", productData.stock);
      formData.append("brand", productData.brand);
      formData.append("category", productData.category);
      formData.append("published", productData.published);
      formData.append("reStock", productData.reStock);

      productData.previousImages.forEach((image, index) => {
        formData.append(`previousImages[${index}]`, JSON.stringify(image));
      });

      productData.images.forEach((image) => {
        formData.append("images", image);
      });

      return await productService.updateProduct(id, formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Get single product
export const getProduct = createAsyncThunk(
  "product/get-product",
  async (id, thunkAPI) => {
    try {
      return await productService.getProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Search products
export const searchProduct = createAsyncThunk(
  "product/search-product",
  async (query, thunkAPI) => {
    try {
      return await productService.searchProduct(query);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Get by category
export const getProductByCategory = createAsyncThunk(
  "product/get-product-by-category",
  async (id, thunkAPI) => {
    try {
      return await productService.getProductByCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Toggle publish/unpublish
export const togglePublish = createAsyncThunk(
  "product/toggle-publish",
  async (id, thunkAPI) => {
    try {
      return await productService.togglePublish(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Reset action
export const resetState = createAction("Reset_all_ProductState");

const initialState = {
  products: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Products
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      // Search Product
      .addCase(searchProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(searchProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      // Create Product
      .addCase(createProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdProduct = action.payload;
      })
      .addCase(createProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      // Get Single Product
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.productData = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      // Get by Category
      .addCase(getProductByCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getProductByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedProduct = action.payload;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedProduct = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      // Toggle Publish
      .addCase(togglePublish.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(togglePublish.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.toggledProduct = action.payload;
      })
      .addCase(togglePublish.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      // Reset
      .addCase(resetState, () => initialState);
  },
});

export default productSlice.reducer;
