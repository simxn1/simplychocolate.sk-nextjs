import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { inputs } from "data/delivery";
import styles from "styles/modules/Summary.module.css";
import { useCartContext } from "context/CartContext";
import { DeliveryInfoForm, PaymentMethod } from "lib/globalTypes";
import { chocolateBars } from "data/chocolate-bars";
import {
  orderNumberStringToBesteronVs,
  sanitizeDiscountCode,
  stringifyPrice,
  toCamelCase,
} from "lib/utils";
import { CURRENCY, PAYMENT_TYPE } from "lib/constants";
import { useRouter } from "next/router";
import Link from "next/link";

const Summary: NextPage = () => {
  const router = useRouter();

  const besteronElem = useRef(null);

  const {
    chocolateBarsQuantity,
    chocolateBoxesQuantity,
    totalPrice,
    paymentMethod,
    shippingMethod,
    deliveryInfo,
    isDiscountApplied,
    discountCode,
    setDeliveryInfo,
    deliveryPointPlaceId,
    orderId,
    clear,
    isCartEmpty,
  } = useCartContext();

  const [termsAgreed, setTermsAgreed] = useState<boolean>(true);
  const [isBesteronCheckout, setIsBesteronCheckout] = useState<boolean>(false);

  const toggleTermsAgreed = () => {
    setTermsAgreed((prevState) => !prevState);
  };

  let boxContent: Record<string, number> = {};
  if (chocolateBarsQuantity) {
    chocolateBars.forEach(
      (bar, index) =>
        (boxContent[toCamelCase(bar.name)] = chocolateBarsQuantity[index])
    );
  }

  const paymentId = orderNumberStringToBesteronVs(orderId ?? "");
  const checkoutData = {
    boxContent,
    totalBoxQuantity: chocolateBarsQuantity?.reduce((a, b) => a + b, 0),
    secondBoxContent: chocolateBoxesQuantity,
    price: totalPrice,
    billingInfo: deliveryInfo,
    deliveryInfo,
    paymentMethod,
    shippingMethod,
    afterDiscount: isDiscountApplied,
    orderNumber: orderId,
    discountCode: sanitizeDiscountCode(discountCode ?? ""),
    placeSelectedID: deliveryPointPlaceId,
    paymentId,
  };

  const handleCashCheckout = async () => {
    const response = await fetch("/api/checkout-cash", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(checkoutData),
    });

    console.log(JSON.stringify(checkoutData));

    clear && clear();
    const cashCheckoutResponse = await response.json();
    console.log(cashCheckoutResponse);
    router.push(cashCheckoutResponse.url);
  };

  const handleOnlinePayment = async () => {
    setIsBesteronCheckout(true);

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(checkoutData),
    });
    const data = await res.json();

    console.log("CHECKOUT ", checkoutData);

    const paymentData = {
      cid: process.env.NEXT_PUBLIC_BESTERON_CID,
      amnt: totalPrice ? stringifyPrice(totalPrice).replace(",", ".") : "",
      vs: paymentId,
      curr: CURRENCY,
      ru: "https://simplychocolate.sk" + "/paid",
      sign: data.signed,
      language: "sk",
      paymentmethod: PAYMENT_TYPE,
    };

    console.log("PAYMENT ", paymentData);

    clear && clear();
    // @ts-ignore
    window.Besteron.show(document, besteronElem.current, paymentData);
  };

  const handleContinue = () => {
    if (termsAgreed) {
      return paymentMethod === PaymentMethod.Cash
        ? handleCashCheckout()
        : handleOnlinePayment();
    }
  };

  const changeBillingInformation = (
    newValue: string,
    inputName: keyof DeliveryInfoForm
  ) => {
    setDeliveryInfo &&
      setDeliveryInfo((deliveryInfo) => {
        if (deliveryInfo) {
          const newDeliveryInfo = { ...deliveryInfo };
          newDeliveryInfo[inputName] = newValue;

          return newDeliveryInfo;
        }
        return null;
      });
  };

  useEffect(() => {
    if (isCartEmpty) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    // @ts-ignore
    window.Besteron ||
      (function (d) {
        let s,
          c,
          o = function () {
            // @ts-ignore
            o._.push(arguments);
          };
        // @ts-ignore
        o._ = [];

        s = d.getElementsByTagName("script")[0];
        c = d.createElement("script");
        c.type = "text/javascript";
        c.charset = "utf-8";
        c.async = false;

        c.src = "https://client.besteron.com/inline/besteronInline.js";
        s?.parentNode?.insertBefore(c, s);
      })(document);
  }, []);

  return (
    <div className={styles.summary}>
      {isBesteronCheckout && (
        <div id="shop-iframe" className="shop-iframe" ref={besteronElem} />
      )}
      <h1>Máme správne údaje?</h1>
      <h3>(Upravíte kliknutím na údaj)</h3>
      <div className={styles.billingInfo}>
        <ul>
          {inputs.map(({ placeholder }) => {
            return <li key={placeholder}>{placeholder}:</li>;
          })}
        </ul>
        <form>
          {inputs.map(({ name, type }) => {
            return (
              <input
                onChange={(event) =>
                  changeBillingInformation(event.target.value, name)
                }
                type={type}
                name={name}
                key={name}
                value={deliveryInfo && deliveryInfo[name]}
              />
            );
          })}
        </form>
      </div>
      <div className={styles.flex}>
        <label className={styles.termsAgree}>
          <input
            type="checkbox"
            checked={termsAgreed}
            onChange={toggleTermsAgreed}
          />
          Súhlasím s
          <a>
            <Link href="/pdf/vseobecne-obchodne-podmienky.pdf">
              &nbsp;obchodnými podmienkami
            </Link>
          </a>
        </label>
        <button
          onClick={handleContinue}
          style={{ marginTop: "10vh" }}
          className={styles.confirm}
        >
          Objednať
        </button>
      </div>
    </div>
  );
};

export default Summary;
