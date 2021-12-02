export interface Product {
  name: string;
  color: string;
  firstLine: string;
  secondLine: string;
  nutritionData: string[];
  nutritionDesc: string;
  isSoldOut?: boolean;
  isHalfDiscounted?: boolean;
}
