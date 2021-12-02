import { FC, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import styles from "styles/modules/ChocolateBoxes.module.css";
import { chocolateBoxes } from "../../data/chocolate-boxes";
import { ChocolateBox } from "../ChocolateBox";
import { CustomCarouselNav } from "../CustomCarouselNav";

interface ChocolateBoxesProps {}

export const ChocolateBoxes: FC<
  ChocolateBoxesProps
> = ({}: ChocolateBoxesProps) => {
  const preselectedItem = 0;

  const [selectedItem, setSelectedItem] = useState<number>(preselectedItem);

  return (
    <div id="chocolate-boxes">
      <Carousel
        autoPlay={false}
        showThumbs={false}
        showArrows={false}
        showStatus={false}
        showIndicators={false}
        className={"section " + styles.carousel}
        selectedItem={selectedItem}
      >
        {chocolateBoxes.map((chocolateBox) => {
          return (
            <ChocolateBox chocolateBox={chocolateBox} key={chocolateBox.name} />
          );
        })}
      </Carousel>
      <CustomCarouselNav
        products={chocolateBoxes}
        setSelectedItem={setSelectedItem}
      />
    </div>
  );
};
