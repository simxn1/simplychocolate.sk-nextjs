import React, { FC } from "react";
import { isMobileOnly } from "react-device-detect";
import { Mobile } from "./variant/Mobile";
import { Desktop } from "./variant/Desktop";

interface IntroProps {}

export const Intro: FC<IntroProps> = ({}: IntroProps) => {
  return isMobileOnly ? <Mobile /> : <Desktop />;
};
