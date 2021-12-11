import {
  BoxContent,
  DeliveryInfoForm,
  DiscountCode,
  PaymentMethod,
  ShippingMethod,
} from "lib/globalTypes";

export async function fetchAPI<BodyType, ResType>(
  endpoint: ApiEndpoint,
  body?: BodyType,
  method?: "GET" | "POST"
): Promise<ResType> {
  const res = await fetch(process.env.NEXT_PUBLIC_ORIGIN + "/api/" + endpoint, {
    method: method ? method : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data: ResType = await res.json();

  return data;
}

export enum ApiEndpoint {
  DiscountCodes = "discount-codes",
  CheckSelectedPlace = "check-selected-place",
  UpdateOrder = "update-order",
  Checkout = "checkout",
  CheckoutCash = "checkout-cash",
}

export async function getDiscountCodes(): Promise<DiscountCode[]> {
  const data = await fetchAPI<null, { discountCodes: DiscountCode[] }>(
    ApiEndpoint.DiscountCodes,
    null,
    "GET"
  );
  const { discountCodes } = data;

  return discountCodes;
}

type DeliveryPlaceBody = { order_id: string };
type DeliveryPlaceData = { is_selected: 1 | 0; id?: string };

export async function checkDeliveryPointSelectedPlace(
  orderId: string
): Promise<DeliveryPlaceData> {
  const data = await fetchAPI<DeliveryPlaceBody, DeliveryPlaceData>(
    ApiEndpoint.CheckSelectedPlace,
    { order_id: orderId }
  );

  return data;
}

export type CheckoutData = {
  boxContent?: BoxContent;
  totalBoxQuantity?: number;
  secondBoxContent?: number[];
  price?: number;
  billingInfo?: DeliveryInfoForm;
  deliveryInfo?: DeliveryInfoForm;
  paymentMethod?: PaymentMethod;
  shippingMethod?: ShippingMethod;
  afterDiscount?: boolean;
  orderNumber?: string;
  discountCode?: string | null;
  placeSelectedID?: string;
  paymentId?: number | null;
};

type OnlineCheckoutData = { signed: string };

export async function fetchOnlineCheckout(
  checkoutData: CheckoutData
): Promise<string> {
  const data = await fetchAPI<CheckoutData, OnlineCheckoutData>(
    ApiEndpoint.Checkout,
    checkoutData
  );

  const { signed } = data;

  return signed;
}

type CashCheckoutData = { url: string };

export async function fetchCashCheckout(
  checkoutData: CheckoutData
): Promise<string> {
  const data = await fetchAPI<CheckoutData, CashCheckoutData>(
    ApiEndpoint.CheckoutCash,
    checkoutData
  );

  const { url } = data;

  return url;
}

export type PaymentDetails = {
  CID?: string;
  TYPE?: string;
  AMNT?: string;
  CURR?: string;
  VS?: string;
  RESULT?: string;
  SIGN?: string;
};

export async function updateOrder(paymentDetails: PaymentDetails) {
  const data = await fetchAPI<PaymentDetails, { VALID: boolean }>(
    ApiEndpoint.UpdateOrder,
    paymentDetails
  );

  const { VALID } = data;

  return VALID;
}
