import React, { FC } from "react";
import { isMobile } from "react-device-detect";
import { Mobile } from "./variant/Mobile";
import { Desktop } from "./variant/Desktop";

interface IntroProps {}

export const Intro: FC<IntroProps> = ({}: IntroProps) => {
  return isMobile ? <Mobile /> : <Desktop />;
};
