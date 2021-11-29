import React, { Dispatch, FC, ReactNode, SetStateAction } from "react";
import { SlideSelectors } from "components/SlideSelectors";

interface IntroSectionProps {
  currentSlide: number;
  setCurrentSlide: Dispatch<SetStateAction<number>>;
  className: string;
  selectorsColor?: string;
  children: ReactNode;
}

export const Section: FC<IntroSectionProps> = ({
  currentSlide,
  setCurrentSlide,
  className,
  selectorsColor,
  children,
}: IntroSectionProps) => {
  return (
    <div className={"section " + className}>
      {children}
      <SlideSelectors
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
        color={selectorsColor}
      />
    </div>
  );
};
