import { useState } from "react";
import type { OrderItem } from "../../service/types";
import s from "./style.module.scss";

export const Cart = () => {
  const [items] = useState<OrderItem[]>([]);
  return (
    <div className={s.cartContainer}>
      <div className={s.cartBody}>
        <div className={s.cartBodyHeader}>Добавленные товары</div>
        <div className={s.cartBodyItems}>
          <div className={s.cartBodyItemsContainer}>
            {items.map((i) => (
              <div className={s.cartBodyItemsItem}>
                <div className={s.cartBodyItemsItemLabel}>{i.title}</div>
                <div className={s.cartBodyItemsItemCount}>{`x ${i.count}`}</div>
                <div className={s.cartBodyItemsItemPrice}>{`${i.price} ₽`}</div>
              </div>
            ))}
          </div>
        </div>
        <div className={s.cartBodyControls}>
          <input className={s.cartBodyControlsInput} />
          <button className={s.cartBodyControlsSubmit}>Заказать</button>
        </div>
      </div>
    </div>
  );
};
