import { FC } from "react";
import { boxSizes, Size } from "data/chocolate-bars";
import { stringifyPrice } from "lib/utils";
import styles from "styles/modules/ChocolateBarCart.module.css";

interface Props {
  toggleIsCartOpen: () => void;
  handleNewChocolateBarSize: (size: Size) => void;
  isHintVisible: boolean;
  handleCheckout: any;
  handleMix: any;
}

export const ChocolateBarCart: FC<Props> = ({
  handleCheckout,
  handleMix,
  toggleIsCartOpen,
  handleNewChocolateBarSize,
  isHintVisible,
}: Props) => {
  return (
    <div className={styles.cart}>
      <i className="fas fa-times" onClick={toggleIsCartOpen} />
      <h2>máš chuť na čokolásku?</h2>
      <h3>objednaj si Simply Chocolate už dnes!</h3>
      <h2>veľkosť</h2>
      <ul className={styles.boxSizes}>
        {boxSizes.map((boxSize) => (
          <li key={boxSize.size}>
            <button
              style={{ cursor: "pointer" }}
              onClick={() => handleNewChocolateBarSize(boxSize.size)}
            >
              <div>
                <strong>{boxSize.size} </strong>
              </div>
              - {boxSize.barCount}ks - {stringifyPrice(boxSize.price)}€
            </button>
          </li>
        ))}
      </ul>
      {isHintVisible && <span className={styles.hint}>vyber si veľkosť.</span>}
      <button style={{ color: `#fff` }} onClick={handleMix}>
        namixujem si vlastný box
      </button>
      <br />
      <button onClick={handleCheckout}>chcem túto príchuť</button>
    </div>
  );
};
