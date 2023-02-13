import React from "react";
import Head from "next/head";

export interface BannerProps {
  imageUrl: string;
}

export const Banner: React.FC<BannerProps> = ({ imageUrl }) => {
  return (
    <Head>
      <meta name="twitter:image" content={imageUrl} />
      <meta property="og:image" content={imageUrl} />
    </Head>
  );
};
