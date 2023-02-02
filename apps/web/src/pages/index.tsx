import React from "react";
import type { NextPage } from "next";
import Link from "next/link";

const HomePage: NextPage = () => {
  return (
    <div>
      <h1>Welcome to Jamal</h1>
      <Link href="/register">Start using Jamal Now!</Link>
    </div>
  );
};

export default HomePage;
