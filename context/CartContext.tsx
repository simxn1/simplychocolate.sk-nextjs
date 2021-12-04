import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { chocolateBoxes } from "data/chocolate-boxes";
import { chocolateBars } from "data/chocolate-bars";

interface ICartContext {
  chocolateBoxesQuantity: number[] | null;
  setChocolateBoxesQuantity: Dispatch<SetStateAction<number[]>> | null;
  chocolateBarsQuantity: number[] | null;
  setChocolateBarsQuantity: Dispatch<SetStateAction<number[]>> | null;
  totalChocolateBarsQuanity: number | null;
  setTotalChocolateBarsQuanity: Dispatch<SetStateAction<number>> | null;
}

const CartContext = createContext<ICartContext>({
  chocolateBoxesQuantity: null,
  setChocolateBoxesQuantity: null,
  chocolateBarsQuantity: null,
  setChocolateBarsQuantity: null,
  totalChocolateBarsQuanity: null,
  setTotalChocolateBarsQuanity: null,
});

interface Props {
  children: ReactNode;
}

export const CartContextWrapper: FC<Props> = ({ children }: Props) => {
  const [chocolateBoxesQuantity, setChocolateBoxesQuantity] = useState<
    number[]
  >(chocolateBoxes.map(() => 0));

  const [chocolateBarsQuantity, setChocolateBarsQuantity] = useState<number[]>(
    chocolateBars.map(() => 0)
  );

  const [totalChocolateBarsQuanity, setTotalChocolateBarsQuanity] =
    useState<number>(0);

  const shared: ICartContext = {
    chocolateBoxesQuantity,
    setChocolateBoxesQuantity,
    chocolateBarsQuantity,
    setChocolateBarsQuantity,
    totalChocolateBarsQuanity,
    setTotalChocolateBarsQuanity,
  };

  return <CartContext.Provider value={shared}>{children}</CartContext.Provider>;
};

export function useCartContext(): ICartContext {
  return useContext(CartContext);
}
