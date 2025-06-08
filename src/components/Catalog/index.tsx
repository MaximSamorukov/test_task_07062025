import { useEffect } from "react";
import s from "./style.module.scss";
import { ItemCard } from "./ItemCard";
import { getAllItems } from "../../store/slices/catalog";
import { getCatalogByPage } from "../../store/actions/catalog";
import { useAppDispatch, useAppSelector } from "../../store/actions";

export const Catalog = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(getAllItems);
  useEffect(() => {
    dispatch(getCatalogByPage());
  }, []);
  return (
    <div className={s.catalogContainer}>
      {items.map((i) => (
        <ItemCard key={i.id} {...i} />
      ))}
    </div>
  );
};
