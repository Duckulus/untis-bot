import { NextPage } from "next";
import { ImBook, VscGithub } from "react-icons/all";

const AboutPage: NextPage = () => {
  return (
    <div className="grid place-items-center gap-2 text-center">
      <h1 className="mt-2 text-3xl underline">Links</h1>
      <ul className="gap-4">
        <li>
          <a target="_blank" href="https://github.com/frghackers/untis-bot">
            <div className="mt-10 flex max-w-xl  items-center gap-5 rounded-xl bg-neutral-700 px-10 py-2 hover:bg-neutral-500">
              <VscGithub size="100" />
              <h2 className="text-2xl font-bold">Github</h2>
            </div>
          </a>
        </li>
        <li>
          <a target="_blank" href="https://frghackers.xyz">
            <div className="mt-10 flex max-w-xl  items-center gap-5 rounded-xl bg-neutral-700 py-2 px-10  hover:bg-neutral-500">
              <ImBook size="100" />
              <h2 className="text-2xl font-bold">Blog</h2>
            </div>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AboutPage;
