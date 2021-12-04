import { FC, useState } from "react";
import {
  boxSizes,
  chocolateBars,
  IChocolateBar,
  Size,
} from "data/chocolate-bars";
import { Mobile } from "./variant/Mobile";
import { useCartContext } from "context/CartContext";
import {
  CartContextLocalStorageKeys,
  setAndSaveToLocalStorage,
} from "lib/utils";
import { ChocolateBarCart } from "components/ChocolateBarCart";
import { ProductNutrition } from "components/ProductNutrition";
import { isMobileOnly } from "react-device-detect";
import { Desktop } from "./variant/Desktop";

interface ChocolateBarProps {
  chocolateBar: IChocolateBar;
  index: number;
}

export interface ChocolateBarVariantProps {
  chocolateBar: IChocolateBar;
  toggleIsCartOpen: () => void;
  toggleIsNutritionOpen: () => void;
}

export const ChocolateBar: FC<ChocolateBarProps> = ({
  chocolateBar,
  index,
}: ChocolateBarProps) => {
  const { totalChocolateBarsQuanity, setChocolateBarsQuantity } =
    useCartContext();

  const { nutritionData, nutritionDesc } = chocolateBar;

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isNutritionOpen, setIsNutritionOpen] = useState<boolean>(false);
  const [isHintVisible, setIsHintVisible] = useState<boolean>(false);

  const toggleIsCartOpen = () => {
    setIsCartOpen((prevValue) => {
      return !prevValue;
    });
  };

  const toggleIsNutritionOpen = () => {
    setIsNutritionOpen((prevValue) => {
      return !prevValue;
    });
  };

  const handleNewChocolateBarSize = (selectedSize: Size) => {
    setIsHintVisible(false);

    const newChocolateBarsQuantity = chocolateBars.map(() => 0);
    newChocolateBarsQuantity[index] =
      boxSizes.find((boxSize) => boxSize.size === selectedSize)?.barCount ?? 0;

    setAndSaveToLocalStorage(
      newChocolateBarsQuantity,
      setChocolateBarsQuantity,
      CartContextLocalStorageKeys.ChocolateBarsQuantity
    );
  };

  const handleCheckout = () => {
    if (!totalChocolateBarsQuanity) {
      setIsHintVisible(true);
    }
  };

  const handleMix = () => {};

  return (
    <>
      {isMobileOnly ? (
        <Mobile
          chocolateBar={chocolateBar}
          toggleIsCartOpen={toggleIsCartOpen}
          toggleIsNutritionOpen={toggleIsNutritionOpen}
        />
      ) : (
        <Desktop
          chocolateBar={chocolateBar}
          toggleIsCartOpen={toggleIsCartOpen}
          toggleIsNutritionOpen={toggleIsNutritionOpen}
        />
      )}
      {isCartOpen && (
        <ChocolateBarCart
          toggleIsCartOpen={toggleIsCartOpen}
          handleNewChocolateBarSize={handleNewChocolateBarSize}
          isHintVisible={isHintVisible}
          handleCheckout={handleCheckout}
          handleMix={handleMix}
        />
      )}
      {isNutritionOpen && (
        <ProductNutrition
          nutritionData={nutritionData}
          nutritionDesc={nutritionDesc}
          toggleIsNutritionOpen={toggleIsNutritionOpen}
          isChocolateBox={false}
        />
      )}
    </>
  );
};
