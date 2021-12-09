const nodemailer = require("nodemailer");
import { SMTP_HOST, SMTP_PORT } from "lib/constants";
import { BoxContent, DeliveryInfoForm, OrderDetails } from "lib/globalTypes";
import { camelCaseToSentenceCase, formatPrice } from "lib/utils";
import { shippingMethods } from "data/payment-info";

export const mailToCustomer = async (orderDetails: OrderDetails) => {
  const transporter = nodemailer.createTransport({
    pool: true,
    secure: true,
    host: SMTP_HOST,
    port: SMTP_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const shippingMethodLabel = shippingMethods.find(
    (shippingMethod) => shippingMethod.name === orderDetails.shippingMethod
  )?.label;

  let productsString = "";
  // @ts-ignore
  Object.keys(orderDetails.boxContent).forEach((name: keyof BoxContent) => {
    productsString += `
        ${
          orderDetails.boxContent[name]
            ? `<li>${camelCaseToSentenceCase(name)}: ${
                orderDetails.boxContent[name]
              }ks</li>`
            : ""
        }
        `;
  });

  let billingString = "";
  Object.keys(orderDetails.billingInfo).forEach(
    // @ts-ignore
    (key: keyof DeliveryInfoForm) => {
      billingString += `<li>${orderDetails.billingInfo[key]}</li>`;
    }
  );

  let mailOptions = {
    from: process.env.MAIL_USER,
    to: orderDetails.billingInfo.email,
    subject: "Objednávka číslo " + orderDetails.orderNumber,
    attachments: [
      {
        filename: "logo.png",
        path: process.env.NEXT_PUBLIC_ORIGIN + "/img/mail/logo.png",
        cid: "logo",
      },
      {
        filename: "cover.jpg",
        path: process.env.NEXT_PUBLIC_ORIGIN + "/img/mail/cover.jpg",
        cid: "cover",
      },
    ],
    html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <style>
                @media (max-width: 700px) {
                    .cover {
                        display: none;
                    }
        
                    td {
                        width: 100%;
                    }
                }
            </style>
        </head>
        <body style="font-family: 'Open Sans', sans-serif;max-width: 768px;margin: 0 auto;">
            <table>
            <tr>
                <td style="width: 60%">
                    <div style="margin-top: 1.5rem;">
                        <img src="cid:logo" style="width: 12rem;margin-bottom: 2rem;max-width: 100%;">
                        <h1 style="font-weight: 700;text-transform: uppercase;">dobrý deň, ${
                          orderDetails.billingInfo.firstName
                        }!</h1>
                        <h4 style="font-size: 1.2rem;line-height: 1.35rem;">
                            Vaša sladká objednávka bola prijatá!<br>
                            Objednávku budeme expedovať do 48 hod.
                        </h4>
                        <h4 style="font-size: 1.2rem;line-height: 1.35rem;">
                            Ďakujeme, že nakupujete Simply Chocolate.
                        </h4>
                        <div style="margin-top: 3.5rem;">
                            <h2 style="font-weight: 700;text-transform: uppercase;">
                                FAKTURAČNÉ ÚDAJE
                            </h2>
                            <ul style="list-style: none;padding-left: 0;line-height: 1.4rem;font-size: 1.2rem;">
                                ${billingString}
                            </ul>
                        </div>
                        <div style="margin-top: 3.5rem;">
                            <h2 style="font-weight: 700;text-transform: uppercase;">
                                obsah objednávky
                            </h2>
                            <ul style="list-style: none;padding-left: 0;line-height: 1.4rem;font-size: 1.2rem;">
                                ${productsString}
                                ${
                                  orderDetails.secondBoxContent &&
                                  orderDetails.secondBoxContent[0]
                                    ? "<li>Sharing is caring: " +
                                      orderDetails.secondBoxContent[0] +
                                      "ks</li>"
                                    : ""
                                }
                                ${
                                  orderDetails.secondBoxContent &&
                                  orderDetails.secondBoxContent[1]
                                    ? "<li>Instead Of Flowers: " +
                                      orderDetails.secondBoxContent[1] +
                                      "ks</li>"
                                    : ""
                                }
                                ${
                                  orderDetails.secondBoxContent &&
                                  orderDetails.secondBoxContent[2]
                                    ? "<li>Yes You Can Buy Love: " +
                                      orderDetails.secondBoxContent[2] +
                                      "ks</li>"
                                    : ""
                                }
                            </ul>
                        </div>
                        <div style="margin-top: 5rem;font-size: 1.15rem;line-height: 1.4rem;">
                            <div>
                                <h3 style="font-weight: 700;text-transform: uppercase;display: inline;padding: 0.4rem;line-height: 2rem;">
                                    suma:
                                </h3>
                                <h3 style="font-weight: 400;display: inline;padding: 0.4rem;line-height: 2rem;">
                                    ${formatPrice(orderDetails.price)} €
                                </h3>
                            </div>
                            <div>
                                <h3 style="font-weight: 700;text-transform: uppercase;display: inline;padding: 0.4rem;line-height: 2rem;">
                                    spôsob platby:
                                </h3>
                                <h3 style="font-weight: 400;display: inline;padding: 0.4rem;line-height: 2rem;">
                                    ${
                                      orderDetails.paymentMethod === "cash"
                                        ? "Dobierka"
                                        : "Online"
                                    }
                                </h3>
                            </div>
                            <div>
                                <h3 style="font-weight: 700;text-transform: uppercase;display: inline;padding: 0.4rem;line-height: 2rem;">
                                    spôsob dopravy:
                                </h3>
                                <h3 style="font-weight: 400;display: inline;padding: 0.4rem;line-height: 2rem;">
                                    ${shippingMethodLabel}
                                </h3>
                            </div>
                        </div>
                        <p>V prípade akýchkoľvek otázok nás neváhajte kontaktovať.</p>
                    </div>
                    </td>
                    <td class="cover" style="width: 40%;">
                        <div style="text-align: right;">
                            <img src="cid:cover" alt="" style="height: 100%;max-width: 100%;">
                        </div>
                    </td>
                </tr>
            </table>
            <footer style="text-align: center;background-color: #000;">
                <a style="display: inline-block;font-size: 1.1rem;color: #fff;padding: 1.5rem;text-decoration: none;" href="tel:+421904130824">+421 904 130 824</a>
                <a style="display: inline-block;font-size: 1.1rem;color: #fff;padding: 1.5rem;text-decoration: none;" href="https://simplychocolate.sk/">www.simplychocolate.sk</a>
                <a style="display: inline-block;font-size: 1.1rem;color: #fff;padding: 1.5rem;text-decoration: none;" href="mailto:info@simplychocolate.sk">info@simplychocolate.sk</a>
            </footer>
        </body>
        </html>`,
  };

  await new Promise((resolve, reject) => {
    // verify connection configuration
    transporter.verify(function (error: any, success: any) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Server is ready to take our messages");
        resolve(success);
      }
    });
  });

  await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(mailOptions, (err: any, info: any) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });
};
