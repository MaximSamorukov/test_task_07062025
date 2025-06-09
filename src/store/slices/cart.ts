import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { OrderItem, Product, OrderResponse } from "../../service/types";
import { localStorageService } from "../../service/localStorageService";
import type { RootState } from "..";

interface CartState {
  items: Record<OrderItem["id"], OrderItem>;
  selectedItemId?: number;
  result?: {
    label: string;
    state: boolean;
  };
  savingOrder: boolean;
}

const initialState: CartState = {
  items: {},
  selectedItemId: undefined,
  savingOrder: false,
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
      localStorageService.saveOrderItems(Object.values(state.items));
    },
    removeOneItem: (state, action: PayloadAction<Product>) => {
      const selectedItem = state.items[action.payload.id] || action.payload;
      state.items[action.payload.id] = {
        ...selectedItem,
        count: selectedItem.count - 1 <= 0 ? 0 : selectedItem.count - 1,
      };
      localStorageService.saveOrderItems(Object.values(state.items));
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
      if (state.selectedItemId === action.payload.id) {
        state.selectedItemId = undefined;
      }
      state.items[action.payload.id].count = 0;
      localStorageService.saveOrderItems(Object.values(state.items));
    },
    onBlur: (state) => (state.selectedItemId = undefined),
    resetAll: (state) => {
      state.items = {};
      state.selectedItemId = undefined;
      localStorageService.saveOrderItems([]);
    },
    setItems: (state, action: PayloadAction<OrderItem[]>) => {
      state.items = action.payload.reduce((acc, i) => {
        acc[i.id] = i;
        return acc;
      }, {} as Record<OrderItem["id"], OrderItem>);
    },
    toggleModal: (
      state,
      action: PayloadAction<OrderResponse & { state: boolean }>
    ) => {
      if (action.payload.error) {
        state.result = {
          label: "Ошибка сетового запроса",
          state: action.payload.state,
        };
      }
      if (!action.payload.error) {
        state.result = {
          label: "Данные сохранены",
          state: action.payload.state,
        };
      }
    },
    closeModal: (state) => {
      state.result = undefined;
    },
    setSavingOrderState: (
      state,
      action: PayloadAction<{ nextState: boolean }>
    ) => {
      state.savingOrder = action.payload.nextState;
    },
  },
});

export const {
  addOneItem,
  removeOneItem,
  selectOneItem,
  removeAllItemsById,
  onBlur,
  toggleModal,
  closeModal,
  resetAll,
  setItems,
  setSavingOrderState,
} = cartSlice.actions;

export const getSelectedItem = createSelector(
  (state: RootState) => state.cart.items,
  (items) => Object.entries(items).filter(([_, { count }]) => !!count)
);

export const getCartResult = createSelector(
  (state: RootState) => state.cart.result,
  (result) => result || { label: "", state: false }
);
export default cartSlice.reducer;
