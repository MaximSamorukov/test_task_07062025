import { useEffect, useState } from "react";
import type { Review } from "../../service/types";
import { ReviewItem } from "./ReviewItem";
import s from "./style.module.scss";
import apiService from "../../service";

export const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  useEffect(() => {
    apiService
      .getReviews()
      .then((i) => {
        setReviews(i);
      })
      .catch(() => setReviews([]));
  }, []);
  return (
    <div className={s.reviewsContainer}>
      {reviews.map((i) => (
        <ReviewItem key={i.id} {...i} />
      ))}
    </div>
  );
};
