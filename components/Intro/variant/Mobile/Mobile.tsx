import React, { FC, ReactNode, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import Typical from "react-typical";
import { description } from "data/intro";
import styles from "styles/modules/Intro.module.css";
import { Section } from "./Section";

interface Props {}

const sections: { className: string; children: ReactNode }[] = [
  {
    className: styles.first,
    children: (
      <>
        <i className={"fas fa-arrow-down " + styles.arrowDown} />
        <h1 className={styles.heading}>
          yes
          <br />
          you can
        </h1>
        <Typical
          steps={["", 1400, "BUY LOVE", 1200]}
          loop={Infinity}
          wrapper="h1"
          className={styles.heading}
        />
      </>
    ),
  },
  { className: styles.second, children: null },
  {
    className: "",
    children: (
      <>
        <h1 className={styles.heading + " " + styles.descHeading}>o nás</h1>
        <img
          className={styles.descLogo}
          src="/img/intro/mobile/logo-black-nobreak.webp"
          alt={""}
        />
        <div className={styles.descText}>
          {description.map((paragraph) => {
            return (
              <>
                <p>{paragraph}</p>
                <br />
              </>
            );
          })}
        </div>
        <img
          className={styles.icons}
          src="/img/intro/mobile/icons-black.webp"
          alt={""}
        />
      </>
    ),
  },
  { className: styles.forth, children: null },
  {
    className: styles.fifth,
    children: (
      <img
        className={styles.logoVertical}
        src="img/intro/mobile/logo-vertical.webp"
        alt={""}
      />
    ),
  },
];

export const Mobile: FC<Props> = ({}: Props) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  return (
    <Carousel
      autoPlay={false}
      showThumbs={false}
      showIndicators={false}
      showArrows={false}
      showStatus={false}
      selectedItem={currentSlide}
      className={styles.carousel}
    >
      {sections.map((section) => {
        return (
          <Section
            currentSlide={currentSlide}
            setCurrentSlide={setCurrentSlide}
            className={section.className}
            key={section.className}
          >
            {section.children}
          </Section>
        );
      })}
    </Carousel>
  );
};
