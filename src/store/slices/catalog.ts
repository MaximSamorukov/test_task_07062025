import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import type { Product, ProductsResponse } from "../../service/types";
import { getCatalogByPage } from "../actions/catalog";

interface CatalogState {
  items: Product[];
  page: number;
  amount: number;
  total: number;
  pending: boolean;
  selectedItem: (Product & { amount?: number }) | null;
  requestCount: number;
}

const initialState: CatalogState = {
  items: [],
  page: 0,
  amount: 0,
  total: 0,
  pending: false,
  selectedItem: null,
  requestCount: 0,
};

export const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    selectItem: (state, action: PayloadAction<Product>) => {
      state.selectedItem = action.payload;
    },
    addPieceOfSelectedItem: (state) => {
      if (state.selectedItem) {
        state.selectedItem.amount = (state.selectedItem?.amount || 0) + 1;
      }
    },
    substractPieceOfSelectedItem: (state) => {
      if (state.selectedItem) {
        if ((state.selectedItem.amount || 0) <= 0) return;
        state.selectedItem.amount = (state.selectedItem?.amount || 0) - 1;
      }
    },
    setAll: (state, action: PayloadAction<ProductsResponse>) => {
      state.items = action.payload.items;
      state.page = action.payload.page;
      state.amount = action.payload.amount;
      state.total = action.payload.total;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getCatalogByPage.fulfilled, (state, data) => {
        const { payload } = data;
        state.items = [...state.items, ...payload.items];
        state.page = payload.page;
        state.amount = payload.amount;
        state.total = payload.total;
        state.pending = false;
        state.requestCount = 0;
      })
      .addCase(getCatalogByPage.rejected, (state) => {
        state.items = [];
        state.page = 0;
        state.amount = 0;
        state.total = 0;
        state.pending = false;
        state.requestCount = state.requestCount + 1;
      })
      .addCase(getCatalogByPage.pending, (state) => {
        state.pending = true;
      });
  },
});

export const {
  setAll,
  selectItem,
  addPieceOfSelectedItem,
  substractPieceOfSelectedItem,
} = catalogSlice.actions;

export const getAllItems = (state: RootState) => state.catalog.items;
export const getPage = (state: RootState) => state.catalog.page;
export const getTotalAmount = (state: RootState) => state.catalog.total;
export const makeGetCartItemById = (id: number) =>
  createSelector(
    (state: RootState) => state.cart.items[id],
    (item) => (item ? { ...item } : undefined)
  );
export default catalogSlice.reducer;
