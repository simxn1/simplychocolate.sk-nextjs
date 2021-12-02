import React, { Dispatch, SetStateAction } from "react";
import styles from "styles/modules/CarouselNav.module.css";
import { IChocolateBox } from "data/chocolate-boxes";

interface CustomCarouselNavProps {
  products: IChocolateBox[];
  setSelectedItem: Dispatch<SetStateAction<number>>;
  setSelectedNewItem: Dispatch<SetStateAction<boolean>>;
}

export const CustomCarouselNav = ({
  products,
  setSelectedItem,
  setSelectedNewItem,
}: CustomCarouselNavProps) => {
  const handleSelect = (index: number) => {
    setSelectedItem(index);
    setSelectedNewItem(true);
  };

  return (
    <div className={styles.nav}>
      {products.map((product, index) => {
        const imgName = product.name.replaceAll(" ", "-");
        return (
          <div
            className={styles.item}
            onClick={() => handleSelect(index)}
            key={product.name}
          >
            <img src={`/img/carousel-nav/${imgName}.png`} alt={""} />
          </div>
        );
      })}
    </div>
  );
};