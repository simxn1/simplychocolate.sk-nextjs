import { FC, Fragment, useState } from "react";
import Typical from "react-typical";
import ReactCompareImage from "react-compare-image";
import {
  ProductNutritionButton,
  CompareImgHint,
  ChocolateBarVariantProps,
} from "components";
import styles from "styles/modules/ChocolateBar/ChocolateBarDesktop.module.css";

export const Desktop: FC<ChocolateBarVariantProps> = ({
  chocolateBar,
  toggleIsCartOpen,
  toggleIsNutritionOpen,
}: ChocolateBarVariantProps) => {
  const {
    name,
    color,
    desc,
    isHalfDiscounted,
    isSoldOut,
    icons,
    firstLine,
    secondLine,
    thirdLine,
  } = chocolateBar;

  const [isHoveredCTAButton, setIsHoveredCTAButton] = useState<boolean>(false);

  const toggleHoveredCTAButton = () => {
    setIsHoveredCTAButton((prevValue) => {
      return !prevValue;
    });
  };

  const nameSplit = name.split(" ");

  return (
    <>
      <div className="section">
        {!isSoldOut && (
          <button
            onMouseEnter={toggleHoveredCTAButton}
            onMouseLeave={toggleHoveredCTAButton}
            onClick={toggleIsCartOpen}
            style={{
              color: isHoveredCTAButton ? "#fff" : color,
              backgroundColor: isHoveredCTAButton ? color : "",
            }}
            className={"cta-animation " + styles.cta}
          >
            chcem túto tyčinku!
          </button>
        )}
        <ProductNutritionButton
          handleClick={toggleIsNutritionOpen}
          top="20vh"
          left="28vw"
          fontSize="1em"
        />
        <ReactCompareImage
          leftImage={`/img/chocolate-bars/desktop/bg/${name.replace(
            / /g,
            ""
          )}.png`}
          leftImageLabel={
            (
              <div
                onClick={toggleIsCartOpen}
                className={"compare-image-left-section " + styles.left}
              >
                <CompareImgHint />
                <h1 className={"heading " + styles.heading}>
                  {nameSplit[0]}
                  <br />
                  {isHalfDiscounted ? (
                    nameSplit[1]
                  ) : (
                    <>
                      <Typical
                        steps={["", 1400, nameSplit[1], 1200]}
                        loop={Infinity}
                        wrapper="div"
                      />
                    </>
                  )}
                  {isHalfDiscounted && (
                    <img
                      src="/img/mutual/sale.png"
                      alt=""
                      className={styles.sale}
                    />
                  )}
                </h1>
                {isSoldOut ? (
                  <div className={styles.soldOut}>vypredané</div>
                ) : (
                  <div>
                    <strong
                      className={styles.price}
                      style={{
                        textDecoration: isHalfDiscounted ? "line-through" : "",
                      }}
                    >
                      2,29 €
                    </strong>
                    {isHalfDiscounted && (
                      <strong className={styles.discountPrice}>1,25 €</strong>
                    )}
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
                  src={`/img/chocolate-bars/desktop/icons/${icons}.png`}
                  className={styles.icons}
                  alt={""}
                />
              </div>
            ) as unknown as string
          }
          rightImage={`/img/chocolate-bars/desktop/bg/${name.replace(
            / /g,
            ""
          )}-white.png`}
          rightImageLabel={
            (
              <div className={styles.right}>
                <h1 style={{ color }} className={styles.heading}>
                  {nameSplit[0]}
                  <br />
                  {nameSplit[1]}
                  <br />
                  {isHalfDiscounted && (
                    <img
                      src="/img/mutual/sale.png"
                      alt=""
                      className={styles.sale}
                    />
                  )}
                </h1>
                {isSoldOut ? (
                  <div className={styles.soldOut}>vypredané</div>
                ) : (
                  <div>
                    <strong
                      style={{
                        color,
                        textDecoration: isHalfDiscounted ? "line-through" : "",
                      }}
                      className={styles.price}
                    >
                      2,29 €
                    </strong>
                    {isHalfDiscounted && (
                      <strong
                        style={{ bottom: "6em" }}
                        className={styles.discountPrice}
                      >
                        1,25 €
                      </strong>
                    )}
                  </div>
                )}
                <p className={styles.desc}>{desc}</p>
              </div>
            ) as unknown as string
          }
          handle={<Fragment />}
        />
      </div>
    </>
  );
};
