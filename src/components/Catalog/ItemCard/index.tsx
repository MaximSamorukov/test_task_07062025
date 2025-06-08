import { useState } from "react";
import type { Product } from "../../../service/types";
import s from "./style.module.scss";

export const ItemCard: React.FC<Product> = (i) => {
  const [itemIsActive, setItemIsActive] = useState(false);

  const onClickBuyBtn = () => {
    setItemIsActive((v) => !v);
  };
  return (
    <div className={s.itemContainer}>
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
        {itemIsActive ? (
          <div className={s.itemControlCountControlContainer}>
            <button className={s.itemControlCountControlPlusMinus}>
              <span>-</span>
            </button>
            <div className={s.itemControlCountControlCount}>
              <span>44</span>
            </div>
            <button className={s.itemControlCountControlPlusMinus}>
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
