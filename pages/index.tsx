import type { NextPage } from "next";
import { Menu } from "components/Menu";
import { Intro } from "components/Intro";
import { Container } from "components/Container";
import { WhereToFindUs } from "components/WhereToFindUs";
import { AboutUs } from "components/AboutUs";
import { ChocolateBoxes } from "components/ChocolateBoxes";
import { ChocolateBars } from "components/ChocolateBars";
import { Contact } from "components/Contact";

const Home: NextPage = () => {
  return (
    <Container>
      <Menu />
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
