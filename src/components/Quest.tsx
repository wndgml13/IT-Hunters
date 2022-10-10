import { useNavigate } from "react-router-dom";

import { IQuest } from "../types/questType";

import convertDateText from "../lib/convertDateText";

import { FuIcon, DeIcon, FeIcon } from "../assets/icons";

export const Quest = ({ quest }: { quest: IQuest }) => {
  const navigate = useNavigate();
  const {
    questId,
    nickname,
    content,
    title,
    duration,
    classes,
    createdAt,
    profileImg,
    recentQuestId,
    mainQuestId,
  } = quest;

  interface LooseObject {
    [key: string]: number | string;
  }
  const classesList: LooseObject = classes;
  const existStack = Object.keys(classesList).filter(
    item => classesList[item] !== 0,
  );

  return (
    <li
      onClick={() =>
        navigate(
          `/posts/${
            questId ? questId : mainQuestId ? mainQuestId : recentQuestId
          }`,
        )
      }
      className="flex p-[10px] gap-x-[15px] bg-white rounded-lg border border-black shadow-md hover:bg-gray-100 cursor-pointer relative "
    >
      <div className="w-[66px]">
        <div className="border border-black rounded-[7px] mb-[5px] overflow-hidden">
          <img src={profileImg} alt="" className="w-[66px] h-[66px] " />
        </div>
        <p className="text-sm text-center border border-black rounded-[10px] leading-4 px-[13px] line-clamp-1 py-[1px]">
          {nickname}
        </p>
      </div>
      <div className="flex-1  flex flex-col gap-y-[3px] w-[75%] ">
        <h2 className="font-bold text-sm mb-[2px] line-clamp-1 truncate">
          {title}
        </h2>
        <p className="text-xs text-ellipsis overflow-hidden line-clamp-2 mb-[3px] truncate">
          {content}
        </p>
        <p className="text-xs">
          등록일 : {createdAt && convertDateText(createdAt)}
        </p>

        <p className="text-xs">기한 : {duration}주</p>
        <ul className="flex absolute right-[10px] bottom-[10px] justify-end">
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
