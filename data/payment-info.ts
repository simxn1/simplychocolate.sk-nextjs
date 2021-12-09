import { PaymentMethod, ShippingMethod } from "lib/globalTypes";

export type Method<Type> = {
  name: Type;
  price: number;
  label: string;
};

export const paymentMethods: Method<PaymentMethod>[] = [
  { name: PaymentMethod.Online, price: 0, label: "Online platba" },
  { name: PaymentMethod.Cash, price: 100, label: "Dobierka" },
];

export const shippingMethods: Method<ShippingMethod>[] = [
  {
    name: ShippingMethod.Courier,
    price: 450,
    label: "Kuriérom k tebe domov - Slovensko",
  },
  {
    name: ShippingMethod.CzechRepublic,
    price: 210,
    label: "Doručenie do Českej republiky",
  },
  {
    name: ShippingMethod.PickUpAtStore,
    price: 0,
    label: "Osobný odber - Jarabinkova 2/C, Bratislava",
  },
  {
    name: ShippingMethod.DeliveryPoint,
    price: 400,
    label: "Odberné miesto - Slovensko",
  },
];
