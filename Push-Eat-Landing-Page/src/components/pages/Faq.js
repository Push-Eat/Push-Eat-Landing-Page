import React from "react";
import { Helmet } from "react-helmet-async";
import FAQ from "../sections/FAQ";

const Faq = () => {
  return (
    <div style={{ paddingTop: '20px' }}>
      <Helmet>
        <title>Pusheat FAQ | How Bites, deals, and payments work</title>
        <meta
          name="description"
          content="Learn how to earn Bites, join deals, pay from your wallet, and get creator made meals delivered in Lagos."
        />
      </Helmet>
      <FAQ />
    </div>
  );
};

export default Faq;
