import { useEffect } from "react";
import s from "./style.module.scss";
import { ItemCard } from "./ItemCard";
import { getAllItems } from "../../store/slices/catalog";
import { getCatalogByPage } from "../../store/actions/catalog";
import { useAppDispatch, useAppSelector } from "../../store/actions";
import { localStorageService } from "../../service/localStorageService";
import { setItems } from "../../store/slices/cart";

export const Catalog = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(getAllItems);
  const cartItems = useAppSelector((state) => state.cart.items);
  useEffect(() => {
    dispatch(getCatalogByPage());
  }, []);
  useEffect(() => {
    if (!Object.keys(cartItems).length) {
      const savedCartItems = localStorageService.getOrderItems();
      dispatch(setItems(savedCartItems));
    }
  }, []);
  return (
    <div className={s.catalogContainer}>
      {items.map((i) => (
        <ItemCard key={i.id} {...i} />
      ))}
    </div>
  );
};
