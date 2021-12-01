import { Dispatch, SetStateAction } from "react";

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
