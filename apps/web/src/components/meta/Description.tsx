import React from "react";
import Head from "next/head";

export interface DescriptionProps {
  children: string;
}

export const Description: React.FC<DescriptionProps> = ({ children }) => {
  return (
    <Head>
      <meta name="description" content={children} />
      <meta property="og:description" content={children} />
      <meta name="twitter:description" content={children} />
    </Head>
  );
};
