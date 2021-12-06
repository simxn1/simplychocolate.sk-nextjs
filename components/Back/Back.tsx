import styles from "styles/modules/Back.module.css";
import { FC } from "react";
import { useRouter } from "next/router";

interface Props {}

export const Back: FC<Props> = ({}: Props) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <span onClick={handleBack} className={styles.back}>
      <i className="fas fa-long-arrow-alt-left" />
    </span>
  );
};
