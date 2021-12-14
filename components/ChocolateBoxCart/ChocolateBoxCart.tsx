import { FC } from "react";
import styles from "styles/modules/ChocolateBoxes.module.css";
import { ChocolateBoxCount } from "components";

interface Props {
  toggleIsCartOpen: () => void;
  handleContinue: () => void;
  handleCheckout: () => void;
}

export const ChocolateBoxCart: FC<Props> = ({
  toggleIsCartOpen,
  handleContinue,
  handleCheckout,
}: Props) => {
  return (
    <div className={styles.cart}>
      <i className="fas fa-times" onClick={toggleIsCartOpen} />
      <h1 className="heading">máš chuť na čokolásku?</h1>
      <p>objednaj si Simply Chocolate už dnes!</p>
      <ChocolateBoxCount />
      <button onClick={handleContinue}>mám chuť aj na tyčinky</button>
      <button onClick={handleCheckout}>mám všetko a chcem platiť</button>
    </div>
  );
};
