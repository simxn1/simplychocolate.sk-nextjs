import { OrderDetails } from "lib/globalTypes";

export const createDeliveryPointPackage = async (
  orderDetails: OrderDetails
) => {
  const billingInfo = orderDetails.billingInfo;
  const formattedPrice =
    orderDetails.price.toString().slice(0, 2) +
    "." +
    orderDetails.price.toString().slice(2);

  const response = await fetch("https://admin.depo.sk/v1/api/packages/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization:
        "Basic " +
        Buffer.from("info@origins.sk" + ":" + "Original1").toString("base64"),
    },
    body: JSON.stringify({
      target: orderDetails.placeSelectedID,
      recipient_name: billingInfo.firstName + " " + billingInfo.lastName,
      recipient_street: billingInfo.address,
      recipient_zip: billingInfo.zipCode,
      recipient_city: billingInfo.city,
      recipient_country: billingInfo.country,
      recipient_phone: Number(billingInfo.phone),
      recipient_email: billingInfo.email,
      cod: formattedPrice,
      insurance: formattedPrice,
      service_18plus: "0",
      sender_reference: orderDetails.orderNumber,
    }),
  });

  const responseValue = await response.json();
  console.log(responseValue);
};
