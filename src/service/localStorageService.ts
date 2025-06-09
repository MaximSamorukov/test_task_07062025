import type { OrderItem } from "./types";

const STORAGE_KEY = "orderItems";

export const localStorageService = {
  saveOrderItems(items: OrderItem[]) {
    try {
      const json = JSON.stringify(items);
      localStorage.setItem(STORAGE_KEY, json);
    } catch (err) {
      console.error("Ошибка при сохранении orderItems в localStorage", err);
    }
  },

  getOrderItems(): OrderItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? (JSON.parse(data) as OrderItem[]) : [];
    } catch (err) {
      console.error("Ошибка при чтении orderItems из localStorage", err);
      return [];
    }
  },

  clearOrderItems() {
    localStorage.removeItem(STORAGE_KEY);
  },
};
