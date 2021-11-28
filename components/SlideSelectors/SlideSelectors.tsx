import React, { Dispatch, FC, SetStateAction } from "react";
import styles from "styles/modules/SlideSelectors.module.css";

interface SlideSelectorsProps {
  currentSlide: number;
  setCurrentSlide: Dispatch<SetStateAction<number>>;
  color?: string;
}

export const SlideSelectors: FC<SlideSelectorsProps> = ({
  currentSlide,
  setCurrentSlide,
  color,
}: SlideSelectorsProps) => {
  function handleNextSlide() {
    return currentSlide < 4
      ? setCurrentSlide((prevState) => prevState + 1)
      : null;
  }

  function handlePrevSlide() {
    return currentSlide > 0
      ? setCurrentSlide((prevState) => prevState - 1)
      : null;
  }

  return (
    <div className={styles.slideSelectors}>
      <button onClick={handlePrevSlide}>
        <i className="fas fa-chevron-left" style={{ color: color ?? "" }} />
      </button>
      <button onClick={handleNextSlide}>
        <i className="fas fa-chevron-right" style={{ color }} />
      </button>
    </div>
  );
};
