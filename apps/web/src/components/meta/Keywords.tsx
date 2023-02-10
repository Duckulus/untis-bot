import React from "react";
import Head from "next/head";

export interface KeywordsProps {
  keywords: string[];
}

export const Keywords: React.FC<KeywordsProps> = ({ keywords }) => {
  return (
    <Head>
      <meta name="keywords" content={keywords.join(",")} />
    </Head>
  );
};
