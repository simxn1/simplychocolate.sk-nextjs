import { FC } from "react";
import { isMobileOnly } from "react-device-detect";
import styles from "styles/modules/AboutUs.module.css";

export interface AboutUsSectionProps {
  bg: string;
  icon: string;
  heading: string;
  desc: string;
}

export const AboutUsSection: FC<AboutUsSectionProps> = ({
  bg,
  desc,
  heading,
  icon,
}: AboutUsSectionProps) => {
  const imgDir = isMobileOnly ? "mobile" : "desktop";

  return (
    <div
      className={"section " + styles.section}
      style={{ backgroundImage: `url("/img/about-us/${imgDir}/${bg}.png")` }}
    >
      <img
        className={styles.icon}
        src={`/img/about-us/mutual/${icon}.webp`}
        alt={""}
      />
      <h1 className={"heading " + styles.heading}>{heading}</h1>
      <p className={styles.desc}>{desc}</p>
    </div>
  );
};
