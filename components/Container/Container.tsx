import React, { FC, ReactNode } from "react";
import styles from "styles/modules/Container.module.css";
import { isMobileOnly } from "react-device-detect";

interface ContainerProps {
  children: ReactNode;
}

export const Container: FC<ContainerProps> = ({ children }: ContainerProps) => {
  const scrollSnapType = "y " + (isMobileOnly ? "proximity" : "mandatory");

  return (
    <div className={styles.container} style={{ scrollSnapType }}>
      {children}
    </div>
  );
};
