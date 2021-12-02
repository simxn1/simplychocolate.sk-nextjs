import { Product } from "../lib/globalTypes";

export interface IChocolateBox extends Product {
  secondaryColor: string;
  price: number;
  pieces: number;
}

export const chocolateBoxes: IChocolateBox[] = [
  {
    name: "sharing is caring",
    firstLine: "sharing ",
    secondLine: "is caring",
    color: "#2a5284",
    secondaryColor: "#071f3e",
    price: 1200,
    pieces: 12,
    nutritionData: [
      "2123 kJ/507 kCal",
      "32 g",
      "19 g",
      "46 g",
      "44 g",
      "8,2 g",
      "0,24 g",
    ],
    nutritionDesc:
      "Kakaová hmota, cukor, kakaové maslo, celé MLIEKO v prášku, MANDLE, sušený kokos, karamelové chrumky, SÓJOVÁ bielkovina, emulgátor SÓJOVÝ lecitín, prírodná vanilková príchuť, sladké drievko, maliny (sušené mrazom), nerafinovaná morská soľ, soľ, citrónový olej, kávové zrná.",
    isSoldOut: true,
  },
  {
    name: "instead of flowers",
    firstLine: "instead ",
    secondLine: "of flowers",
    color: "#ef8599",
    secondaryColor: "#803547",
    price: 1200,
    pieces: 12,
    nutritionData: [
      "2123 kJ/507 kCal",
      "32 g",
      "19 g",
      "46 g",
      "44 g",
      "8,2 g",
      "0,24 g",
    ],
    nutritionDesc:
      "Kakaová hmota, cukor, kakaové maslo, celé MLIEKO v prášku, MANDLE, sušený kokos, karamelové chrumky, SÓJOVÁ bielkovina, emulgátor SÓJOVÝ lecitín, prírodná vanilková príchuť, sladké drievko, maliny (sušené mrazom), nerafinovaná morská soľ, soľ, citrónový olej, kávové zrná.",
  },
  {
    name: "yes you can buy love",
    firstLine: "yes you ",
    secondLine: "can buy love",
    color: "#82bbbd",
    secondaryColor: "#536d71",
    price: 2000,
    pieces: 24,
    nutritionData: [
      "2311 kJ/552 kCal",
      "36 g",
      "22 g",
      "46 g",
      "44 g",
      "8,4 g",
      "0,26 g",
    ],
    nutritionDesc:
      "Kakaová hmota, cukor, kakaové maslo, celé MLIEKO v prášku, MANDLE, sušený kokos, karamelové chrumky, SÓJOVÁ bielkovina, emulgátor SÓJOVÝ lecitín, prírodná vanilková príchuť, sladké drievko, maliny (sušené mrazom), nerafinovaná morská soľ, soľ, citrónový olej, kávové zrná.",
    isSoldOut: true,
  },
];
