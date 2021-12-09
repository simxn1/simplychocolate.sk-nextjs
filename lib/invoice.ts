import { connectDB } from "middleware/db";
import { Order } from "models/order.model";
import { paymentMethods, shippingMethods } from "data/payment-info";
import { IOrder, PaymentMethod, ShippingMethod } from "lib/globalTypes";
import { capitalize, chocolateBarBoxSize, convertToTruePrice } from "lib/utils";
import { chocolateBoxes } from "data/chocolate-boxes";
import {
  calculateDiscountValueForPrice,
  calculatePriceAfterDiscount,
  calculatePriceBeforeDiscount,
  removeVat,
} from "lib/utils";
import { DISCOUNT_PERCENT, VAT } from "lib/constants";

export const createInvoice = async (paymentId: number) => {
  await connectDB();
  console.log("createInvoice paymentId => ", paymentId);

  const orderFound: IOrder = await Order.findOne({ paymentId: paymentId });
  const orderDetails = orderFound.orderDetails;

  const dueDate = new Date(orderFound.createdAt);
  dueDate.setDate(dueDate.getDate() + 14);

  const paymentMethodDetails = paymentMethods.find(
    (paymentMethod) => paymentMethod.name === orderDetails.paymentMethod
  );

  const shippingMethodDetails = shippingMethods.find(
    (shippingMethod) => shippingMethod.name === orderDetails.shippingMethod
  );

  const paymentItem = createPaymentMethodItem(orderDetails.paymentMethod);
  const shippingItem = createShippingMethodItem(orderDetails.shippingMethod);

  let chocolateBoxItems = [];
  let chocolateBoxesTotalPrice = 0.0;
  if (orderDetails.secondBoxContent) {
    for (let i = 0; i < orderDetails.secondBoxContent.length; i++) {
      const thisBoxQuantity = orderDetails.secondBoxContent[i];
      const thisBoxPrice = convertToTruePrice(chocolateBoxes[i].price);

      if (thisBoxQuantity) {
        const totalPriceForThisProduct = chocolateBoxes[i].isHalfDiscounted
          ? thisBoxQuantity * (thisBoxPrice / 2)
          : thisBoxQuantity * thisBoxPrice;

        chocolateBoxItems.push({
          name: capitalize(chocolateBoxes[i].name),
          description:
            chocolateBoxes[i].pieces +
            " kusov zmiešaných čokoládových bonbónov rôznych chutí.",
          count: thisBoxQuantity,
          measureType: "ks",
          totalPriceWithVat: totalPriceForThisProduct.toString(),
          vat: VAT,
          hasDiscount: orderDetails.afterDiscount,
          discountName: orderDetails.afterDiscount ? "Zľavový kód" : null,
          discountPercent: orderDetails.afterDiscount ? DISCOUNT_PERCENT : null,
          discountValue: orderDetails.afterDiscount
            ? calculateDiscountValueForPrice(
                removeVat(thisBoxPrice),
                DISCOUNT_PERCENT
              )
            : null,
          typeId: 1,
        });

        chocolateBoxesTotalPrice += orderDetails.afterDiscount
          ? calculatePriceAfterDiscount(
              totalPriceForThisProduct,
              DISCOUNT_PERCENT
            )
          : totalPriceForThisProduct;
      }
    }
  }

  let allProductsPrice = 0;
  if (paymentMethodDetails && shippingMethodDetails) {
    allProductsPrice = convertToTruePrice(
      orderDetails.afterDiscount
        ? calculatePriceBeforeDiscount(
            orderDetails.price -
              paymentMethodDetails.price -
              shippingMethodDetails.price,
            DISCOUNT_PERCENT
          )
        : orderDetails.price -
            paymentMethodDetails.price -
            shippingMethodDetails.price
    );
  }

  allProductsPrice =
    allProductsPrice -
    (orderDetails.afterDiscount
      ? calculatePriceBeforeDiscount(chocolateBoxesTotalPrice, DISCOUNT_PERCENT)
      : chocolateBoxesTotalPrice);

  let items: any[] = [shippingItem];

  if (paymentItem) {
    items.push(paymentItem);
  }

  if (orderDetails.totalBoxQuantity) {
    const firstBoxItems = [
      {
        name: "BOX " + chocolateBarBoxSize[orderDetails.totalBoxQuantity],
        description:
          orderDetails.totalBoxQuantity +
          " tyčiniek Simply Chocolate podľa vlastného výberu",
        count: 1,
        measureType: "ks",
        totalPriceWithVat: allProductsPrice,
        vat: VAT,
        hasDiscount: orderDetails.afterDiscount,
        discountName: orderDetails.afterDiscount ? "Zľavový kód" : null,
        discountPercent: orderDetails.afterDiscount ? DISCOUNT_PERCENT : null,
        discountValue: orderDetails.afterDiscount
          ? calculateDiscountValueForPrice(
              removeVat(allProductsPrice),
              DISCOUNT_PERCENT
            )
          : null,
        typeId: 1,
      },
    ];

    items = firstBoxItems.concat(items);
  }
  if (chocolateBoxItems.length) {
    items = chocolateBoxItems.concat(items);
  }

  const ikrosUrl = process.env.IKROS_INVOICE_API ?? "";
  const ikrosOrderResponse = await fetch(ikrosUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.IKROS_TOKEN,
    },
    body: JSON.stringify([
      {
        documentNumber: null,
        createDate: orderFound.createdAt,
        dueDate: dueDate,
        clientName:
          orderDetails.billingInfo.firstName +
          " " +
          orderDetails.billingInfo.lastName,
        clientContactName: orderDetails.billingInfo.firstName,
        clientContactSurname: orderDetails.billingInfo.lastName,
        clientStreet: orderDetails.billingInfo.address,
        clientPostCode: orderDetails.billingInfo.zipCode,
        clientTown: orderDetails.billingInfo.city,
        clientCountry: orderDetails.billingInfo.country,
        variableSymbol: "20210384",
        openingText: "Ďakujeme, že nakupujete Simply Chocolate!",
        closingText: "Tešíme sa na Váš ďalší nákup!",
        senderBankIban: "SK3183300000002601387342",
        senderBankSwift: "FIOZSKBA",
        paymentType: paymentMethodDetails?.label,
        deliveryType: shippingMethodDetails?.label,
        senderContactName: "Patrik Pšenák",
        senderPhone: "+421918596972",
        senderEmail: "info@predoma.sk",
        senderWeb: "www.predoma.sk",
        clientPostalName:
          orderDetails.billingInfo.firstName +
          " " +
          orderDetails.billingInfo.lastName,
        clientPostalContactName: orderDetails.billingInfo.firstName,
        clientPostalContactSurname: orderDetails.billingInfo.lastName,
        clientPostalStreet: orderDetails.billingInfo.address,
        clientPostalPostCode: orderDetails.billingInfo.zipCode,
        clientPostalTown: orderDetails.billingInfo.city,
        clientPostalCountry: orderDetails.billingInfo.country,
        clientHasDifferentPostalAddress: false,
        currency: "EUR",
        isVatAccordingPayment: true,
        orderNumber: orderDetails.orderNumber,
        items: items,
      },
    ]),
  });

  const result = await ikrosOrderResponse;
  const data = await result.json();

  const newInvoiceUrl = data.documents
    ? data.documents[0].downloadUrl
    : console.log(data);

  await fetch(newInvoiceUrl)
    .then((res) => {
      if (res.ok) {
        console.log("invoice saved successfully");
      } else {
        console.log(res);
      }
    })
    .catch((err) => console.log(err));
};

const createPaymentMethodItem = (paymentMethod: PaymentMethod) => {
  if (paymentMethod === PaymentMethod.Online) return null;
  else {
    const paymentMethodDetails = paymentMethods.find(
      (thisPaymentMethod) => thisPaymentMethod.name === paymentMethod
    );

    return {
      name: paymentMethodDetails?.label,
      count: 1,
      measureType: "ks",
      totalPriceWithVat: 1.0,
      vat: VAT,
      typeId: 2,
    };
  }
};

const createShippingMethodItem = (shippingMethod: ShippingMethod) => {
  const shippingMethodDetails = shippingMethods.find(
    (thisShippingMethod) => thisShippingMethod.name === shippingMethod
  );

  return {
    name: shippingMethodDetails?.label,
    count: 1,
    measureType: "ks",
    vat: VAT,
    typeId: 2,
    totalPriceWithVat: shippingMethodDetails?.price
      ? shippingMethodDetails?.price
      : undefined,
  };
};
