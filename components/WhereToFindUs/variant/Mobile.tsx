import React, { FC } from "react";
import Typical from "react-typical";
import styles from "styles/modules/WhereToFindUs/WhereToFindUsMobile.module.css";

interface Props {}

export const Mobile: FC<Props> = ({}: Props) => {
  return (
    <div className={"section " + styles.whereToFindUs}>
      <h1 className="heading">šampióni</h1>
      <Typical
        steps={["", 1400, "CHUTÍ", 1200]}
        loop={Infinity}
        wrapper="h1"
        className="heading"
      />
      <div className={styles.bars}>
        <img src="/img/where-to-find-us/mobile/bars.png" alt={""} />
      </div>
      <h2 className="heading">
        nájdete
        <br />
        nás
      </h2>
      <div className={styles.logo}>
        <img src="/img/where-to-find-us/mutual/terno.webp" alt={""} />
      </div>
      <div className={styles.logoPair}>
        <img src="/img/where-to-find-us/mutual/kraj.webp" alt={""} />
        <img src="/img/where-to-find-us/mutual/shell.webp" alt={""} />
      </div>
    </div>
  );
};
