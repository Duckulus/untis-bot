import React from "react";
import { ImBook } from "react-icons/im";
import { VscGithub } from "react-icons/vsc";

export const Footer: React.FC = () => {
  return (
    <footer className="px-2">
      <div className="container mx-auto bg-violet rounded-t p-4 flex justify-between">
        <span>Jamal 2023</span>
        <ul className="flex gap-x-4">
          <li>
            <a
              className="flex gap-x-2"
              target="_blank"
              rel="noreferrer"
              href="https://github.com/frghackers/untis-bot"
            >
              <span>GitHub</span>
              <VscGithub size={24} />
            </a>
          </li>
          <li>
            <a
              className="flex gap-x-2"
              target="_blank"
              rel="noreferrer"
              href="https://frghackers.xyz"
            >
              <span>Blog</span>
              <ImBook size={24} />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};
