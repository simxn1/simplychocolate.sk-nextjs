import { FC, useState } from "react";
import {
  boxSizes,
  chocolateBars,
  IChocolateBar,
  Size,
} from "data/chocolate-bars";
import { Mobile } from "./variant/Mobile";
import { useCartContext } from "context/CartContext";
import { setAndSaveToLocalStorage } from "lib/utils";
import { ChocolateBarCart, ProductNutrition } from "components";
import { isMobileOnly } from "react-device-detect";
import { Desktop } from "./variant/Desktop";
import { CartContextLocalStorageKeys } from "lib/globalTypes";
import { useRouter } from "next/router";

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
  const router = useRouter();

  const {
    selectedChocolateBarsBoxSize,
    setSelectedChocolateBarsBoxSize,
    setChocolateBarsQuantity,
  } = useCartContext();

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

  const handleNewChocolateBarSize = (newSelectedSize: Size) => {
    setIsHintVisible(false);

    const newChocolateBarsQuantity = chocolateBars.map(() => 0);
    newChocolateBarsQuantity[index] =
      boxSizes.find((boxSize) => boxSize.size === newSelectedSize)?.barCount ??
      0;

    setAndSaveToLocalStorage<Size | null>(
      newSelectedSize,
      setSelectedChocolateBarsBoxSize,
      CartContextLocalStorageKeys.SelectedChocolateBarsBoxSize
    );

    setAndSaveToLocalStorage<number[]>(
      newChocolateBarsQuantity,
      setChocolateBarsQuantity,
      CartContextLocalStorageKeys.ChocolateBarsQuantity
    );
  };

  const handleCheckout = () => {
    if (!selectedChocolateBarsBoxSize) {
      setIsHintVisible(true);
    } else {
      router.push("/cart-check");
    }
  };

  const handleMix = () => {
    router.push("/mix");
  };

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
