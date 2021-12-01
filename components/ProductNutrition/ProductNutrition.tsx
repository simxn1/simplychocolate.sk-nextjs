import React, { FC } from "react";
import { chocolateBoxFlavors, nutritionLabels } from "data/nutrition";
import styles from "styles/modules/ProductNutrition.module.css";

interface ProductNutritionProps {
  nutritionData: string[];
  nutritionDesc: string;
  isChocolateBox: boolean;
  toggleIsNutritionOpen: () => void;
}

export const ProductNutrition: FC<ProductNutritionProps> = ({
  nutritionData,
  nutritionDesc,
  isChocolateBox,
  toggleIsNutritionOpen,
}: ProductNutritionProps) => {
  let tableRows = [];
  for (let i = 0; i < nutritionLabels.length; i++) {
    tableRows.push(
      <tr key={nutritionLabels[i]}>
        <th>{nutritionLabels[i]}</th>
        <td>{nutritionData[i]}</td>
      </tr>
    );
  }

  return (
    <div className={styles.productNutrition}>
      <h3 className={styles.weight}>
        <strong>
          hmotnosť
          <br />
          tyčinky
        </strong>
        <br />
        40g
      </h3>
      <i className="fas fa-times" onClick={toggleIsNutritionOpen} />
      {isChocolateBox && (
        <div className={styles.flavors}>
          <h2 className={"heading " + styles.heading}>príchute</h2>
          <ul>
            {chocolateBoxFlavors.map((flavor) => {
              return <li key={flavor}>{flavor}</li>;
            })}
          </ul>
        </div>
      )}
      <div className={styles.description}>
        <h2 className={"heading " + styles.heading}>zloženie</h2>
        <p>{nutritionDesc}</p>
      </div>
      <div className={styles.nutritionTable}>
        <h2 className={"heading " + styles.heading}>
          energetická
          <br />
          hodnota
          <br />/ 100 G
        </h2>
        <table>{tableRows}</table>
      </div>
    </div>
  );
};
