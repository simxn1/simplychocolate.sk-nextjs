import { NextPage } from "next";
import { Back } from "components/Back";
import { useForm } from "react-hook-form";
import styles from "styles/modules/DeliveryInfo.module.css";
import { DeliveryInfoForm } from "lib/globalTypes";
import { useCartContext } from "context/CartContext";
import { useRouter } from "next/router";
import { inputs } from "data/delivery";

const DeliveryInfo: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const { setDeliveryInfo } = useCartContext();

  const continueCheckout = (data: DeliveryInfoForm) => {
    setDeliveryInfo && setDeliveryInfo(data);
    router.push("/payment-info");
  };

  return (
    <div className={styles.deliveryInfo}>
      <Back />
      <img className={styles.logo} src="/img/delivery-info/logo.png" alt="" />
      <h1>
        Čokoláda je odpoveď,
        <br />
        koho zaujíma aká je otázka?
      </h1>
      <h2>Priamo k tebe domov!</h2>
      <form onSubmit={handleSubmit(continueCheckout)}>
        {inputs.map(({ name, type, placeholder }) => {
          return (
            <input
              type={type}
              placeholder={placeholder}
              {...register(name, { required: true })}
              key={name}
            />
          );
        })}
        <button type="submit">Už iba krok k dokonalosti!</button>
      </form>
    </div>
  );
};

export default DeliveryInfo;
