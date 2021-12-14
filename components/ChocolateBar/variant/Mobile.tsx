import { FC } from "react";
import { ProductNutritionButton, ChocolateBarVariantProps } from "components";
import styles from "styles/modules/ChocolateBar/ChocolateBarMobile.module.css";

export const Mobile: FC<ChocolateBarVariantProps> = ({
  chocolateBar,
  toggleIsCartOpen,
  toggleIsNutritionOpen,
}: ChocolateBarVariantProps) => {
  const {
    name,
    color,
    isHalfDiscounted,
    isSoldOut,
    icons,
    firstLine,
    secondLine,
    thirdLine,
  } = chocolateBar;

  const nameSplit = name.split(" ");
  const nameNoSpaces = name.replace(" ", "");

  return (
    <>
      <div
        style={{
          background: `url(img/chocolate-bars/mobile/bg/${nameNoSpaces}.webp) no-repeat`,
        }}
        className={"section " + styles.chocolateBar}
      >
        <ProductNutritionButton
          handleClick={toggleIsNutritionOpen}
          top="35%"
          left="65%"
          fontSize="0.9em"
        />
        <h1 style={{ color }} className={"heading " + styles.heading}>
          {nameSplit[0]}
          <br />
          {nameSplit[1]}
          {isHalfDiscounted && (
            <img
              src="/img/mutual/sale.png"
              alt=""
              style={{
                width: "0.65em",
                position: "absolute",
                bottom: "0em",
                right: "-0.55em",
              }}
            />
          )}
        </h1>
        {isSoldOut ? (
          <div className={styles.price}>vypredané</div>
        ) : (
          <div className={styles.price}>
            <strong
              style={{
                color,
                textDecoration: isHalfDiscounted ? "line-through" : "",
              }}
            >
              2,29€
            </strong>
            {isHalfDiscounted && (
              <strong className={styles.discountPrice}>1,25 €</strong>
            )}
          </div>
        )}
        <img
          src={`/img/chocolate-bars/mobile/bar/${nameNoSpaces}.webp`}
          className={styles.bar}
          alt={""}
        />
        {!isSoldOut && (
          <div
            onClick={toggleIsCartOpen}
            className={"cta-animation " + styles.cta}
          >
            <button style={{ color }}>Chcem túto tyčinku</button>
          </div>
        )}
        <p className={styles.desc}>
          {firstLine}
          <br />
          {secondLine}
          <br />
          {thirdLine}
        </p>
        <img
          className={styles.icons}
          src={`/img/chocolate-bars/mobile/icons/${icons}.webp`}
          alt={""}
        />
      </div>
    </>
  );
};
