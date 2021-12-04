import { FC, SyntheticEvent, useState } from "react";
import Link from "next/link";
import emailjs from "emailjs-com";
import Typical from "react-typical";
import { isMobileOnly } from "react-device-detect";
import styles from "styles/modules/Contact.module.css";

interface ContactProps {}

export const Contact: FC<ContactProps> = ({}: ContactProps) => {
  const [isSentIndicatorOpen, setIsSentIndicatorOpen] =
    useState<boolean>(false);

  const toggleIsSentIndicatorOpen = () => {
    setIsSentIndicatorOpen((prevState) => !prevState);
  };

  const closeSentIndicator = () => {
    setIsSentIndicatorOpen(false);
  };

  const sendEmail = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE ?? "",
        process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE ?? "",
        form,
        process.env.NEXT_PUBLIC_EMAIL_JS_USER ?? ""
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );

    form.reset();
    toggleIsSentIndicatorOpen();
  };

  return (
    <div className={"section " + styles.contact} onClick={closeSentIndicator}>
      <h1 className="heading">
        máš <br />
        <Typical
          steps={["", 1400, "OTÁZKU?", 1200]}
          loop={Infinity}
          wrapper="div"
        />
      </h1>
      <h2 className="heading">
        neváhaj nás <br />
        kontaktovať
      </h2>
      {!isMobileOnly && (
        <>
          <div>
            <img
              className={styles.logo}
              src="/img/contact/logo.webp"
              alt={""}
            />
          </div>
          <div className={styles.contactMethods}>
            <a href="tel:+421904130824">+421 904 130 824</a>
            <a href="mailto:info@simplychocolate.sk">info@simplychocolate.sk</a>
          </div>
        </>
      )}
      <form className={styles.form} onSubmit={sendEmail}>
        <div className={styles.section}>
          <input type="text" name="name" placeholder="Meno" required />
          <input type="email" name="email" placeholder="Email" required />
        </div>
        <div className={styles.section}>
          <input
            type="text"
            name="phone"
            placeholder="Telefónne číslo"
            required
          />
          <input type="text" name="subject" placeholder="Predmet" required />
        </div>
        <textarea name="message" placeholder="Správa" required />
        <label>
          <input type="checkbox" required />
          Súhlasím so{" "}
          <a>
            <Link href="/pdf/zasady-ochrany-osobnych-udajov.pdf">
              spracovaním osobných údajov
            </Link>
          </a>
          .
        </label>
        <div className={styles.buttonContainer}>
          <button type="submit">Odoslať</button>
        </div>
      </form>
      {isSentIndicatorOpen && (
        <div className={styles.sentConfirm}>
          správa
          <br />
          odoslaná!
          <br />
          <i className="fas fa-check" />
        </div>
      )}
    </div>
  );
};
