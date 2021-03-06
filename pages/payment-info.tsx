import type { NextPage } from "next";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import {
  calculatePriceAfterDiscount,
  generateOrderId,
  setAndSaveToLocalStorage,
  stringifyPrice,
} from "lib/utils";
import {
  CartContextLocalStorageKeys,
  DiscountCode,
  PaymentMethod,
  ShippingMethod,
} from "lib/globalTypes";
import { useCartContext } from "context/CartContext";
import { paymentMethods, shippingMethods } from "data/payment-info";
import styles from "styles/modules/PaymentInfo.module.css";
import { useRouter } from "next/router";
import { DISCOUNT_PERCENT } from "lib/constants";
import { checkDeliveryPointSelectedPlace, getDiscountCodes } from "lib/api";

const PaymentInfo: NextPage = () => {
  const router = useRouter();

  const {
    totalPrice,
    orderId,
    paymentMethod,
    shippingMethod,
    isDiscountApplied,
    discountCode,
    setTotalPrice,
    setOrderId,
    setPaymentMethod,
    setShippingMethod,
    setDeliveryPointPlaceId,
    setIsDiscountApplied,
    setDiscountCode,
  } = useCartContext();

  const [isCodeErrVisible, setIsCodeErrVisible] = useState<boolean>(false);
  const [isSelectedPlaceErrVisible, setIsSelectedPlaceErrVisible] =
    useState<boolean>(false);

  const handleChangeDiscountCode = (event: ChangeEvent<HTMLInputElement>) => {
    setDiscountCode && setDiscountCode(event.target.value);
  };

  const handleApplyDiscountCode = useCallback(async () => {
    const discountCodes = await getDiscountCodes();

    const discountCodeValid = discountCodes.find(
      (code: DiscountCode) => code.name === discountCode?.toUpperCase()
    );

    if (!isDiscountApplied && discountCodeValid) {
      const paymentPrice =
        paymentMethods.find(
          (thisPaymentMethod) => thisPaymentMethod.name === paymentMethod
        )?.price ?? 0;

      const shippingPrice =
        shippingMethods.find(
          (thisShippingMethod) => thisShippingMethod.name === shippingMethod
        )?.price ?? 0;

      const newTotalPrice =
        calculatePriceAfterDiscount(
          (totalPrice ?? 0) - paymentPrice - shippingPrice,
          DISCOUNT_PERCENT
        ) +
        paymentPrice +
        shippingPrice;

      setAndSaveToLocalStorage(
        newTotalPrice,
        setTotalPrice,
        CartContextLocalStorageKeys.TotalPrice
      );

      setIsDiscountApplied && setIsDiscountApplied(true);
      setIsCodeErrVisible(false);
    } else if (
      discountCode !== "" &&
      !isDiscountApplied &&
      !discountCodeValid
    ) {
      setIsCodeErrVisible(true);
    }
  }, [
    discountCode,
    isDiscountApplied,
    paymentMethod,
    setIsDiscountApplied,
    setTotalPrice,
    shippingMethod,
    totalPrice,
  ]);

  const checkSelectedPlaceForDeliveryPoint =
    useCallback(async (): Promise<boolean> => {
      if (shippingMethod === ShippingMethod.DeliveryPoint) {
        const { is_selected, id } = await checkDeliveryPointSelectedPlace(
          orderId ?? ""
        );

        if (is_selected && id) {
          setDeliveryPointPlaceId && setDeliveryPointPlaceId(id);
          return true;
        } else {
          setIsSelectedPlaceErrVisible(true);
          return false;
        }
      } else return true;
    }, [orderId, setDeliveryPointPlaceId, shippingMethod]);

  const handleSetPayment = useCallback(
    (newPaymentMethod: PaymentMethod) => {
      const oldPaymentPrice =
        paymentMethods.find(
          (thisPaymentMethod) => thisPaymentMethod.name === paymentMethod
        )?.price ?? 0;

      const newPaymentPrice =
        paymentMethods.find(
          (thisPaymentMethod) => thisPaymentMethod.name === newPaymentMethod
        )?.price ?? 0;

      setPaymentMethod && setPaymentMethod(newPaymentMethod);

      if (totalPrice) {
        setAndSaveToLocalStorage(
          totalPrice - oldPaymentPrice + newPaymentPrice,
          setTotalPrice,
          CartContextLocalStorageKeys.TotalPrice
        );
      }
    },
    [paymentMethod, setPaymentMethod, setTotalPrice, totalPrice]
  );

  const handleSetShipping = useCallback(
    (newShippingMethod: ShippingMethod) => {
      const oldShippingPrice =
        shippingMethods.find(
          (thisShippingMethod) => thisShippingMethod.name === shippingMethod
        )?.price ?? 0;

      const newShippingPrice =
        shippingMethods.find(
          (thisShippingMethod) => thisShippingMethod.name === newShippingMethod
        )?.price ?? 0;

      setShippingMethod && setShippingMethod(newShippingMethod);

      if (totalPrice) {
        setAndSaveToLocalStorage(
          totalPrice - oldShippingPrice + newShippingPrice,
          setTotalPrice,
          CartContextLocalStorageKeys.TotalPrice
        );
      }
    },
    [setShippingMethod, setTotalPrice, shippingMethod, totalPrice]
  );

  const handleContinue = async () => {
    if (paymentMethod && shippingMethod) {
      const isSelectedPlaceValid = await checkSelectedPlaceForDeliveryPoint();

      if (isSelectedPlaceValid) {
        router.push("/summary");
      }
    }
  };

  useEffect(() => {
    setOrderId && setOrderId(generateOrderId());
  }, []);

  return (
    <div className={styles.paymentInfo}>
      <h1>
        T??to ??okol??da stoj?? za to{" "}
        <strong>{totalPrice && stringifyPrice(totalPrice)} ???</strong>
      </h1>
      {isDiscountApplied && (
        <div className={styles.discountApplied}>(po z??ave)</div>
      )}
      {isCodeErrVisible && (
        <span className={styles.err}>Nespr??vny z??avov?? k??d.</span>
      )}
      <div className={styles.discount}>
        <h2>M??m z??avov?? kup??n</h2>
        <input onChange={handleChangeDiscountCode} type="text" />
        <button onClick={handleApplyDiscountCode}>
          <i className="fas fa-check" />
        </button>
      </div>
      <div className={styles.method}>
        <h2>Ako bude?? plati???</h2>
        {paymentMethods.map((thisPaymentMethod) => {
          return (
            <div key={thisPaymentMethod.name}>
              <label>
                <input
                  onClick={() => handleSetPayment(thisPaymentMethod.name)}
                  value={thisPaymentMethod.name}
                  name="payment-method"
                  type="radio"
                />
                {thisPaymentMethod.label}
              </label>
              <p>+ {stringifyPrice(thisPaymentMethod.price)} ???</p>
            </div>
          );
        })}
      </div>
      <div className={styles.method}>
        <h2>Ako chce?? objedn??vku doru??i???</h2>
        {shippingMethods.map((thisShippingMethod) => {
          return (
            <>
              <div key={thisShippingMethod.name}>
                <label>
                  <input
                    onClick={() => handleSetShipping(thisShippingMethod.name)}
                    value={thisShippingMethod.name}
                    name="shipping-method"
                    type="radio"
                  />
                  {thisShippingMethod.label}
                </label>
                <p>+ {stringifyPrice(thisShippingMethod.price)} ???</p>
              </div>
              {thisShippingMethod.name === ShippingMethod.DeliveryPoint &&
                shippingMethod === ShippingMethod.DeliveryPoint && (
                  <iframe
                    className={styles.depoIntegration}
                    src={`https://admin.depo.sk/eshop?c=223&o=${orderId}`}
                    frameBorder="0"
                    key={thisShippingMethod.name + "iframe"}
                  />
                )}
            </>
          );
        })}
      </div>
      {isSelectedPlaceErrVisible && (
        <span className={styles.err}>Vyber si odbern?? miesto.</span>
      )}
      <div className={styles.flex}>
        <button onClick={handleContinue} className={styles.confirm}>
          Pokra??ova??
        </button>
      </div>
    </div>
  );
};

export default PaymentInfo;
