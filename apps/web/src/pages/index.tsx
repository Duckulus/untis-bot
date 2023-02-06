import React from "react";
import type { NextPage } from "next";
import Link from "next/link";

const HomePage: NextPage = () => {
  return (
    <div>
      <div className="grid h-64 content-center gap-2">
        <h1 className="text-center text-6xl">Welcome to Untis Bot</h1>
        <div className="flex justify-center">
          <Link href="/register" className="rounded bg-neutral-800 py-2 px-4">
            <span>Start using Untis Bot Now!</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
