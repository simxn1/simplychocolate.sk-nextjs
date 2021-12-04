import { FC } from "react";
import Typical from "react-typical";
import styles from "styles/modules/CompareImgHint.module.css";

interface Props {}

export const CompareImgHint: FC<Props> = ({}: Props) => {
  return (
    <div className={styles.hint}>
      <img src="/img/chocolate-bars/desktop/hint.png" alt="" />
      <Typical
        steps={["", 3000, "rozbaľ ma!", 500]}
        wrapper="h3"
        loop={Infinity}
      />
    </div>
  );
};
