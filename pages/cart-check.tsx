import { NextPage } from "next";
import { chocolateBars } from "data/chocolate-bars";
import { chocolateBoxes } from "data/chocolate-boxes";
import { capitalize, stringifyPrice } from "lib/utils";
import { useCartContext } from "context/CartContext";
import styles from "styles/modules/CartCheck.module.css";
import { Back } from "components/Back";
import { useRouter } from "next/router";
import { useEffect } from "react";

const CartCheck: NextPage = () => {
  const router = useRouter();
  const {
    chocolateBarsQuantity,
    chocolateBoxesQuantity,
    totalPrice,
    isCartEmpty,
  } = useCartContext();

  const handleContinue = () => {};

  useEffect(() => {
    if (isCartEmpty) {
      router.push("/");
    }
  }, []);

  return (
    <div className={styles.cartCheck}>
      <Back />
      <h1>
        Lásku si za peniaze nekúpiš,
        <br />
        čokoládu ÁNO!
      </h1>
      <h2>Už skoro u teba doma...</h2>
      <ul className={styles.productsToPurchase}>
        {chocolateBars.map((bar, index) =>
          chocolateBarsQuantity?.length && chocolateBarsQuantity[index] ? (
            <li key={bar.name}>
              <img
                src={`/img/cart-check/${bar.name
                  .replaceAll(" ", "")
                  .toLowerCase()}.png`}
                alt={""}
              />
              {capitalize(bar.name)}
              <strong>
                {chocolateBarsQuantity[index]}
                ks
              </strong>
            </li>
          ) : null
        )}
        {chocolateBoxes.map((box, index) =>
          chocolateBoxesQuantity?.length && chocolateBoxesQuantity[index] ? (
            <li key={box.name}>
              <img
                src={`/img/cart-check/${box.name
                  .replaceAll(" ", "")
                  .toLowerCase()}.png`}
                alt={""}
              />
              {capitalize(box.name)}
              <strong>
                {chocolateBoxesQuantity[index]}
                ks
              </strong>
            </li>
          ) : null
        )}
        <li>
          Celkom: <strong>{totalPrice && stringifyPrice(totalPrice)} €</strong>
        </li>
      </ul>
      <div className={styles.btnContainer}>
        <button onClick={handleContinue} className={styles.continue}>
          Pokračovať
        </button>
      </div>
    </div>
  );
};

export default CartCheck;
