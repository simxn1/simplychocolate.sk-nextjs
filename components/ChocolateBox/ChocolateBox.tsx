import { FC, useState } from "react";
import Typical from "react-typical";
import styles from "styles/modules/ChocolateBoxes.module.css";
import { IChocolateBox } from "data/chocolate-boxes";
import { ChocolateBoxCart } from "components/ChocolateBoxCart";
import { isMobileOnly } from "react-device-detect";
import { ProductNutrition } from "components/ProductNutrition";
import { ProductNutritionButton } from "components/ProductNutritionButton";
import { stringifyPrice, titleCaseToParamCase } from "../../lib/utils";

interface ChocolateBoxProps {
  chocolateBox: IChocolateBox;
}

export const ChocolateBox: FC<ChocolateBoxProps> = ({
  chocolateBox,
}: ChocolateBoxProps) => {
  const {
    name,
    firstLine,
    secondLine,
    color,
    secondaryColor,
    price,
    pieces,
    nutritionData,
    nutritionDesc,
    isSoldOut,
    isHalfDiscounted,
  } = chocolateBox;
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isNutritionOpen, setIsNutritionOpen] = useState<boolean>(false);

  const toggleIsCartOpen = () => {
    setIsCartOpen((prevState) => !prevState);
  };

  const toggleIsNutritionOpen = () => {
    setIsNutritionOpen((prevState) => !prevState);
  };

  const handleContinue = () => {};

  const handleCheckout = () => {};

  const device = isMobileOnly ? "mobile" : "desktop";

  const nameWithDashes = titleCaseToParamCase(name);

  return (
    <>
      <div
        className={"section " + styles.chocolateBox}
        style={{
          background: `url('/img/chocolate-boxes/${device}/bg/${nameWithDashes}.webp')`,
        }}
      >
        <div className={styles.info}>
          <h1 className="heading" style={{ color }}>
            {firstLine}
            <br />
            {isHalfDiscounted && !isSoldOut && (
              <img
                src="/img/mutual/sale.png"
                alt=""
                className={styles.saleIcon}
              />
            )}
            <Typical
              steps={["", 1400, secondLine, 1200]}
              loop={Infinity}
              wrapper="div"
            />
          </h1>
          <h2 className={styles.price} style={{ display: "flex" }}>
            {isSoldOut ? (
              <div>vypredané</div>
            ) : (
              <>
                <div
                  style={{
                    color: secondaryColor,
                    textDecoration: isHalfDiscounted ? "line-through" : "",
                  }}
                >
                  {stringifyPrice(price) + " €"}
                </div>
                {isHalfDiscounted && (
                  <strong
                    style={{
                      fontSize: "1.2em",
                      marginLeft: "1em",
                      color: "#ff6771",
                    }}
                    className="new-price"
                  >
                    {price / 100 / 2} €
                  </strong>
                )}
              </>
            )}
          </h2>
          <p className={styles.description}>
            {pieces} kusov zmiešaných čokoládových bonbónov rôznych chutí.
          </p>
          <img
            src={`/img/chocolate-boxes/mutual/${nameWithDashes}.webp`}
            alt=""
          />
          <ProductNutritionButton
            handleClick={toggleIsNutritionOpen}
            position="relative"
            fontSize="1em"
          />
        </div>
        <img
          src={`/img/chocolate-boxes/mutual/${nameWithDashes}.webp`}
          alt=""
        />
        {!isSoldOut && (
          <button
            className="product-second-cta-animation"
            onClick={toggleIsCartOpen}
            style={{ color: "#fff", backgroundColor: color }}
          >
            chcem bonboniéru!
          </button>
        )}
      </div>
      {isNutritionOpen && (
        <ProductNutrition
          nutritionData={nutritionData}
          nutritionDesc={nutritionDesc}
          isChocolateBox={true}
          toggleIsNutritionOpen={toggleIsNutritionOpen}
        />
      )}
      {isCartOpen && (
        <ChocolateBoxCart
          toggleIsCartOpen={toggleIsCartOpen}
          handleContinue={handleContinue}
          handleCheckout={handleCheckout}
        />
      )}
    </>
  );
};
