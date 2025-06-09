import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ProductsResponse } from "../../service/types";
import apiService from "../../service";

export const getCatalogByPage = createAsyncThunk<
  ProductsResponse,
  { page?: number } | undefined
>("catalog/getItemsByPageNumber", async (data = {}) => {
  const { page = 1 } = data;

  try {
    const response = await apiService.getProducts(page);
    return response as ProductsResponse;
  } catch {
    return {} as ProductsResponse;
  }
});
