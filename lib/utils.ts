import { Dispatch, SetStateAction } from "react";
import {
  CartContextLocalStorageKeys,
  OrderDetails,
  ProductType,
} from "lib/globalTypes";
import { BoxSize, boxSizes, chocolateBars, Size } from "data/chocolate-bars";
import { chocolateBoxes } from "data/chocolate-boxes";
import { CURRENCY, PAYMENT_TYPE } from "lib/constants";
import crypto from "crypto";

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
  return convertToTruePrice(price).toFixed(2).replace(".", ",");
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

export const capitalize = (str: string): string => {
  return str.replace(/(?:^|\s|["'([{])+\S/g, (match) => match.toUpperCase());
};

export const generateOrderId = (): string => {
  let now = Date.now().toString(); // 13 char number
  // pad with extra random digit
  now += now + Math.floor(Math.random() * 10);
  // format
  const orderId = [now.slice(0, 4), now.slice(4, 10), now.slice(10, 14)].join(
    "-"
  );
  return orderId;
};

export const toCamelCase = (string: string): string =>
  string.replace(/\s+(.)/g, (match: string, group: string) =>
    group.toUpperCase()
  );

export const orderNumberStringToBesteronVs = (
  orderNumberString: string
): number => {
  return parseInt(orderNumberString.replace(/-/g, "").substring(0, 9));
};

export const convertToTruePrice = (price: number): number => {
  return price / 100;
};

export const sanitizeDiscountCode = (discountCode: string): string => {
  return discountCode.toUpperCase().replace(/[0-9]/g, "");
};

export const chocolateBarBoxSize = {
  6: "S",
  12: "M",
  24: "L",
  30: "XL",
};

export function getPaymentData(
  totalPrice: number,
  signed: string,
  paymentId: number
) {
  console.log({
    cid: process.env.NEXT_PUBLIC_BESTERON_CID,
    amnt: totalPrice ? stringifyPrice(totalPrice).replace(",", ".") : "",
    vs: paymentId,
    curr: CURRENCY,
    ru: process.env.NEXT_PUBLIC_ORIGIN + "/paid",
    sign: signed,
    language: "sk",
    paymentmethod: PAYMENT_TYPE,
  });
  return {
    cid: process.env.NEXT_PUBLIC_BESTERON_CID,
    amnt: totalPrice ? stringifyPrice(totalPrice).replace(",", ".") : "",
    vs: paymentId,
    curr: CURRENCY,
    ru: process.env.NEXT_PUBLIC_ORIGIN + "/paid",
    sign: signed,
    language: "sk",
    paymentmethod: PAYMENT_TYPE,
  };
}

export const orderNumberStringToNumber = (
  orderNumberString: string
): number => {
  return parseInt(orderNumberString.replace(/-/g, ""));
};

export const orderNumberStringToPaymentId = (
  orderNumberString: string
): number => {
  return parseInt(orderNumberString.replace(/-/g, "").substring(0, 9));
};

export const camelCaseToSentenceCase = (camelCaseString: string): string => {
  const result = camelCaseString.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export const reverseString = (string: string): string => {
  return [...string].reverse().join("");
};

export const formatPrice = (price: any) => {
  return reverseString(
    reverseString(price.toString()).slice(0, 2) +
      "," +
      reverseString(price.toString()).slice(2)
  );
};

export const getBesteronStringFromOrderDetails = (
  orderDetails: OrderDetails
) => {
  const amount = convertToTruePrice(orderDetails.price).toFixed(2);
  const vs = orderNumberStringToPaymentId(orderDetails.orderNumber);
  const returnUrl = process.env.NEXT_PUBLIC_ORIGIN + "/paid";

  return `${process.env.NEXT_PUBLIC_BESTERON_CID}${PAYMENT_TYPE}${amount}${CURRENCY}${vs}${returnUrl}`;
};

export const getBesteronStringFromPaymentDetails = (paymentDetails: {
  TYPE: string;
  AMNT: string | number;
  VS: string | number;
  RESULT: string;
}) => {
  const { TYPE, AMNT, VS, RESULT } = paymentDetails;

  return `${process.env.NEXT_PUBLIC_BESTERON_CID}${TYPE}${AMNT}${CURRENCY}${VS}${RESULT}`;
};

export const signBesteronString = (rawString: string) => {
  const step2 = crypto.createHash("sha1").update(rawString).digest("hex");
  const key = process.env.BESTERON_KEY ?? "";

  const keyBuffer = Buffer.from(key, "hex");
  const dataBuffer = Buffer.from(step2.substring(0, 32), "hex");

  const cipher = crypto.createCipheriv("aes-256-ecb", keyBuffer, "");
  cipher.setAutoPadding(false);

  const step3 = cipher.update(dataBuffer);

  const sign = step3.toString("hex").toUpperCase();

  return sign;
};

export const calculatePriceAfterDiscount = (
  priceBefore: number,
  discountPercent: number
): number => {
  return (priceBefore / 100) * (100 - discountPercent);
};

export const calculatePriceBeforeDiscount = (
  priceAfter: number,
  discountPercent: number
): number => {
  const toSubstractFromOne = discountPercent / 100;
  return priceAfter / (1 - toSubstractFromOne);
};

export const calculateDiscountValueForPrice = (
  priceBefore: number,
  discountPercent: number
): number => {
  const priceAfter = calculatePriceAfterDiscount(priceBefore, discountPercent);
  return priceBefore - priceAfter;
};

export const removeVat = (price: number): number => {
  return price / 1.2;
};
