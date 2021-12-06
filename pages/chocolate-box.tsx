import { NextPage } from "next";
import { useRouter } from "next/router";
import { ChocolateBoxCount } from "components/ChocolateBoxCount";
import { chocolateBoxes } from "data/chocolate-boxes";
import { useState } from "react";
import styles from "styles/modules/ChocolateBoxPage.module.css";
import { Back } from "components/Back";

const ChocolateBoxPage: NextPage = () => {
  const router = useRouter();

  const [errVisible, setErrVisible] = useState<boolean>(false);

  const handleBack = () => {
    router.back();
  };

  const handleCheckout = () => {};

  return (
    <div className={styles.chocolateBox}>
      <Back />
      <h1>Mám chuť aj na bonboniéry!</h1>
      <h2>Objednaj si Simply Chocolate už dnes!</h2>
      <ChocolateBoxCount />
      {errVisible && (
        <span className={styles.err}>Vyberte si množstvo bonboniér.</span>
      )}
      {chocolateBoxes.some((box) => box.isHalfDiscounted) && (
        <p
          style={{
            color: "#e51818cc",
            textAlign: "center",
            fontFamily: "Open Sans Bold",
          }}
        >
          Bonboniéram končí spotreba, máš ich so zľavou 50%
        </p>
      )}
      <button onClick={handleCheckout}>Mám všetko a chcem platiť</button>
    </div>
  );
};

export default ChocolateBoxPage;
