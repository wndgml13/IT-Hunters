import { useNavigate } from "react-router-dom";

import { IQuest } from "../types/questType";

import convertDateText from "../lib/convertDateText";

import { FuIcon, DeIcon, FeIcon } from "../assets/icons";

export const QuestInSearch = ({ quest }: { quest: IQuest }) => {
  const navigate = useNavigate();
  const { questId, nickname, title, duration, classes, createdAt, profileImg } =
    quest;

  interface LooseObject {
    [key: string]: number | string;
  }
  const classesList: LooseObject = classes;
  const existStack = Object.keys(classesList).filter(
    item => classesList[item] !== 0,
  );

  return (
    <li
      onClick={() => navigate(`/posts/${questId}`)}
      className="flex  gap-x-[15px] bg-white p-6 my-3 border-b border-[#ebebeb] hover:bg-gray-100 cursor-pointer relative "
    >
      <div className="w-[66px]">
        <div className="rounded-[7px] mb-[6px] overflow-hidden">
          <img src={profileImg} className="w-[66px] h-[66px] " />
        </div>
        <p className="text-sm font-light text-center border border-black rounded-[10px] leading-4 px-[6px] line-clamp-1 py-[1px]">
          {nickname}
        </p>
      </div>
      <div className="flex-1  flex flex-col gap-y-[3px] relative">
        <h2 className="w-[70%] font-bold text-8 font-cookie mb-[2px] line-clamp-1">
          {title}
        </h2>

        <p className="text-xs text-[#c2c2c2] absolute right-0">
          {createdAt && convertDateText(createdAt)}
        </p>

        <p className="text-xs mt-3">기간 - {duration}주</p>
        <ul className="flex absolute left-0 bottom-0 justify-end">
          {existStack.map(stack => {
            switch (stack) {
              case "frontend":
                return (
                  <li key={stack}>
                    <FeIcon />
                  </li>
                );
              case "backend":
                return (
                  <li key={stack}>
                    <DeIcon />
                  </li>
                );
              case "designer":
                return (
                  <li key={stack}>
                    <DeIcon />
                  </li>
                );
              case "fullstack":
                return (
                  <li key={stack}>
                    <FuIcon />
                  </li>
                );
            }
          })}
        </ul>
      </div>
    </li>
  );
};
