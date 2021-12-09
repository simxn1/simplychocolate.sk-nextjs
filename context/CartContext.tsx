import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { chocolateBoxes } from "data/chocolate-boxes";
import { chocolateBars, Size } from "data/chocolate-bars";
import { calculateTotalPrice, setAndSaveToLocalStorage } from "lib/utils";
import {
  CartContextLocalStorageKeys,
  DeliveryInfoForm,
  PaymentMethod,
  ShippingMethod,
} from "lib/globalTypes";

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
  setDeliveryInfo?: Dispatch<
    SetStateAction<DeliveryInfoForm | null | undefined>
  >;
  orderId?: string | null;
  setOrderId?: Dispatch<SetStateAction<string | null>>;
  paymentMethod?: PaymentMethod | null;
  setPaymentMethod?: Dispatch<SetStateAction<PaymentMethod | null>>;
  shippingMethod?: ShippingMethod | null;
  setShippingMethod?: Dispatch<SetStateAction<ShippingMethod | null>>;
  deliveryPointPlaceId?: string | null;
  setDeliveryPointPlaceId?: Dispatch<SetStateAction<string | null>>;
  isDiscountApplied?: boolean;
  setIsDiscountApplied?: Dispatch<SetStateAction<boolean>>;
  discountCode?: string | null;
  setDiscountCode?: Dispatch<SetStateAction<string | null>>;
  clear?: () => void;
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

  const [deliveryInfo, setDeliveryInfo] = useState<
    DeliveryInfoForm | null | undefined
  >(null);

  const [orderId, setOrderId] = useState<string | null>(null);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    null
  );

  const [shippingMethod, setShippingMethod] = useState<ShippingMethod | null>(
    null
  );

  const [deliveryPointPlaceId, setDeliveryPointPlaceId] = useState<
    string | null
  >(null);

  const [isDiscountApplied, setIsDiscountApplied] = useState<boolean>(false);

  const [discountCode, setDiscountCode] = useState<string | null>(null);

  const isCartEmpty: boolean = useMemo(() => {
    return !(
      chocolateBarsQuantity.reduce((a, b) => a + b, 0) > 0 ||
      chocolateBoxesQuantity.reduce((a, b) => a + b, 0) > 0
    );
  }, [chocolateBarsQuantity, chocolateBoxesQuantity]);

  const clear = useCallback(() => {
    setChocolateBarsQuantity(chocolateBars.map(() => 0));
    setChocolateBoxesQuantity(chocolateBoxes.map(() => 0));
    setSelectedChocolateBarsBoxSize(null);
    setTotalPrice(0.0);
    setDeliveryInfo(null);
    setOrderId(null);
    setPaymentMethod(null);
    setShippingMethod(null);
    setDeliveryPointPlaceId(null);
    setIsDiscountApplied(false);
    setDiscountCode(null);

    localStorage.clear();
  }, []);

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

  const toGetFromLocalStorage = [
    {
      key: CartContextLocalStorageKeys.ChocolateBarsQuantity,
      setFunc: setChocolateBarsQuantity,
      state: chocolateBarsQuantity,
    },
    {
      key: CartContextLocalStorageKeys.SelectedChocolateBarsBoxSize,
      setFunc: setSelectedChocolateBarsBoxSize,
      state: selectedChocolateBarsBoxSize,
    },
    {
      key: CartContextLocalStorageKeys.ChocolateBoxesQuantity,
      setFunc: setChocolateBoxesQuantity,
      state: chocolateBoxesQuantity,
    },
    {
      key: CartContextLocalStorageKeys.TotalPrice,
      setFunc: setTotalPrice,
      state: totalPrice,
    },
  ];

  useEffect(() => {
    const lastUpdated = localStorage.getItem("lastUpdated")
      ? parseInt(JSON.parse(localStorage.getItem("lastUpdated") ?? ""))
      : false;
    const day = 86400000;
    const isNotOlderThanThreeDays = lastUpdated
      ? Date.now() - lastUpdated < 3 * day
      : false;

    if (isNotOlderThanThreeDays) {
      toGetFromLocalStorage.forEach((item) => {
        const itemValueFromLocalStorage = localStorage.getItem(item.key);
        if (itemValueFromLocalStorage) {
          const valueDeserialized = JSON.parse(itemValueFromLocalStorage);
          item.setFunc(valueDeserialized);
        }
      });
    } else clear();
  }, []);

  useEffect(() => {
    setChocolateBarsQuantity(chocolateBars.map(() => 0));
  }, [selectedChocolateBarsBoxSize]);

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
    orderId,
    setOrderId,
    paymentMethod,
    setPaymentMethod,
    shippingMethod,
    setShippingMethod,
    deliveryPointPlaceId,
    setDeliveryPointPlaceId,
    isDiscountApplied,
    setIsDiscountApplied,
    discountCode,
    setDiscountCode,
    isCartEmpty,
    clear,
  };

  return <CartContext.Provider value={shared}>{children}</CartContext.Provider>;
};

export function useCartContext(): ICartContext {
  return useContext(CartContext);
}
