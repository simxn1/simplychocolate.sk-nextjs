import type { NextPage } from "next";
import { Menu } from "components/Menu";
import { Intro } from "components/Intro";
import { Container } from "components/Container";
import { WhereToFindUs } from "components/WhereToFindUs";
import { AboutUs } from "components/AboutUs";
import { ChocolateBoxes } from "components/ChocolateBoxes";

const Home: NextPage = () => {
  return (
    <Container>
      <Menu />
      <Intro />
      <WhereToFindUs />
      <AboutUs />
      <ChocolateBoxes />
    </Container>
  );
};

export default Home;
