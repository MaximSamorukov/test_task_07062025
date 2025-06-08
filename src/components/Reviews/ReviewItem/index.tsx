import React from "react";
import type { Review } from "../../../service/types";
import s from "./style.module.scss";

export const ReviewItem: React.FC<Review> = ({ id, text }) => {
  return (
    <div className={s.reviewItemContainer}>
      <div className={s.reviewItemHeader}>{`Отзыв ${id}`}</div>
      <div
        className={s.reviewItemContent}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  );
};
