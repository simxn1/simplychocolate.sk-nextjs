import { IChocolateBox } from "data/chocolate-boxes";
import { IChocolateBar } from "data/chocolate-bars";

export interface Product {
  name: string;
  color: string;
  firstLine: string;
  secondLine: string;
  nutritionData: string[];
  nutritionDesc: string;
  isSoldOut?: boolean;
  isHalfDiscounted?: boolean;
}

export type ProductType = IChocolateBox | IChocolateBar;

export enum SectionId {
  ChocolateBoxes = "chocolate-boxes",
  ChocolateBars = "chocolate-bars",
}

export enum CartContextLocalStorageKeys {
  ChocolateBoxesQuantity = "chocolateBoxesQuantity",
  ChocolateBarsQuantity = "chocolateBarsQuantity",
  SelectedChocolateBarsBoxSize = "selectedChocolateBarsBoxSize",
  TotalPrice = "totalPrice",
}

export interface DeliveryInfoForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  zipCode: string;
  errors?: Record<string, any>;
}
