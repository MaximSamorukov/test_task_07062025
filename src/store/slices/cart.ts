import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { OrderItem, Product } from "../../service/types";

interface CartState {
  items: Record<OrderItem["id"], OrderItem>;
  selectedItemId?: number;
}

const initialState: CartState = {
  items: {},
  selectedItemId: undefined,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addOneItem: (state, action: PayloadAction<Product>) => {
      const selectedItem = state.items[action.payload.id] || action.payload;
      state.items[action.payload.id] = {
        ...selectedItem,
        count: (selectedItem.count || 0) + 1,
      };
    },
    removeOneItem: (state, action: PayloadAction<Product>) => {
      const selectedItem = state.items[action.payload.id] || action.payload;
      state.items[action.payload.id] = {
        ...selectedItem,
        count: selectedItem.count - 1 <= 0 ? 0 : selectedItem.count - 1,
      };
    },
    selectOneItem: (state, action: PayloadAction<Product>) => {
      state.selectedItemId = action.payload.id;
      const selectedItem = state.items[action.payload.id] || {};
      if (!selectedItem) {
        state.items[action.payload.id] = {
          ...action.payload,
          count: 0,
        };
      }
    },
    removeAllItemsById: (state, action: PayloadAction<Product>) => {
      state.items[action.payload.id].count = 0;
    },
    onBlur: (state) => (state.selectedItemId = undefined),
  },
});

export const {
  addOneItem,
  removeOneItem,
  selectOneItem,
  removeAllItemsById,
  onBlur,
} = cartSlice.actions;

export default cartSlice.reducer;
