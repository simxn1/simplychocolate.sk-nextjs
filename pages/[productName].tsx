import type { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { chocolateBoxes } from "data/chocolate-boxes";
import { chocolateBars } from "data/chocolate-bars";
import { useEffect } from "react";
import { paramCaseToLowerCase } from "lib/utils";
import { SectionId } from "../lib/globalTypes";

interface Props {
  productName: string;
}

const ProductRedirect: NextPage<Props> = ({ productName }: Props) => {
  const lowerCaseProductName = paramCaseToLowerCase(productName as string);

  useEffect(() => {
    let scrollTo = "";
    if (
      chocolateBoxes.find((product) => product.name === lowerCaseProductName)
    ) {
      scrollTo = "#" + SectionId.ChocolateBoxes;
    }
    if (
      chocolateBars.find((product) => product.name === lowerCaseProductName)
    ) {
      scrollTo = "#" + SectionId.ChocolateBars;
    }

    window.location.replace(
      window.location.origin +
        (productName?.length ? "?productName=" + productName : "") +
        scrollTo
    );
  });

  return null;
};

export const getServerSideProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  return {
    props: {
      productName: context?.params?.productName ?? "",
    },
  };
};

export default ProductRedirect;
