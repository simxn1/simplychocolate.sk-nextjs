import "react-responsive-carousel/lib/styles/carousel.min.css";
import "styles/globals.css";
import "styles/burger-menu.css";
import "styles/additional.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
