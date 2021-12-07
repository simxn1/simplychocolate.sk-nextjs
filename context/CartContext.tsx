import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { chocolateBoxes } from "data/chocolate-boxes";
import { chocolateBars, Size } from "data/chocolate-bars";
import { calculateTotalPrice, setAndSaveToLocalStorage } from "lib/utils";
import { CartContextLocalStorageKeys, DeliveryInfoForm } from "lib/globalTypes";

interface ICartContext {
  chocolateBoxesQuantity?: number[];
  setChocolateBoxesQuantity?: Dispatch<SetStateAction<number[]>>;
  chocolateBarsQuantity?: number[];
  setChocolateBarsQuantity?: Dispatch<SetStateAction<number[]>>;
  selectedChocolateBarsBoxSize?: Size | null;
  setSelectedChocolateBarsBoxSize?: Dispatch<SetStateAction<Size | null>>;
  totalPrice?: number;
  setTotalPrice?: Dispatch<SetStateAction<number>>;
  isCartEmpty?: boolean;
  deliveryInfo?: DeliveryInfoForm | null;
  setDeliveryInfo?: Dispatch<SetStateAction<DeliveryInfoForm | null>>;
}

const CartContext = createContext<ICartContext>({});

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

  const [selectedChocolateBarsBoxSize, setSelectedChocolateBarsBoxSize] =
    useState<Size | null>(null);

  const [totalPrice, setTotalPrice] = useState<number>(0);

  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfoForm | null>(
    null
  );

  const isCartEmpty: boolean = useMemo(() => {
    return !(
      chocolateBarsQuantity.reduce((a, b) => a + b, 0) > 0 ||
      chocolateBoxesQuantity.reduce((a, b) => a + b, 0) > 0
    );
  }, [chocolateBarsQuantity, chocolateBoxesQuantity]);

  useEffect(() => {
    const newTotalPrice = calculateTotalPrice(
      selectedChocolateBarsBoxSize,
      chocolateBarsQuantity,
      chocolateBoxesQuantity
    );

    setAndSaveToLocalStorage<number>(
      newTotalPrice,
      setTotalPrice,
      CartContextLocalStorageKeys.TotalPrice
    );
  }, [
    chocolateBoxesQuantity,
    chocolateBarsQuantity,
    selectedChocolateBarsBoxSize,
  ]);

  const shared: ICartContext = {
    chocolateBoxesQuantity,
    setChocolateBoxesQuantity,
    chocolateBarsQuantity,
    setChocolateBarsQuantity,
    selectedChocolateBarsBoxSize,
    setSelectedChocolateBarsBoxSize,
    totalPrice,
    setTotalPrice,
    deliveryInfo,
    setDeliveryInfo,
    isCartEmpty,
  };

  return <CartContext.Provider value={shared}>{children}</CartContext.Provider>;
};

export function useCartContext(): ICartContext {
  return useContext(CartContext);
}
