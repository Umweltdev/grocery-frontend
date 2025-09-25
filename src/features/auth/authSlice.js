import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import authService from "./authServices";

const getUserfromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  user: getUserfromLocalStorage,
  orders: [],
  cards: [],
  cart: [],
  wishlist: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  userUpdated: false,
  loggedFlag: false,
  message: "",
};

// Thunks
export const signup = createAsyncThunk("auth/sign-up", async (userData, thunkAPI) => {
  try {
    return await authService.signup(userData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data?.message || "Signup failed");
  }
});

export const login = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
  try {
    return await authService.login(userData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data?.message || "Login failed");
  }
});

export const updateProfile = createAsyncThunk("auth/edit-profile", async (data, thunkAPI) => {
  try {
    const formData = new FormData();
    if (data.fullName !== undefined) formData.append("fullName", data.fullName);
    if (data.email !== undefined) formData.append("email", data.email);
    if (data.phone !== undefined) formData.append("phone", data.phone);
    if (data.dob !== undefined) formData.append("dob", data.dob);
    if (data.image !== undefined) formData.append("image", data.image);
    return await authService.editProfile(formData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data?.message || "Profile update failed");
  }
});

export const storeCart = createAsyncThunk('cart/store-cart', async (cartData, { rejectWithValue }) => {
  try {
    return await authService.storeCart(cartData);
  } catch (err) {
    return rejectWithValue(err?.response?.data?.message || err.message);
  }
});

export const userCart = createAsyncThunk(
  "cart/user-cart",
  async (data, thunkAPI) => {
    try {
      return await authService.userCart(data);
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error?.response?.data?.message || error.message,
        status: error?.response?.status || 500,
      });
    }
  }
);


export const getOrders = createAsyncThunk("user/get-orders", async (_, thunkAPI) => {
  try {
    return await authService.getOrders();
  } catch (err) {
    return thunkAPI.rejectWithValue(err?.response?.data?.message || err.message);
  }
});

export const getCards = createAsyncThunk("user/get-cards", async (_, thunkAPI) => {
  try {
    return await authService.getCards();
  } catch (err) {
    return thunkAPI.rejectWithValue(err?.response?.data?.message || err.message);
  }
});

export const getWishList = createAsyncThunk("user/get-wishlist", async (_, thunkAPI) => {
  try {
    return await authService.getWishList();
  } catch (err) {
    return thunkAPI.rejectWithValue(err?.response?.data?.message || err.message);
  }
});

// Actions
export const resetState = createAction("Reset_Auth_State");
export const resetUpdatedFlag = createAction("Reset_Updated_Flag");
export const resetLoggedInFlag = createAction("Reset_LoggedIn_Flag");
export const logout = createAction("auth/logout");

// Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // SIGNUP
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;
        state.loggedFlag = true;
        state.message = "Signup successful";
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      // LOGIN
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.loggedFlag = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      // UPDATE PROFILE
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        if (action.payload) {
          const updatedUser = { ...action.payload, token: state.user?.token };
          localStorage.setItem("user", JSON.stringify(updatedUser));
          state.user = updatedUser;
        }
        state.userUpdated = true;
        state.message = "Profile updated successfully";
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = (action.payload ) || "Profile update failed";
      })
      // USER CART
      .addCase(userCart.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(userCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cart = action.payload;
      })
      .addCase(userCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = (action.payload ) || "Failed to fetch cart";
      })
      // ORDERS
      .addCase(getOrders.pending, (state) => { state.isLoading = true; })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = (action.payload) || "Failed to fetch orders";
      })
      // CARDS
      .addCase(getCards.pending, (state) => { state.isLoading = true; })
      .addCase(getCards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cards = action.payload;
      })
      .addCase(getCards.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = (action.payload) || "Failed to fetch cards";
      })
      // WISHLIST
      .addCase(getWishList.pending, (state) => { state.isLoading = true; })
      .addCase(getWishList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.wishlist = action.payload;
      })
      .addCase(getWishList.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = (action.payload) || "Failed to fetch wishlist";
      })
      // RESET / LOGOUT
      .addCase(resetState, () => initialState)
      .addCase(resetUpdatedFlag, (state) => { state.userUpdated = false; })
      .addCase(resetLoggedInFlag, (state) => { state.loggedFlag = false; })
      .addCase(logout, () => {
        localStorage.removeItem("user");
        return { ...initialState, user: null };
      });
  },
});

export default authSlice.reducer;
