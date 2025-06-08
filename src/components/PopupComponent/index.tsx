import Popup from "reactjs-popup";
import { useAppDispatch, useAppSelector } from "../../store/actions";
import { closeModal } from "../../store/slices/cart";
import s from "./style.module.scss";

export const PopupComponent = () => {
  const { label, state } = useAppSelector(
    (s) =>
      s.cart.result || {
        label: "",
        state: false,
      }
  );
  const dispatch = useAppDispatch();

  const closeModalHandler = () => dispatch(closeModal());
  return (
    <Popup open={state} closeOnDocumentClick onClose={closeModalHandler}>
      <div className={s.modal}>
        <div className={s.modalLabel}>{label}</div>
        <button onClick={closeModalHandler} className={s.modalBtn}>
          Ok
        </button>
      </div>
    </Popup>
  );
};
