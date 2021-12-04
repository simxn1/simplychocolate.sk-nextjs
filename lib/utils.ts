import { Dispatch, SetStateAction } from "react";
import { ProductType } from "lib/globalTypes";

export const setAndSaveToLocalStorage = (
  newValue: any,
  setFuncForValue: Dispatch<SetStateAction<number[]>> | null,
  key: CartContextLocalStorageKeys
) => {
  setFuncForValue && setFuncForValue(newValue);

  const newValueSerialized = JSON.stringify(
    typeof newValue === "function" ? newValue() : newValue
  );
  localStorage.setItem(key, newValueSerialized);

  localStorage.setItem("lastUpdated", String(Date.now()));
};

export enum CartContextLocalStorageKeys {
  ChocolateBoxesQuantity = "chocolateBoxesQuantity",
  ChocolateBarsQuantity = "chocolateBarsQuantity",
}

export const titleCaseToParamCase = (string: string) => {
  return string.replace(/\s+/g, "-").toLowerCase();
};

export const paramCaseToLowerCase = (string: string) => {
  return string.replace(/-/g, " ").toLowerCase();
};

export const stringifyPrice = (price: number): string => {
  return price.toString().slice(0, 2) + "," + price.toString().slice(2);
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
