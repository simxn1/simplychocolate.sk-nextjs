import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message?: string;
};

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const orderId = req.body.order_id;

    if (orderId) {
      const response = await fetch(
        "https://admin.depo.sk/v1/api/places/selected",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Authorization:
              "Basic " +
              Buffer.from(
                process.env.DEPO_USER + ":" + process.env.DEPO_PASS
              ).toString("base64"),
          },
          body: JSON.stringify({
            order: orderId,
          }),
        }
      );

      const data = await response.json();

      res.status(200).send(data);
    } else {
      res.status(400).send({ message: "No order_id" });
    }
  } else res.status(400).send({});
}
