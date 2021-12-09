import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "middleware/db";
import { Order } from "models/order.model";
import {
  getBesteronStringFromOrderDetails,
  signBesteronString,
} from "lib/utils";
import { OrderDetails } from "lib/globalTypes";

type Data = { signed?: string; orderDetails?: OrderDetails };

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    await connectDB();

    const orderDetails = req.body;
    const stringToSign = getBesteronStringFromOrderDetails(orderDetails);

    const signed = signBesteronString(stringToSign);

    const newOrder = new Order({
      paymentId: orderDetails.paymentId,
      paymentStatus: "pending",
      orderDetails,
    });

    newOrder
      .save()
      .then(() => console.log("order saved!"))
      .catch((err: any) => console.log("ERROR:" + err));

    res.json({ signed, orderDetails });
  }
}
