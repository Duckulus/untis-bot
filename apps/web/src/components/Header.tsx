import Link from "next/link";
import React from "react";

export const Header: React.FC = () => {
  return (
    <header className="p-4">
      <div className="container mx-auto">
        <div className="flex justify-between rounded bg-violet px-4 py-2 shadow shadow-black">
          <span>
            <Link href="/">Jamal</Link>
          </span>
          <nav>
            <ul className="flex">
              <li>
                <Link href="/register">Register</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
