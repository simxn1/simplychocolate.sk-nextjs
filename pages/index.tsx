import type { NextPage } from "next";
import {
  AboutUs,
  CartIcon,
  ChocolateBars,
  ChocolateBoxes,
  Contact,
  Container,
  Intro,
  Menu,
  WhereToFindUs,
} from "components";

const Home: NextPage = () => {
  return (
    <Container>
      <Menu />
      <CartIcon />
      <Intro />
      <WhereToFindUs />
      <AboutUs />
      <ChocolateBoxes />
      <ChocolateBars />
      <Contact />
    </Container>
  );
};

export default Home;
