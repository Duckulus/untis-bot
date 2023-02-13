import React from "react";
import Head from "next/head";

export interface TitleProps {
  children: string;
}

export const Title: React.FC<TitleProps> = ({ children }) => {
  return (
    <Head>
      <title>{children}</title>
      <meta key="title" name="title" content={children} />
      <meta property="og:title" content={children} />
      <meta name="twitter:title" content={children} />
    </Head>
  );
};
