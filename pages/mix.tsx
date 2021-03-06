import type { NextPage } from "next";
import styles from "styles/modules/Mix.module.css";
import { boxSizes, chocolateBars, Size } from "data/chocolate-bars";
import { chocolateBoxes } from "data/chocolate-boxes";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useCartContext } from "context/CartContext";
import {
  capitalize,
  setAndSaveToLocalStorage,
  stringifyPrice,
} from "lib/utils";
import { CartContextLocalStorageKeys } from "lib/globalTypes";
import { Back } from "components";

const Mix: NextPage = () => {
  const router = useRouter();
  const {
    chocolateBarsQuantity,
    selectedChocolateBarsBoxSize,
    totalPrice,
    setChocolateBarsQuantity,
    setSelectedChocolateBarsBoxSize,
  } = useCartContext();

  const [isInfoVisible, setIsInfoVisible] = useState<boolean>(false);
  const [errSizeNotSelected, setErrSizeNotSelected] = useState<boolean>(false);
  const [errQuantity, setErrQuantity] = useState<boolean>(false);

  const totalChocolateBarsQuantity = useMemo(() => {
    return chocolateBarsQuantity
      ? chocolateBarsQuantity.reduce((a, b) => a + b, 0)
      : 0;
  }, [chocolateBarsQuantity]);

  const currentAvailableBarsQuantity = useMemo(() => {
    return boxSizes?.find(
      (boxSize) => boxSize.size === selectedChocolateBarsBoxSize
    )?.barCount;
  }, [selectedChocolateBarsBoxSize]);

  const selectBoxSize = useCallback(
    (size: Size) => {
      setAndSaveToLocalStorage<Size | null>(
        size,
        setSelectedChocolateBarsBoxSize,
        CartContextLocalStorageKeys.SelectedChocolateBarsBoxSize
      );
      setErrSizeNotSelected(false);
    },
    [setSelectedChocolateBarsBoxSize]
  );

  const handleContinue = useCallback(() => {
    if (currentAvailableBarsQuantity !== totalChocolateBarsQuantity) {
      setErrQuantity(true);
    } else router.push("/cart-check");
  }, [currentAvailableBarsQuantity, router, totalChocolateBarsQuantity]);

  const handleChocolateBox = useCallback(() => {
    if (currentAvailableBarsQuantity !== totalChocolateBarsQuantity) {
      setErrQuantity(true);
    } else router.push("/chocolate-box");
  }, [currentAvailableBarsQuantity, router, totalChocolateBarsQuantity]);

  const changeThisBarQuantity = useCallback(
    (barIndex: number, amountToChangeBy: number) => {
      if (!selectedChocolateBarsBoxSize) {
        setErrSizeNotSelected(true);
      }

      if (
        selectedChocolateBarsBoxSize &&
        currentAvailableBarsQuantity &&
        currentAvailableBarsQuantity >=
          totalChocolateBarsQuantity + amountToChangeBy
      ) {
        setErrQuantity(false);

        setAndSaveToLocalStorage<number[]>(
          (function () {
            const newBarsQuantity = [...(chocolateBarsQuantity ?? [])];

            if (newBarsQuantity[barIndex] + amountToChangeBy >= 0) {
              newBarsQuantity[barIndex] =
                newBarsQuantity[barIndex] + amountToChangeBy;
            }

            return newBarsQuantity;
          })(),
          setChocolateBarsQuantity,
          CartContextLocalStorageKeys.ChocolateBarsQuantity
        );
      }
    },
    [
      chocolateBarsQuantity,
      currentAvailableBarsQuantity,
      selectedChocolateBarsBoxSize,
      setChocolateBarsQuantity,
      totalChocolateBarsQuantity,
    ]
  );

  useEffect(() => {
    if (selectedChocolateBarsBoxSize) setIsInfoVisible(true);
  }, [selectedChocolateBarsBoxSize]);

  return (
    <div className={styles.mix}>
      <Back />
      <h1>
        M??m chu?? na
        <br />
        na poriadnu ??okol??du!
      </h1>
      <h2>ve??kos?? boxu</h2>
      <ul className={styles.boxSizeSelection}>
        {boxSizes.map((boxSize) => (
          <li key={boxSize.size}>
            <button
              className={
                selectedChocolateBarsBoxSize === boxSize.size
                  ? styles.active
                  : ""
              }
              onClick={() => selectBoxSize(boxSize.size)}
            >
              {boxSize.size}
            </button>
          </li>
        ))}
      </ul>
      <h2>ty??inky v boxe</h2>
      <ul className={styles.barSelection}>
        {chocolateBars.map((bar, index) => {
          return (
            !bar.isSoldOut && (
              <li className={bar.isHalfDiscounted ? styles.isDiscounted : ""}>
                <img
                  src={`/img/mix/bar/${bar.name
                    .replace(" ", "")
                    .toLowerCase()}.png`}
                  alt={""}
                />
                {capitalize(bar.name)}
                <div className={styles.barQuantity}>
                  <button onClick={() => changeThisBarQuantity(index, -1)}>
                    -
                  </button>
                  <input
                    value={
                      chocolateBarsQuantity?.length &&
                      chocolateBarsQuantity[index]
                    }
                    type="text"
                    readOnly
                  />
                  <button onClick={() => changeThisBarQuantity(index, 1)}>
                    +
                  </button>
                </div>
              </li>
            )
          );
        })}
      </ul>
      {isInfoVisible && (
        <h3>
          Zost??vaj??ci po??et ty??iniek v boxe:
          <strong>
            {currentAvailableBarsQuantity
              ? currentAvailableBarsQuantity - totalChocolateBarsQuantity
              : 0}
          </strong>
        </h3>
      )}
      {chocolateBars.some((bar) => bar.isHalfDiscounted) && (
        <p className={styles.isDiscounted}>
          Kon???? mi spotreba, m???? ma so z??avou 50%
        </p>
      )}
      {isInfoVisible && (
        <h4>
          Cena celkom:
          <strong className={styles.price}>
            {totalPrice ? stringifyPrice(totalPrice) : 0}???
          </strong>
        </h4>
      )}
      {errQuantity && (
        <span className={styles.error}>
          Uve??te spr??vny po??et ty??iniek pod??a ve??kosti boxu.
        </span>
      )}
      {errSizeNotSelected && (
        <span className={styles.error}>Vyberte si ve??kos?? boxu.</span>
      )}
      {isInfoVisible && (
        <div className={styles.continue}>
          {!chocolateBoxes.every((box) => box.isSoldOut) && (
            <button onClick={handleChocolateBox}>
              M??m chu?? aj na bonboni??ru!
            </button>
          )}
          <button onClick={handleContinue}>Chcem plati??!</button>
        </div>
      )}
    </div>
  );
};

export default Mix;
