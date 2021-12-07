import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "middleware/db";
import { DiscCode } from "models/disccode.model";
import { DiscountCode } from "lib/globalTypes";

type Data = {
  discountCodes?: DiscountCode[];
};

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    await connectDB();
    const discountCodes: DiscountCode[] = await DiscCode.find({}).exec();

    res.status(200).send({ discountCodes });
  } else res.status(400).send({});
}
