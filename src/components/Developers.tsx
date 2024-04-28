import { LuGithub, LuInstagram, LuLinkedin, LuMail } from "react-icons/lu";
import { TEAM } from "@/lib/constants";
import { v4 as uuidv4 } from "uuid";

const Developers = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold my-8 text-center">
        Developers at DOSA Office
      </h2>
      <div className="flex flex-wrap justify-center gap-5">
        {TEAM.map((teamMember) => (
          <div
            key={uuidv4()}
            className="hover:scale-105 transition-all duration-300 flex flex-col justify-center w-full sm:w-[250px] p-6 shadow-xl border-2 rounded-xl"
          >
            <img
              src={teamMember.image}
              alt=""
              className="w-32 h-32 mx-auto rounded-fullaspect-square"
            />
            <div className="space-y-4 text-center divide-y">
              <div className="my-2 space-y-1">
                <h2 className="text-xl font-semibold sm:text-2xl">
                  {teamMember.name}
                </h2>
                <p className="px-5 text-xs sm:text-base ">{teamMember.role}</p>
              </div>
              <div className="flex justify-center pt-2 space-x-4 align-center">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={teamMember.github}
                  aria-label="GitHub"
                  className="p-2 rounded-md  hover:dark:text-red-500"
                >
                  <LuGithub />
                </a>
                <a
                  rel="noopener noreferrer"
                  href={teamMember.linkedin}
                  aria-label="linkedin"
                  target="_blank"
                  className="p-2 rounded-md  hover:dark:text-red-500"
                >
                  <LuLinkedin />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={teamMember.instagram}
                  aria-label="instagram"
                  className="p-2 rounded-md  hover:dark:text-red-500"
                >
                  <LuInstagram />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={"mailto:" + teamMember.email}
                  aria-label="Email"
                  className="p-2 rounded-md  hover:dark:text-red-500"
                >
                  <LuMail />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Developers;
