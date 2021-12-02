import { FC } from "react";
import { Carousel } from "react-responsive-carousel";
import { aboutUsSections } from "data/about-us";
import { AboutUsSection } from "components/AboutUsSection";
import styles from "styles/modules/AboutUs.module.css";

interface AboutUsProps {}

export const AboutUs: FC<AboutUsProps> = ({}: AboutUsProps) => {
  return (
    <Carousel
      autoPlay={false}
      showThumbs={false}
      showArrows={false}
      showStatus={false}
      className={"section " + styles.carousel}
    >
      {aboutUsSections.map(({ bg, desc, heading, icon }) => {
        return (
          <AboutUsSection
            bg={bg}
            icon={icon}
            heading={heading}
            desc={desc}
            key={bg}
          />
        );
      })}
    </Carousel>
  );
};
