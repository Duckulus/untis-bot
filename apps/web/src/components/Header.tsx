import Link from "next/link";
import React from "react";

export const Header: React.FC = () => {
  return (
    <header className="bg-neutral-800 p-2">
      <div className="container mx-auto flex justify-between">
        <span>
          <Link href="/">Jamal</Link>
        </span>
        <nav>
          <ul className="flex">
            <li>
              <Link href="/register">Register</Link>
            </li>
            <div className="w-4" />
            <li>
              <Link href="/about">About</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
