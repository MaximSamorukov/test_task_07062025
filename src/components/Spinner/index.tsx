import React from "react";
import s from "./style.module.scss";
import { useAppSelector } from "../../store/actions";

export const Spinner: React.FC = () => {
  const active = useAppSelector(
    (state) => state.catalog.pending || state.cart.savingOrder
  );
  if (active) {
    return (
      <div className={s.overlay}>
        <div className={s.spinner}></div>
      </div>
    );
  }
  return null;
};
