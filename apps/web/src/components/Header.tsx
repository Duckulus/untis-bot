import Link from "next/link";
import React from "react";

export const Header: React.FC = () => {
  return (
    <header className="p-2 bg-neutral-800">
      <div className="flex justify-between container mx-auto">
        <span>
          <Link href="/">Untis Bot</Link>
        </span>
        <nav>
          <ul>
            <li>
              <Link href="/register">Register</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
