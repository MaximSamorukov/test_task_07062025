import { configureStore } from "@reduxjs/toolkit";
import { catalogSlice } from "./slices/catalog";
import { cartSlice } from "./slices/cart";

export const store = configureStore({
  reducer: {
    catalog: catalogSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
