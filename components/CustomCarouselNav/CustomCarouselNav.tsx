import React, { Dispatch, SetStateAction } from "react";
import styles from "styles/modules/CarouselNav.module.css";
import { IChocolateBox } from "data/chocolate-boxes";

interface CustomCarouselNavProps {
  products: IChocolateBox[];
  setSelectedItem: Dispatch<SetStateAction<number>>;
}

export const CustomCarouselNav = ({
  products,
  setSelectedItem,
}: CustomCarouselNavProps) => {
  return (
    <div className={styles.nav}>
      {products.map((product, index) => {
        const imgName = product.name.replaceAll(" ", "-");
        return (
          <div
            className={styles.item}
            onClick={() => setSelectedItem(index)}
            key={product.name}
          >
            <img src={`/img/carousel-nav/${imgName}.png`} alt={""} />
          </div>
        );
      })}
    </div>
  );
};
