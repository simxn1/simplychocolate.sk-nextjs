import React, { Dispatch, FC, ReactNode, SetStateAction } from "react";
import { SlideSelectors } from "components/SlideSelectors";
import styles from "styles/modules/Intro.module.css";

interface IntroSectionProps {
  currentSlide: number;
  setCurrentSlide: Dispatch<SetStateAction<number>>;
  className: string;
  children: ReactNode;
}

export const Section: FC<IntroSectionProps> = ({
  currentSlide,
  setCurrentSlide,
  className,
  children,
}: IntroSectionProps) => {
  return (
    <div className={styles.section + " " + className}>
      {children}
      <SlideSelectors
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
      />
    </div>
  );
};
