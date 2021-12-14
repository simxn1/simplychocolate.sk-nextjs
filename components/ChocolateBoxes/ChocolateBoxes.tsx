import { FC, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import styles from "styles/modules/ChocolateBoxes.module.css";
import { chocolateBoxes } from "data/chocolate-boxes";
import { ChocolateBox, CustomCarouselNav } from "components";
import { useRouter } from "next/router";
import { getIndexOfProductByName, paramCaseToLowerCase } from "lib/utils";
import { SectionId } from "lib/globalTypes";
import { isMobileOnly } from "react-device-detect";

interface ChocolateBoxesProps {}

export const ChocolateBoxes: FC<
  ChocolateBoxesProps
> = ({}: ChocolateBoxesProps) => {
  const router = useRouter();
  const { productName: preselectedBoxName } = router.query;

  let preselectedItem = 0;
  if (preselectedBoxName) {
    preselectedItem =
      getIndexOfProductByName(
        chocolateBoxes,
        paramCaseToLowerCase(preselectedBoxName as string)
      ) ?? 0;
  }

  const [selectedItem, setSelectedItem] = useState<number>(preselectedItem);
  const [selectedNewItem, setSelectedNewItem] = useState(false);

  return (
    <div id={SectionId.ChocolateBoxes} className={"section " + styles.carousel}>
      <Carousel
        autoPlay={false}
        showThumbs={false}
        showArrows={false}
        showStatus={false}
        showIndicators={false}
        selectedItem={selectedNewItem ? selectedItem : preselectedItem}
      >
        {chocolateBoxes.map((chocolateBox) => {
          return (
            <ChocolateBox chocolateBox={chocolateBox} key={chocolateBox.name} />
          );
        })}
      </Carousel>
      {!isMobileOnly && (
        <CustomCarouselNav
          products={chocolateBoxes}
          setSelectedItem={setSelectedItem}
          setSelectedNewItem={setSelectedNewItem}
        />
      )}
    </div>
  );
};
