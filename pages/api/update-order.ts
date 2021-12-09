import { NextApiRequest, NextApiResponse } from "next";
import { IOrder, ShippingMethod } from "lib/globalTypes";
import { Order } from "models/order.model";
import {
  getBesteronStringFromPaymentDetails,
  signBesteronString,
} from "lib/utils";
import { mailToCustomer } from "lib/mail";
import { createDeliveryPointPackage } from "lib/deliveryPointPackage";
import { createInvoice } from "lib/invoice";

type Data = { VALID?: boolean; message?: string };

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const paymentDetails = req.body;

  if (paymentDetails.VS) {
    const stringToSign = getBesteronStringFromPaymentDetails(paymentDetails);
    const signed = signBesteronString(stringToSign);

    const VALID = signed === paymentDetails.SIGN;

    if (VALID) {
      Order.findOneAndUpdate(
        { paymentId: paymentDetails.VS },
        { paymentStatus: "PAID" },
        { useFindAndModify: false }
      ).then((orderUpdated: IOrder) =>
        console.log("order " + orderUpdated.paymentId + " updated!")
      );

      const orderFound = await Order.findOne({ paymentId: paymentDetails.VS });
      const orderDetails = orderFound.orderDetails;

      await mailToCustomer(orderDetails);

      await createInvoice(paymentDetails.VS);

      if (orderDetails.shippingMethod === ShippingMethod.DeliveryPoint) {
        await createDeliveryPointPackage(orderDetails);
      }
    }

    res.send({ VALID });
  } else {
    console.log("Missing VS", req.body);
    res.status(401).send({ message: "Missing VS" });
  }
}
