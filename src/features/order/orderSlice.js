import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import orderService from "./orderService";

const initialState = {
  orders: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  orderMessage: null,
  selectedCard: null,
  deliveryOption: null,
  selectedAddress: null,
  billingAddress: null
};

export const getOrders = createAsyncThunk(
  "order/get-all-orders",
  async (thunkAPI) => {
    try {
      return await orderService.getAllOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_Order_State");

export const orderSlice = createSlice({
  name: "orders",
  initialState: initialState,
  reducers: {
    getOrderMessage: (state, action) => {
      state.orderMessage = action.payload;
    },
    setSelectedCard: (state, action) => {
      state.selectedCard = action.payload;
    },
    setDeliveryOption: (state, action) => {
      state.deliveryOption = action.payload;
    },
    setSelectedAddress: (state, action) => { 
      state.selectedAddress = action.payload;
    },
    setBillingAddress: (state, action) => { 
      state.billingAddress = action.payload;
    },
  },
  extraReducers: (buildeer) => {
    buildeer
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
      })
      .addCase(resetState, () => initialState);
  },
});

export const {
  getOrderMessage,
  setSelectedCard,
  setDeliveryOption,
  setSelectedAddress,
  setBillingAddress
} = orderSlice.actions;
export default orderSlice.reducer;
