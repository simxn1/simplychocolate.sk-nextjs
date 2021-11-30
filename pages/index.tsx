import type { NextPage } from "next";
import { Menu } from "components/Menu";
import { Intro } from "components/Intro";
import { Container } from "components/Container";
import { WhereToFindUs } from "components/WhereToFindUs";
import { AboutUs } from "../components/AboutUs";

const Home: NextPage = () => {
  return (
    <Container>
      <Menu />
      <Intro />
      <WhereToFindUs />
      <AboutUs />
    </Container>
  );
};

export default Home;
