import React from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { Title } from "@/components/meta/Title";

const HomePage: NextPage = () => {
  return (
    <>
      <Title>Welcome to Jamal</Title>
      <div className="grid h-64 content-center gap-2 bg-gradient-to-br from-cyan-500 to-blue-500 text-white">
        <h1 className="text-center text-6xl">Welcome to Jamal</h1>
        <div className="flex justify-center">
          <Link href="/register" className="rounded bg-neutral-800 py-2 px-4">
            <span>Start using Jamal Now!</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;
