import { useState } from "react";
import { useSetRecoilState } from "recoil";
import classNames from "classnames";
import { modalState } from "../../store/modalState";
import { DurationRange } from "../DurationRange";
import { StackListDropdwon } from "../StackListDropdown";
import { IFilter } from "../../types/search";

export const SearchFilter = ({
  setFilters,
  filters: { classType, stack, duration },
}: {
  setFilters: React.Dispatch<React.SetStateAction<IFilter>>;
  filters: IFilter;
}) => {
  const setModal = useSetRecoilState(modalState);
  const [classes, setClasses] = useState<string[]>([...classType]);
  const [stacks, setStacks] = useState<string[]>([...stack]);
  const [durationWeek, setDurationWeek] = useState<number>(duration);

  const onSubmitFilter = () => {
    setFilters(prev => ({
      ...prev,
      classType: classes,
      stack: stacks,
      duration: durationWeek,
    }));
    setModal(false);
  };

  const onSelectClass = (key: string) => {
    if (classes.includes(key)) {
      setClasses(prev => prev.filter(v => v !== key));
      return;
    }
    setClasses(prev => [...prev, key]);
  };
  const classStyle =
    "inline-flex item-center p-3 text-[14px] text-gray-300 w-full border border-gray-300 cursor-pointer";

  return (
    <div className="h-full w-full absolute top-0 left-0 z-50 flex bg-white">
      <div className="w-full bg-white z-50 ">
        <div className="flex mt-4 px-[25px]">
          <button
            type="button"
            className="mr-4 hover:bg-gray-200 text-2xl"
            onClick={() => setModal(false)}
          >
            <svg
              width="10"
              height="20"
              viewBox="0 0 12 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.5606 2.48233C11.6962 2.35109 11.805 2.19282 11.8805 2.01698C11.9559 1.84113 11.9965 1.65131 11.9998 1.45883C12.0031 1.26634 11.969 1.07515 11.8995 0.896649C11.8301 0.718149 11.7267 0.555999 11.5956 0.419873C11.4645 0.283747 11.3083 0.176433 11.1364 0.104334C10.9645 0.0322347 10.7804 -0.00317301 10.595 0.000223098C10.4096 0.00361921 10.2268 0.0457495 10.0574 0.124101C9.88803 0.202452 9.73561 0.315419 9.60921 0.456263L0.404703 10.0132C0.276402 10.1463 0.174623 10.3044 0.105182 10.4784C0.0357416 10.6523 0 10.8388 0 11.0272C0 11.2155 0.0357416 11.402 0.105182 11.576C0.174623 11.7499 0.276402 11.908 0.404703 12.0411L9.60921 21.5981C9.86972 21.8591 10.2186 22.0034 10.5806 21.9999C10.9426 21.9965 11.2888 21.8456 11.5447 21.5796C11.8005 21.3137 11.9456 20.9541 11.9485 20.5782C11.9515 20.2024 11.8122 19.8403 11.5606 19.5701L3.33358 11.0262L11.5606 2.48233Z"
                fill="black"
              />
            </svg>
          </button>{" "}
          <p className="text-xl">검색필터</p>
          {/* <div className="flex w-full border-b-2 focus-within:border-b-brandBlue">
            <input
              className="w-full pl-2.5 py-2 outline-none "
              placeholder="파티를 찾아보겠는가!"
            />
            <button className="mb-1 text-sm px-2 py-1 ">
              <SearchIcon />
            </button>
          </div> */}
        </div>

        {/* <div className="p-6">
          <div className="flex justify-between mb-4">
            <h1 className="text-[16px]">최근검색어</h1>
            <p className="text-[12px] text-gray-300">최근검색어 삭제</p>
          </div>
          <div className="">
            <span className="text-[12px] rounded-full mx-1 px-4 py-1 border border-black">
              UXUI
            </span>
            <span className="text-[12px] rounded-full mx-1 px-4 py-1 border border-black">
              프론트엔드
            </span>
            <span className="text-[12px] rounded-full mx-1 px-4 py-1 border border-black">
              디자이너
            </span>
          </div>
        </div> */}
        <div className="px-6 mt-6 space-y-6 w-full ">
          <h1 className="text-[16px] font-medium">직업군</h1>
          <ul className="grid gap-2 w-full grid-cols-2">
            <li>
              <button
                onClick={() => onSelectClass("frontend")}
                className={classNames(classStyle, {
                  "text-blue-500 ring-blue-500 ring-[1px] border-transparent":
                    classes.includes("frontend"),
                })}
                value="frontend"
              >
                프론트엔드
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectClass("Backend")}
                className={classNames(classStyle, {
                  "text-blue-500 ring-blue-500 ring-[1px] border-transparent":
                    classes.includes("Backend"),
                })}
                value="backend"
              >
                백엔드
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectClass("designer")}
                className={classNames(classStyle, {
                  "text-blue-500 ring-blue-500 ring-[1px] border-transparent":
                    classes.includes("designer"),
                })}
                value="designer"
              >
                디자이너
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectClass("fullstack")}
                className={classNames(classStyle, {
                  "text-blue-500 ring-blue-500 ring-[1px] border-transparent":
                    classes.includes("fullstack"),
                })}
                value="fullstack"
              >
                풀스택
              </button>
            </li>
          </ul>
        </div>
        <div className="px-6">
          <StackListDropdwon stacks={stacks} setStacks={setStacks} />
          <DurationRange
            duration={durationWeek}
            setDuration={setDurationWeek}
          />
        </div>

        <div className="absolute bottom-0 flex items-center w-full space-x-2 text-gray-200">
          <button
            type="button"
            className="text-white bg-brandBlue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium bottom-0 w-full h-[3rem] text-sm px-5 py-2.5 text-center"
            onClick={onSubmitFilter}
          >
            필터적용
          </button>
        </div>
      </div>
    </div>
  );
};
