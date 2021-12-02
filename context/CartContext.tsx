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

const CartContext = createContext<ICartContext>({
  chocolateBoxesQuantity: null,
  setChocolateBoxesQuantity: null,
});

interface ICartContext {
  chocolateBoxesQuantity: number[] | null;
  setChocolateBoxesQuantity: Dispatch<SetStateAction<number[]>> | null;
}

interface Props {
  children: ReactNode;
}

export const CartContextWrapper: FC<Props> = ({ children }: Props) => {
  const [chocolateBoxesQuantity, setChocolateBoxesQuantity] = useState<
    number[]
  >(chocolateBoxes.map(() => 0));

  const shared: ICartContext = {
    chocolateBoxesQuantity,
    setChocolateBoxesQuantity,
  };

  return <CartContext.Provider value={shared}>{children}</CartContext.Provider>;
};

export function useCartContext(): ICartContext {
  return useContext(CartContext);
}
