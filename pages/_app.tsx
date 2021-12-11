import "react-responsive-carousel/lib/styles/carousel.min.css";
import "styles/globals.css";
import "styles/burger-menu.css";
import "styles/additional.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { CartContextWrapper } from "context/CartContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <CartContextWrapper>
        <Component {...pageProps} />
      </CartContextWrapper>
    </>
  );
}

export default MyApp;
