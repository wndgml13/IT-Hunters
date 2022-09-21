import { useNavigate } from "react-router-dom";

import { IQuest } from "../types/questType";

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
      onClick={() => navigate(`/posts/${questId}`)}
      className="flex p-[10px] mb-3 gap-x-[10px] bg-white rounded-lg border shadow-md hover:bg-gray-100 cursor-pointer relative"
    >
      <div className="w-[66px]">
        <div className="border rounded-[7px] mb-[5px] overflow-hidden">
          <img src={profileImg} alt="" className="w-[66px] h-[66px] " />
        </div>
        <p className="text-sm text-center border rounded-[10px] leading-4 px-[13px] text-ellipsis overflow-hidden">
          {nickname}
        </p>
      </div>
      {/* 밑에 width값 수정 필요할듯. */}
      <div className="w-[220px]">
        <h2 className="font-medium text-sm truncate mb-[5px]">{title}</h2>
        <p className="text-xs truncate">{content}</p>
        <p className="text-xs">시작일 : {createdAt?.slice(0, 10)}</p>
        <p className="text-xs">기한 : {duration}주</p>
        <ul className="flex">
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
