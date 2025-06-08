import { useEffect, useState } from "react";
import s from "./style.module.scss";
import type { Product } from "../../service/types";
import apiService from "../../service";
import { ItemCard } from "./ItemCard";

export const Catalog = () => {
  const [items, setItems] = useState<Product[]>([]);
  useEffect(() => {
    apiService
      .getProducts()
      .then((i) => {
        setItems(i.items);
      })
      .catch(() => setItems([]));
  }, []);
  return (
    <div className={s.catalogContainer}>
      {items.map((i) => (
        <ItemCard key={i.id} {...i} />
      ))}
    </div>
  );
};
