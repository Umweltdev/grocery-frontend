import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import customerService from "./customerService";

export const getCustomers = createAsyncThunk(
  "user/get-customers",
  async (thunkAPI) => {
    try {
      return await customerService.getCustomers();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteCustomer = createAsyncThunk(
  "user/delete-customer",
  async (id, thunkAPI) => {
    try {
      return await customerService.deleteCustomer(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_Customer_State");

const initialState = {
    customers: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
  };

  export const customerSlice = createSlice({
    name: "customers",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getCustomers.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getCustomers.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.customers = action.payload;
        })
        .addCase(getCustomers.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })
        .addCase(deleteCustomer.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(deleteCustomer.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.deletedCustomer = action.payload;
        })
        .addCase(deleteCustomer.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })
        .addCase(resetState, () => initialState);
    },
  });
  export default customerSlice.reducer;