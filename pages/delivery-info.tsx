import { NextPage } from "next";
import { useMemo } from "react";
import { Back } from "components/Back";
import { useForm } from "react-hook-form";
import styles from "styles/modules/DeliveryInfo.module.css";
import { DeliveryInfoForm } from "lib/globalTypes";
import { useCartContext } from "context/CartContext";

const DeliveryInfo: NextPage = () => {
  const { register, handleSubmit } = useForm();
  const { setDeliveryInfo } = useCartContext();

  const inputs: { type: string; name: string; placeholder: string }[] =
    useMemo(() => {
      return [
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
          placeholder: "Telefónne číslo (09XX...)",
        },
        {
          type: "text",
          name: "address",
          placeholder: "Ulica s číslom",
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
    }, []);

  const continueCheckout = (data: DeliveryInfoForm) => {
    setDeliveryInfo && setDeliveryInfo(data);
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
