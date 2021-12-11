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
  errors?: any;
}

export interface DiscountCode {
  name: string;
}

export enum PaymentMethod {
  Online = "online",
  Cash = "cash",
}

export enum ShippingMethod {
  Courier = "courier",
  CzechRepublic = "czechRepublic",
  PickUpAtStore = "pickUpAtStore",
  DeliveryPoint = "deliveryPoint",
}

export interface IOrder {
  createdAt: Date;
  completedAt: Date;
  completionStatus: boolean;
  paymentStatus: string;
  paymentId: string | number;
  orderDetails: OrderDetails;
}

export interface OrderDetails {
  boxContent: BoxContent;
  totalBoxQuantity: 6 | 12 | 24 | 30;
  secondBoxContent: number[];
  billingInfo: DeliveryInfoForm;
  deliveryInfo: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    zipCode: string;
  };
  orderNumber: string;
  discountCode: string;
  afterDiscount: boolean;
  shippingMethod: ShippingMethod;
  paymentMethod: PaymentMethod;
  price: number;
  placeSelectedID: string;
}

export interface BoxContent {
  grainyBilly?: number;
  crispyCarrie?: number;
  grainySue?: number;
  fitFiona?: number;
  richArnold?: number;
  speedyTom?: number;
}
