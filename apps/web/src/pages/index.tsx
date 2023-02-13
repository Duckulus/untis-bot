import React from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { Title } from "@/components/meta/Title";

const HomePage: NextPage = () => {
  return (
    <>
      <Title>Welcome to Jamal</Title>
      <div className="p-2">
        <div className="container mx-auto grid h-64 content-center gap-2">
          <div className="m-16 flex flex-col gap-y-4">
            <h1 className="text-8xl text-tea">Jamal</h1>
            <span className="text-2xl">
              A bot that notifies you about important school events and canceled
              lessons
            </span>
            <div>
              <Link href="/register" className="rounded bg-violet py-2 px-4">
                <span>Register Now!</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
