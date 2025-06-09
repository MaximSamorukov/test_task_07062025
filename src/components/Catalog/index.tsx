import { useCallback, useEffect, useRef } from "react";
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
  const total = useAppSelector((state) => state.catalog.total);
  const currentPage = useAppSelector((state) => state.catalog.page);
  const currentAmount = useAppSelector((state) => state.catalog.amount);
  const cartItems = useAppSelector((state) => state.cart.items);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(() => {
    if (total > 0 && total === items.length) return;
    const currentRealPageNumber = items.length / currentAmount || 0;
    if (currentPage === currentRealPageNumber) {
      dispatch(getCatalogByPage({ page: currentPage + 1 }));
    }
  }, [currentPage, currentAmount, items, total]);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        loadMore();
      }
    });

    const el = observerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [loadMore]);

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
      <div ref={observerRef} style={{ height: "1px" }} />
    </div>
  );
};
