import React, { FC, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import Typical from "react-typical";
import { SlideSelectors } from "components/SlideSelectors";
import { description } from "data/intro";
import styles from "styles/modules/Intro.module.css";

interface Props {}

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
      <div className={styles.section + " " + styles.first}>
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
        <SlideSelectors
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
        />
      </div>
      <div className={styles.section + " " + styles.second}>
        <SlideSelectors
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
        />
      </div>
      <div className="section">
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
        <SlideSelectors
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
          color="#000"
        />
      </div>
      <div
        style={{ backgroundImage: `url("img/intro/mobile/4.webp")` }}
        className="section"
      >
        <SlideSelectors
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
        />
      </div>
      <div
        style={{ backgroundImage: `url("img/intro/mobile/5.webp")` }}
        className="section"
      >
        <img
          className={styles.logoVertical}
          src="img/intro/mobile/logo-vertical.webp"
          alt={""}
        />
        <SlideSelectors
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
        />
      </div>
    </Carousel>
  );
};
