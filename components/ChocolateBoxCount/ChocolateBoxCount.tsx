import { FC } from "react";
import styles from "styles/modules/ChocolateBoxes.module.css";
import { useCartContext } from "context/CartContext";
import { chocolateBoxes } from "data/chocolate-boxes";
import {
  CartContextLocalStorageKeys,
  setAndSaveToLocalStorage,
  titleCaseToParamCase,
} from "lib/utils";

interface Props {}

export const ChocolateBoxCount: FC<Props> = ({}: Props) => {
  const { chocolateBoxesQuantity, setChocolateBoxesQuantity } =
    useCartContext();

  const handleChangeQuantity = (
    thisChocolateBoxIndex: number,
    amountToChangeBy: number
  ) => {
    chocolateBoxesQuantity &&
      setAndSaveToLocalStorage(
        () => {
          let newChocolateBoxesQuantity = [...chocolateBoxesQuantity];
          if (
            newChocolateBoxesQuantity[thisChocolateBoxIndex] > 0 ||
            amountToChangeBy > 0
          ) {
            newChocolateBoxesQuantity[thisChocolateBoxIndex] =
              newChocolateBoxesQuantity[thisChocolateBoxIndex] +
              amountToChangeBy;
          }
          return newChocolateBoxesQuantity;
        },
        setChocolateBoxesQuantity,
        CartContextLocalStorageKeys.ChocolateBoxesQuantity
      );
  };

  return (
    <div className={styles.count}>
      <div className="product-quantities">
        <strong>množstvo</strong>
        {chocolateBoxesQuantity?.map((quantity, index) => {
          const thisProduct = chocolateBoxes[index];
          const imgName = titleCaseToParamCase(thisProduct.name);

          if (!thisProduct.isSoldOut)
            return (
              <div className={styles.quantity}>
                <img
                  src={`/img/chocolate-boxes/mutual/${imgName}.webp`}
                  alt=""
                />
                <div className={styles.counter} key={index}>
                  <button onClick={() => handleChangeQuantity(index, -1)}>
                    -
                  </button>
                  <span>{quantity}</span>
                  <button onClick={() => handleChangeQuantity(index, 1)}>
                    +
                  </button>
                </div>
              </div>
            );
        })}
      </div>
    </div>
  );
};
