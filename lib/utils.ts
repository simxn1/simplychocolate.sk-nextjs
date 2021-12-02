import { Dispatch, SetStateAction } from "react";
import { IChocolateBox } from "data/chocolate-boxes";
import { IChocolateBar } from "data/chocolate-bars";

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

type Product = IChocolateBox | IChocolateBar;

export const getIndexOfProductByName = (
  products: Product[],
  productNameInLowerCase: string
): number | null => {
  const productFound = products.find(
    (product: Product) => product.name === productNameInLowerCase
  );

  if (productFound) {
    return products.indexOf(productFound);
  }

  return null;
};
