import { FC } from "react";
import { Carousel } from "react-responsive-carousel";
import styles from "styles/modules/ChocolateBoxes.module.css";
import { chocolateBoxes } from "../../data/chocolate-boxes";
import { ChocolateBox } from "../ChocolateBox";

interface ChocolateBoxesProps {}

export const ChocolateBoxes: FC<
  ChocolateBoxesProps
> = ({}: ChocolateBoxesProps) => {
  return (
    <Carousel
      autoPlay={false}
      showThumbs={false}
      showArrows={false}
      showStatus={false}
      className={"section " + styles.carousel}
    >
      {chocolateBoxes.map((chocolateBox) => {
        return (
          <ChocolateBox chocolateBox={chocolateBox} key={chocolateBox.name} />
        );
      })}
    </Carousel>
  );
};
