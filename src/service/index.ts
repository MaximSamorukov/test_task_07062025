import axios, { AxiosResponse } from "axios";
import type {
  OrderRequest,
  OrderResponse,
  ProductsResponse,
  Review,
} from "./types";

const API_BASE_URL = "http://o-complex.com:1337";

class ApiService {
  async getReviews(): Promise<Review[]> {
    try {
      const response: AxiosResponse<Review[]> = await axios.get(
        `${API_BASE_URL}/reviews`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching reviews:", error);
      throw error;
    }
  }

  async getProducts(
    page: number = 1,
    pageSize: number = 20
  ): Promise<ProductsResponse> {
    try {
      const response: AxiosResponse<ProductsResponse> = await axios.get(
        `${API_BASE_URL}/products`,
        {
          params: {
            page,
            page_size: pageSize,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }

  async submitOrder(orderData: OrderRequest): Promise<OrderResponse> {
    try {
      const response: AxiosResponse<OrderResponse> = await axios.post(
        `${API_BASE_URL}/order`,
        orderData
      );
      return response.data;
    } catch (error) {
      console.error("Error submitting order:", error);
      throw error;
    }
  }
}

const apiService = new ApiService();
export default apiService;
