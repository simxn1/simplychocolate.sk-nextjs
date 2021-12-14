import { FC, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { CustomCarouselNav, ChocolateBar } from "components";
import { chocolateBars } from "data/chocolate-bars";
import { SectionId } from "lib/globalTypes";
import { isMobileOnly } from "react-device-detect";
import { useRouter } from "next/router";
import { getIndexOfProductByName, paramCaseToLowerCase } from "lib/utils";

interface ChocolateBarsProps {}

export const ChocolateBars: FC<
  ChocolateBarsProps
> = ({}: ChocolateBarsProps) => {
  const router = useRouter();
  const { productName: preselectedBarName } = router.query;

  let preselectedItem = 0;
  if (preselectedBarName) {
    preselectedItem =
      getIndexOfProductByName(
        chocolateBars,
        paramCaseToLowerCase(preselectedBarName as string)
      ) ?? 0;
  }

  const [selectedItem, setSelectedItem] = useState<number>(preselectedItem);
  const [selectedNewItem, setSelectedNewItem] = useState(false);

  return (
    <div id={SectionId.ChocolateBars} className={"section "}>
      <Carousel
        autoPlay={false}
        showThumbs={false}
        showArrows={false}
        showStatus={false}
        showIndicators={false}
        selectedItem={selectedNewItem ? selectedItem : preselectedItem}
      >
        {chocolateBars.map((chocolateBar, index) => {
          return (
            <ChocolateBar
              chocolateBar={chocolateBar}
              index={index}
              key={chocolateBar.name}
            />
          );
        })}
      </Carousel>
      {!isMobileOnly && (
        <CustomCarouselNav
          products={chocolateBars}
          setSelectedItem={setSelectedItem}
          setSelectedNewItem={setSelectedNewItem}
        />
      )}
    </div>
  );
};
