import { Dispatch, SetStateAction } from "react";
import { CartContextLocalStorageKeys, ProductType } from "lib/globalTypes";
import { BoxSize, boxSizes, chocolateBars, Size } from "data/chocolate-bars";
import { chocolateBoxes } from "data/chocolate-boxes";

export function setAndSaveToLocalStorage<StateType>(
  newValue: StateType,
  setFuncForValue: Dispatch<SetStateAction<StateType>> | undefined,
  key: CartContextLocalStorageKeys
) {
  setFuncForValue && setFuncForValue(newValue);

  const newValueSerialized = JSON.stringify(newValue);
  localStorage.setItem(key, newValueSerialized);

  localStorage.setItem("lastUpdated", String(Date.now()));
}

export const titleCaseToParamCase = (string: string): string => {
  return string.replace(/\s+/g, "-").toLowerCase();
};

export const paramCaseToLowerCase = (string: string): string => {
  return string.replace(/-/g, " ").toLowerCase();
};

export const stringifyPrice = (price: number): string => {
  return (price / 100).toFixed(2).replace(".", ",");
};

export const getIndexOfProductByName = (
  products: ProductType[],
  productNameInLowerCase: string
): number | null => {
  const productFound = products.find(
    (product: ProductType) => product.name === productNameInLowerCase
  );

  if (productFound) {
    return products.indexOf(productFound);
  }

  return null;
};

export const calcOneBarPriceForBoxSize = (boxSizeSelected: BoxSize): number => {
  return boxSizeSelected.price / boxSizeSelected.barCount;
};

export const calcProductHalfPrice = (barPrice: number): number => {
  return barPrice / 2 > 125 ? barPrice / 2 : 125;
};

export const isProductDiscountedByHalf = (
  products: ProductType[],
  productIndex: number
): boolean | undefined => {
  return products[productIndex].isHalfDiscounted;
};

export const calculateChocolateBarsPrice = (
  size: Size,
  chocolateBarsQuantity: number[]
): number => {
  const boxSizeSelected = boxSizes.find((boxSize) => boxSize.size === size);

  if (boxSizeSelected) {
    const oneBarPrice = calcOneBarPriceForBoxSize(boxSizeSelected);

    let totalChocolateBarsPrice = 0;
    for (let i = 0; i < chocolateBarsQuantity.length; i++) {
      if (isProductDiscountedByHalf(chocolateBars, i)) {
        totalChocolateBarsPrice +=
          chocolateBarsQuantity[i] * calcProductHalfPrice(oneBarPrice);
      } else {
        totalChocolateBarsPrice += chocolateBarsQuantity[i] * oneBarPrice;
      }
    }

    return totalChocolateBarsPrice;
  }

  return 0;
};

export const calculateChocolateBoxesPrice = (
  chocolateBoxesQuantity: number[]
) => {
  let totalProductsSecondPrice = 0;

  for (let i = 0; i < chocolateBoxesQuantity.length; i++) {
    const thisProductPrice = isProductDiscountedByHalf(chocolateBoxes, i)
      ? chocolateBoxesQuantity[i] *
        calcProductHalfPrice(chocolateBoxes[i].price)
      : chocolateBoxesQuantity[i] * chocolateBoxes[i].price;
    totalProductsSecondPrice += thisProductPrice;
  }

  return totalProductsSecondPrice;
};

export const calculateTotalPrice = (
  selectedChocolateBarsBoxSize: Size | null,
  chocolateBarsQuantity: number[],
  chocolateBoxesQuantity: number[]
) => {
  let newTotalPrice = 0;

  if (selectedChocolateBarsBoxSize) {
    newTotalPrice += calculateChocolateBarsPrice(
      selectedChocolateBarsBoxSize,
      chocolateBarsQuantity
    );
  }

  newTotalPrice += calculateChocolateBoxesPrice(chocolateBoxesQuantity);

  return newTotalPrice;
};
