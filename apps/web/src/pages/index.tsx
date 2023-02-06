import React from "react";
import type { NextPage } from "next";
import Link from "next/link";

const HomePage: NextPage = () => {
  return (
    <div>
      <div className="h-64 grid content-center gap-2">
        <h1 className="text-6xl text-center">Welcome to Untis Bot</h1>
        <div className="flex justify-center">
          <Link href="/register" className="rounded py-2 px-4 bg-neutral-800">
            <span>Start using Untis Bot Now!</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
