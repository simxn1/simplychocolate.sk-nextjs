import React from "react";
import styles from "styles/modules/ProductNutritionButton.module.css";

interface Props {
  position?: "absolute" | "relative" | "static";
  top?: string;
  left?: string;
  fontSize: string;
  handleClick: () => void;
}

export const ProductNutritionButton = ({
  position,
  fontSize,
  left,
  top,
  handleClick,
}: Props) => {
  return (
    <button
      style={{
        position: position ?? "absolute",
        top,
        left,
        fontSize,
      }}
      className={styles.button}
      onClick={handleClick}
    >
      zloženie
    </button>
  );
};
