import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "middleware/db";
import { Order } from "models/order.model";
import { orderNumberStringToNumber } from "lib/utils";
import { createInvoice } from "lib/invoice";
import { ShippingMethod } from "lib/globalTypes";
import { createDeliveryPointPackage } from "lib/deliveryPointPackage";
import { mailToCustomer } from "lib/mail";

type Data = { url?: string };

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const orderDetails = req.body;
    const paymentStatus = "CASH";
    const orderNumber = orderDetails.orderNumber;
    const paymentId = orderNumberStringToNumber(orderNumber);

    await connectDB();

    const newOrder = new Order({
      paymentId,
      paymentStatus,
      orderDetails,
    });

    newOrder
      .save()
      .then(() => console.log("order saved!"))
      .catch((err: any) => console.log("ERROR: " + err));

    await mailToCustomer(orderDetails);

    await createInvoice(paymentId);

    if (orderDetails.shippingMethod === ShippingMethod.DeliveryPoint) {
      await createDeliveryPointPackage(orderDetails);
    }

    res.json({ url: "/paid" });
  }
}
