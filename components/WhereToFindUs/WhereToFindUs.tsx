import React, { FC } from "react";
import { isMobile } from "react-device-detect";
import { Mobile } from "./variant/Mobile";
import { Desktop } from "./variant/Desktop";

interface WhereToFindUsProps {}

export const WhereToFindUs: FC<
  WhereToFindUsProps
> = ({}: WhereToFindUsProps) => {
  return isMobile ? <Mobile /> : <Desktop />;
};
