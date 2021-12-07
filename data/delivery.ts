import { DeliveryInfoForm } from "lib/globalTypes";

interface Input {
  type: string;
  name: keyof DeliveryInfoForm;
  placeholder: string;
}

export const inputs: Input[] = [
  {
    type: "text",
    name: "firstName",
    placeholder: "Meno",
  },
  {
    type: "text",
    name: "lastName",
    placeholder: "Priezvisko",
  },
  {
    type: "email",
    name: "email",
    placeholder: "Email",
  },
  {
    type: "text",
    name: "phone",
    placeholder: "Telefónne číslo",
  },
  {
    type: "text",
    name: "address",
    placeholder: "Ulica",
  },
  {
    type: "text",
    name: "city",
    placeholder: "Mesto",
  },
  {
    type: "text",
    name: "country",
    placeholder: "Krajina",
  },
  {
    type: "text",
    name: "zipCode",
    placeholder: "PSČ",
  },
];
