import React, { FC } from "react";
import ReactCompareImage from "react-compare-image";
import Typical from "react-typical";
import { description } from "data/intro";
import styles from "styles/modules/Intro/IntroDesktop.module.css";

interface Props {}

export const Desktop: FC<Props> = ({}: Props) => {
  return (
    <div className="intro section">
      <i className="fas fa-arrow-down" style={{ position: "absolute" }} />
      <ReactCompareImage
        leftImage="/img/intro/desktop/left.jpg"
        leftImageLabel={
          (
            <div className={"compare-image-left-section " + styles.left}>
              <h1
                className={"heading " + styles.heading}
                style={{ marginBottom: "0" }}
              >
                yes
                <br />
                you can
              </h1>
              <Typical
                steps={["", 1400, "BUY LOVE", 1200]}
                loop={Infinity}
                wrapper="h1"
                className={"heading " + styles.heading}
              />
              <img
                className={styles.icons}
                src="/img/intro/desktop/icons-white.png"
                alt={""}
              />
            </div>
          ) as unknown as string
        }
        rightImage="/img/intro/desktop/right.jpg"
        rightImageLabel={
          (
            <div className={styles.right}>
              <div className={styles.textContainer}>
                <h1 className={"heading " + styles.heading}>o nás</h1>
                <img
                  src="/img/intro/desktop/logo.png"
                  className={styles.logo}
                  alt={""}
                />
                <div className={styles.description}>
                  {description.map((paragraph) => {
                    return <p key={paragraph}>{paragraph}</p>;
                  })}
                </div>
              </div>
              <img
                className={"icons " + styles.icons}
                src="img/intro/desktop/icons-black.png"
              />
            </div>
          ) as unknown as string
        }
        handle={
          <div className={styles.handle}>
            <i className="fas fa-chevron-left" />
            <i className="fas fa-chevron-right" />
          </div>
        }
        sliderLineWidth={4}
      />
    </div>
  );
};
