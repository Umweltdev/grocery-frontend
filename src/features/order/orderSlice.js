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
  scheduledOrder: null,     
  billingAddress: null,
};

export const getOrders = createAsyncThunk(
  "orders/getAll",
  async (_, thunkAPI) => {
    try {
      return await orderService.getAllOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const resetState = createAction("orders/reset");

const orderSlice = createSlice({
  name: "orders",
  initialState,
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
    setScheduledOrder: (state, action) => {
  const { date, time, ...rest } = action.payload || {};
  state.scheduledOrder = {
    ...rest,
    date: date ? new Date(date).toISOString() : null,
    time: time ? new Date(time).toISOString() : null,
  };
},

  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload || [];
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.orderMessage = action.payload || "Failed to fetch orders";
      })
      .addCase(resetState, () => initialState);
  },
});

export const {
  getOrderMessage,
  setSelectedCard,
  setDeliveryOption,
  setSelectedAddress,
  setBillingAddress,
  setScheduledOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
