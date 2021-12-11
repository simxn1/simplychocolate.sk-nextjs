import React from "react";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import { useRouter } from "next/router";
import styles from "styles/modules/Paid.module.css";
import { updateOrder } from "lib/api";

interface Props {
  valid: boolean;
}

const Paid: NextPage<Props> = ({ valid }: Props) => {
  const router = useRouter();

  return (
    <div className={styles.paid}>
      <h1>Ďakujeme za Vašu objednávku!</h1>
      <h2>
        {valid ? "Skontrolujte si prosím Váš email." : "Uhraďte prosím platbu."}
      </h2>
      <a onClick={() => router.push("/")}>späť domov</a>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const paymentDetails = context.query;
  const isCashCheckout = paymentDetails.ISCASH;

  let valid;

  if (isCashCheckout) {
    valid = true;
  } else {
    valid = await updateOrder(paymentDetails);
  }

  return {
    props: { valid },
  };
};

export default Paid;
