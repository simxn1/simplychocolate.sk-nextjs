import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "styles/modules/Paid.module.css";

const Paid: NextPage = () => {
  const router = useRouter();
  const paymentDetails = router.query;

  const [isOrderPaid, setIsOrderPaid] = useState(false);

  const paymentId = paymentDetails["VS"];

  useEffect(() => {
    if (paymentDetails["RESULT"] === "OK") {
      if (paymentId) {
        (async () => {
          const res = await window.fetch("/api/update-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(paymentDetails),
          });
          const json = await res.json();

          if (json.VALID) {
            setIsOrderPaid(true);
          }
        })();
      }
    }
  }, []);

  return (
    <div className={styles.paid}>
      <h1>Ďakujeme za Vašu objednávku!</h1>
      <h2>
        {isOrderPaid || Object.keys(paymentDetails).length === 0
          ? "Skontrolujte si prosím Váš email."
          : "Uhraďte prosím platbu."}
      </h2>
      <a onClick={() => router.push("/")}>späť domov</a>
    </div>
  );
};

export default Paid;
