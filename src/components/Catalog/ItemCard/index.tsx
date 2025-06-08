import type { OrderItem, Product } from "../../../service/types";
import { useAppDispatch, useAppSelector } from "../../../store/actions";
import {
  addOneItem,
  onBlur,
  removeOneItem,
  selectOneItem,
} from "../../../store/slices/cart";

import s from "./style.module.scss";

export const ItemCard: React.FC<Product> = (i) => {
  const dispatch = useAppDispatch();
  const currentSelectedId = useAppSelector((s) => s.cart.selectedItemId);
  const isActiveOrAddedToTheCart = useAppSelector((s) => {
    if (s.cart.selectedItemId === i.id) return true;
    if (s.cart.items[i.id]?.count > 0) return true;
    return false;
  });
  const currentItem = useAppSelector(({ cart }) => {
    const currentId = i.id;
    if (cart.items[currentId]) {
      return cart.items[currentId];
    } else {
      return { ...i, count: 0 } as OrderItem;
    }
  });
  const onClickBuyBtn = () => {
    dispatch(selectOneItem(i));
  };
  const onChangeAmount = (arg: "add" | "substract") => {
    if (i.id !== currentSelectedId) dispatch(selectOneItem(i));
    if (arg === "add") {
      dispatch(addOneItem(i));
    }
    if (arg === "substract") {
      dispatch(removeOneItem(i));
    }
  };

  const handleBlur = () => dispatch(onBlur());

  return (
    <div onBlur={handleBlur} className={s.itemContainer}>
      <img src={i.image_url} alt={i.title} className={s.itemImage} />
      <div className={s.itemTitle}>
        <span>{i.title}</span>
      </div>
      <div className={s.itemDescription}>
        <span>{i.description}</span>
      </div>
      <div className={s.itemPrice}>
        <span>{`цена: ${i.price} ₽`}</span>
      </div>
      <div className={s.itemControlContainer}>
        {isActiveOrAddedToTheCart ? (
          <div className={s.itemControlCountControlContainer}>
            <button
              onClick={() => onChangeAmount("substract")}
              className={s.itemControlCountControlPlusMinus}
            >
              <span>-</span>
            </button>
            <div className={s.itemControlCountControlCount}>
              <span>{currentItem?.count || 0}</span>
            </div>
            <button
              onClick={() => onChangeAmount("add")}
              className={s.itemControlCountControlPlusMinus}
            >
              <span>+</span>
            </button>
          </div>
        ) : (
          <button onClick={onClickBuyBtn} className={s.itemControlBuyButton}>
            Купить
          </button>
        )}
      </div>
    </div>
  );
};
