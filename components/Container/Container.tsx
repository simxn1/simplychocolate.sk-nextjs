import React, { FC, ReactNode } from "react";
import styles from "styles/modules/Container.module.css";
import { isMobile } from "react-device-detect";

interface ContainerProps {
  children: ReactNode;
}

export const Container: FC<ContainerProps> = ({ children }: ContainerProps) => {
  const scrollSnapType = "y " + (isMobile ? "proximity" : "mandatory");

  return (
    <div className={styles.container} style={{ scrollSnapType }}>
      {children}
    </div>
  );
};
