import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { inputs } from "data/delivery";
import styles from "styles/modules/Summary.module.css";
import { useCartContext } from "context/CartContext";
import { DeliveryInfoForm } from "lib/globalTypes";

const Summary: NextPage = () => {
  const besteronElem = useRef(null);

  const { paymentMethod, deliveryInfo, setDeliveryInfo } = useCartContext();

  const [termsAgreed, setTermsAgreed] = useState<boolean>(true);
  const [isBesteronCheckout, setIsBesteronCheckout] = useState<boolean>(false);

  const toggleTermsAgreed = () => {
    setTermsAgreed((prevState) => !prevState);
  };

  const handleCashCheckout = () => {};

  const handleOnlinePayment = () => {};

  const handleContinue = () => {
    if (termsAgreed) {
      return paymentMethod === "cash"
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
            onClick={toggleTermsAgreed}
          />
          Súhlasím s
          <a href="/pdf/vseobecne-obchodne-podmienky.pdf" target="_blank">
            &nbsp;obchodnými podmienkami
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
