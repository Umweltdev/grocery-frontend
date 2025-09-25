import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import cartService from "./cartService";
export const getUserCart = createAsyncThunk(
  "cart/get-user-cart",
  async (token, thunkAPI) => {
    try {
      return await cartService.getUserCart(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  products: [],
  cartTotal: 0,
  isLoading: false,
  error: false,
};
const calculateProductTotal = (product) => {
  return product.price * product.count;
};

const calculateCartTotal = (products) => {
  let total = 0;
  products.forEach((product) => {
    total += product.total;
  });
  return total;
};

export const resetState = createAction("Reset_Cart_State");

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, price, image, name } = action.payload;
      const existingProduct = state.products.find(
        (product) => product.id === id
      );

      if (existingProduct) {
        existingProduct.count += 1;
        existingProduct.price = price
        existingProduct.total = calculateProductTotal(existingProduct);
      } else {
        const newProduct = {
          id,
          count: 1,
          price,
          image,
          total: price,
          name: name,
        };
        state.products.push(newProduct);
      }

      state.cartTotal = calculateCartTotal(state.products);
    },
    addAllToCart: (state, action) => {
      action.payload.forEach((prod) => {
        const { id, price, image, name, count = 1 } = prod;
        const existingProduct = state.products.find(
          (product) => product.id === id
        );

        if (existingProduct) {
          existingProduct.count += count;
          existingProduct.price = price;
          existingProduct.total = calculateProductTotal(existingProduct);
        } else {
          const newProduct = {
            id,
            count,
            price,
            image,
            total: price * count,
            name: name,
          };
          state.products.push(newProduct);
        }
      });

      state.cartTotal = calculateCartTotal(state.products);
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      const updatedProducts = state.products.filter(
        (product) => product.id !== productId
      );
      state.products = updatedProducts;
      state.cartTotal = calculateCartTotal(state.products);
    },
    increaseQuantity: (state, action) => {
      const productId = action.payload;
      const product = state.products.find(
        (product) => product.id === productId
      );
      if (product) {
        product.count += 1;
        product.total = calculateProductTotal(product);
        state.cartTotal = calculateCartTotal(state.products);
      }
    },
    decreaseQuantity: (state, action) => {
      const productId = action.payload;
      const product = state.products.find(
        (product) => product.id === productId
      );
      if (product) {
        if (product.count > 1) {
          product.count -= 1;
          product.total = calculateProductTotal(product);
        } else {
          // Remove the product from the cart if count becomes zero
          const updatedProducts = state.products.filter(
            (p) => p.id !== productId
          );
          state.products = updatedProducts;
        }
        state.cartTotal = calculateCartTotal(state.products);
      }
    },
    clearCart: (state) => {
      state.products = [];
      state.cartTotal = 0;
    },
    initializeCart: (state, action) => {
      const { products, cartTotal } = action.payload;
      state.products = products;
      state.cartTotal = cartTotal;
    },
  },
  extraReducers: (buildeer) => {
    buildeer
      .addCase(getUserCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.error = false;
        state.isLoading = false;
        const cartData = action.payload;
        if (cartData) {
          const existingProductIds = state.products.map(
            (product) => product.id
          );
          const newProducts = cartData.products.filter(
            (product) => !existingProductIds.includes(product.id)
          );
          newProducts.forEach((product) => {
            const subtotal = product.price * product.count;
            state.products.push(product);
            state.cartTotal += subtotal;
          });
        }
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.error = true;
        state.isLoading = false;
      })
      .addCase(resetState, () => initialState);
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  initializeCart,
  addAllToCart,
} = cartSlice.actions;

export default cartSlice.reducer;
