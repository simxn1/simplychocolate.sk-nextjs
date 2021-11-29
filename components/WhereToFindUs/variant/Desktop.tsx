import React, { FC } from "react";
import Typical from "react-typical";
import styles from "styles/modules/WhereToFindUs/WhereToFindUsDesktop.module.css";

interface Props {}

export const Desktop: FC<Props> = ({}: Props) => {
  return (
    <div className={"section " + styles.whereToFindUs}>
      <h1 className="heading">
        šampióni
        <br />
        <Typical
          steps={["", 1400, "CHUTÍ", 1200]}
          loop={Infinity}
          wrapper="div"
          className="heading"
        />
      </h1>
      <h2 className="heading">
        kde
        <br /> nás
        <br />
        <Typical
          steps={["", 3000, "nájdete?", 500]}
          wrapper="div"
          loop={Infinity}
        />
      </h2>
      <div className={styles.logoImgList}>
        <img src="/img/where-to-find-us/mutual/terno.webp" alt={""} />
        <img src="/img/where-to-find-us/mutual/kraj.webp" alt={""} />
        <img
          src="/img/where-to-find-us/mutual/shell.webp"
          style={{ marginTop: "0.75%" }}
          alt={""}
        />
      </div>
      <div className={styles.barImgList}>
        <img src="/img/where-to-find-us/desktop/bar-1.png" alt={""} />
        <img src="/img/where-to-find-us/desktop/bar-2.png" alt={""} />
        <img src="/img/where-to-find-us/desktop/bar-3.png" alt={""} />
      </div>
    </div>
  );
};
