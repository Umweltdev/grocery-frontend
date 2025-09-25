import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import addressService from "./addressService";

export const getAddresses = createAsyncThunk(
  "address/get-addresses",
  async (thunkAPI) => {
    try {
      return await addressService.getAddresses();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getCollectionAddresses = createAsyncThunk(
  "address/get-collection-addresses",
  async (thunkAPI) => {
    try {
      return await addressService.getCollectionAddresses();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getBillingAddresses = createAsyncThunk(
  "address/get-billing-addresses",
  async (thunkAPI) => {
    try {
      return await addressService.getBillingAddresses();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createAddress = createAsyncThunk(
  "address/create-address",
  async (addressData, thunkAPI) => {
    try {
      return await addressService.createAddress(addressData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAddress = createAsyncThunk(
  "address/get-address",
  async (id, thunkAPI) => {
    try {
      return await addressService.getAddress(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAddress = createAsyncThunk(
  "address/update-address",
  async (address, thunkAPI) => {
    try {
      return await addressService.updateAddress(address);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "address/delete-address",
  async (id, thunkAPI) => {
    try {
      return await addressService.deleteAddress(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_Address_State");
// export const resetUpdatedFlag = createAction("Reset_UpdatedAddress_Flag");

const initialState = {
  addresses: [],
  collectionAddresses: [],
  billingAddresses: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
};
export const addressSlice = createSlice({
  name: "addresses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAddresses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.addresses = action.payload;
      })
      .addCase(getAddresses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getCollectionAddresses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCollectionAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.collectionAddresses = action.payload;
      })
      .addCase(getCollectionAddresses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getBillingAddresses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBillingAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.billingAddresses = action.payload;
      })
      .addCase(getBillingAddresses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdAddress = action.payload;
      })
      .addCase(createAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.addressData = action.payload;
      })
      .addCase(getAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedAddress = action.payload;
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedAddress = action.payload;
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      // .addCase(resetUpdatedFlag, (state,action) => {state.updatedAddress = null})
      .addCase(resetState, () => initialState);
  },
});

export default addressSlice.reducer;
