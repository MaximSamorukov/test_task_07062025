import { useState } from "react";
import cn from "classnames";
import { IMaskInput } from "react-imask";
import type { Product } from "../../service/types";
import s from "./style.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/actions";
import {
  getSelectedItem,
  removeAllItemsById,
  resetAll,
  setSavingOrderState,
  toggleModal,
} from "../../store/slices/cart";
import apiService from "../../service";
import { localStorageService } from "../../service/localStorageService";

export const Cart = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector(getSelectedItem);
  const removePosition = (item: Product) => {
    dispatch(removeAllItemsById(item));
  };
  const submitButtonIsDisabled =
    !selectedItems.length || phoneNumber.length < 11;

  const submitOrder = () => {
    dispatch(setSavingOrderState({ nextState: true }));
    apiService
      .submitOrder({
        phone: phoneNumber,
        cart: selectedItems.map(([_, i]) => ({ id: i.id, quantity: i.count })),
      })
      .then((result) => {
        dispatch(setSavingOrderState({ nextState: false }));

        if (!result.error) {
          dispatch(resetAll());
          localStorageService.clearOrderItems();
        }
        dispatch(toggleModal({ ...result, state: true }));
      })
      .catch(() => {
        dispatch(setSavingOrderState({ nextState: false }));
        dispatch(toggleModal({ error: "error", success: 0, state: true }));
      });
  };
  return (
    <div className={s.cartContainer}>
      <div className={s.cartBody}>
        <div className={s.cartBodyHeader}>Добавленные товары</div>
        <div
          className={cn(s.cartBodyItems, !selectedItems.length && s.centered)}
        >
          <div className={s.cartBodyItemsContainer}>
            {!selectedItems.length && (
              <div className={s.emptyLabel}>товары не добавлены</div>
            )}
            {selectedItems.map(([_, i]) => (
              <div key={i.id} className={s.cartBodyItemsItem}>
                <div className={s.cartBodyItemsItemLabel}>{i.title}</div>
                <div className={s.cartBodyItemsItemCount}>{`x ${i.count}`}</div>
                <div className={s.cartBodyItemsItemPrice}>{`${i.price} ₽`}</div>
                <button
                  onClick={() => removePosition(i)}
                  className={s.cartBodyItemsItemRemove}
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className={s.cartBodyControls}>
          <IMaskInput
            className={s.cartBodyControlsInput}
            mask="+{7}(000)000-00-00"
            lazy={false}
            placeholder="+7(___)___-__-__"
            onAccept={(_value, mask) => {
              setPhoneNumber(mask.unmaskedValue);
            }}
          />
          <button
            onClick={submitOrder}
            disabled={submitButtonIsDisabled}
            className={cn(
              s.cartBodyControlsSubmit,
              submitButtonIsDisabled && s.cartBodyControlsSubmitDisabled
            )}
          >
            Заказать
          </button>
        </div>
      </div>
    </div>
  );
};
