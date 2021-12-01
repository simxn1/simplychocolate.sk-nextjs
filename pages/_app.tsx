import "react-responsive-carousel/lib/styles/carousel.min.css";
import "styles/globals.css";
import "styles/burger-menu.css";
import "styles/additional.css";
import type { AppProps } from "next/app";
import { CartContextWrapper } from "../context/CartContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartContextWrapper>
      <Component {...pageProps} />
    </CartContextWrapper>
  );
}

export default MyApp;
