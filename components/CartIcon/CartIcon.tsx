import { FC } from "react";
import { useCartContext } from "context/CartContext";
import { useRouter } from "next/router";
import styles from "styles/modules/CartIcon.module.css";

interface Props {}

export const CartIcon: FC<Props> = ({}: Props) => {
  const { isCartEmpty } = useCartContext();
  const router = useRouter();

  const handleGoToCart = () => {
    router.push("/mix");
  };

  return (
    <div className={styles.cartIcon} onClick={handleGoToCart}>
      {!isCartEmpty && <div className={styles.cartNotEmptyIndicator}>1</div>}
      <i className="fas fa-shopping-cart" />
    </div>
  );
};
