import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/product/productSlice";
import categoryReducer from "./features/category/categorySlice";
import brandReducer from "./features/brand/brandSlice";
import customerSlice from "./features/customer/customerSlice";
import cartReducer, {initializeCart, getUserCart} from "./features/cart/cartSlice";
import authReducer from "./features/auth/authSlice";
import addressReducer from "./features/address/addressSlice";
import orderReducer from "./features/order/orderSlice";


export const store = configureStore({
  reducer: {
    product: productReducer,
    category: categoryReducer,
    brand: brandReducer,
    customer: customerSlice,
    cart: cartReducer,
    auth: authReducer,
    address: addressReducer,
    order: orderReducer
  },
});

const persistedCartState = localStorage.getItem('cartState');
if (persistedCartState) {
  store.dispatch(initializeCart(JSON.parse(persistedCartState)));
}

store.subscribe(() => {
  const { cart } = store.getState();
  localStorage.setItem('cartState', JSON.stringify(cart));
});

store.dispatch(getUserCart());
