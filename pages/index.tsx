import type { NextPage } from "next";
import { Menu } from "components/Menu";
import { Intro } from "components/Intro";
import { Container } from "../components/Container";

const Home: NextPage = () => {
  return (
    <Container>
      <Menu />
      <Intro />
    </Container>
  );
};

export default Home;
