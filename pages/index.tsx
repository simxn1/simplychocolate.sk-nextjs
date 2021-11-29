import type { NextPage } from "next";
import { Menu } from "components/Menu";
import { Intro } from "components/Intro";
import { Container } from "components/Container";
import { WhereToFindUs } from "components/WhereToFindUs";

const Home: NextPage = () => {
  return (
    <Container>
      <Menu />
      <Intro />
      <WhereToFindUs />
    </Container>
  );
};

export default Home;
