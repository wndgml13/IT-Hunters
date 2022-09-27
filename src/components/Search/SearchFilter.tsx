import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { SearchIcon } from "../../assets/icons";
import { filterState } from "../../store/filterState";
import { modalState } from "../../store/modalState";
import { DurationRange } from "../DurationRange";
import { StackListDropdwon } from "../StackListDropdown";

export const SearchFilter = () => {
  const setModal = useSetRecoilState(modalState);

  const [classes, setClasses] = useState<string[]>([]);
  const [stacks, setStacks] = useState<string[]>([]);
  const [duration, setDuration] = useState<number>(20);
  const setFilter = useSetRecoilState(filterState);

  const onClassesHandelr = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setClasses(prev => [...prev, e.target.value]);
    } else {
      setClasses(classes.filter(el => el !== e.target.value));
    }
  };

  const onSubmitFilter = () => {
    const classQuery = classes.map(c => "classType=" + c);
    const stackQuery = stacks.map(s => "stack=" + s);
    const durationQuery = "duration=" + duration;
    const queryString = [...classQuery, ...stackQuery, durationQuery].join("&");

    console.log(queryString);
    setFilter(queryString);
    setModal(false);
  };

  const classStyle =
    "inline-flex item-center p-3 text-[14px] text-gray-300 w-full border border-gray-300 cursor-pointer peer-checked:text-blue-500 peer-checked:ring-blue-500 peer-checked:ring-[1px] peer-checked:border-transparent";

  return (
    <div className="h-full w-full absolute top-0 left-0 z-50 flex bg-white">
      <div className="w-full bg-white z-50 ">
        <div className="flex mt-4 px-[25px]">
          <button
            type="button"
            className="mr-4 hover:bg-gray-200 text-2xl"
            onClick={() => setModal(false)}
          >
            <span className="text-brandBlue">&lt;</span>
          </button>
          <div className="flex w-full border-b-2 focus-within:border-b-brandBlue">
            <input
              className="w-full pl-2.5 py-2 outline-none "
              placeholder="파티를 찾아보겠는가!"
            />
            <button className="mb-1 text-sm px-2 py-1 ">
              <SearchIcon />
            </button>
          </div>
        </div>

        <div className="p-6">
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
        </div>
        <div className="px-6 space-y-6 w-full ">
          <h1 className="text-[16px] font-medium">직업군</h1>
          <ul className="grid gap-2 w-full grid-cols-2">
            <li>
              <input
                type="checkbox"
                className="sr-only peer"
                value="frontend"
                id="Frontend"
                checked={classes.includes("frontend") ? true : false}
                onChange={e => onClassesHandelr(e)}
              />
              <label className={classStyle} htmlFor="Frontend">
                <p>프론트엔드</p>
              </label>
            </li>
            <li>
              <input
                type="checkbox"
                className="sr-only peer"
                value="backend"
                id="Backend"
                checked={classes.includes("backend") ? true : false}
                onChange={e => onClassesHandelr(e)}
              />
              <label className={classStyle} htmlFor="Backend">
                <p>백엔드</p>
              </label>
            </li>
            <li>
              <input
                type="checkbox"
                className="sr-only peer"
                value="designer"
                id="Designer"
                checked={classes.includes("designer") ? true : false}
                onChange={e => onClassesHandelr(e)}
              />
              <label className={classStyle} htmlFor="Designer">
                <p>디자이너</p>
              </label>
            </li>
            <li>
              <input
                type="checkbox"
                className="sr-only peer"
                value="fullstack"
                id="Fullstack"
                checked={classes.includes("fullstack") ? true : false}
                onChange={e => onClassesHandelr(e)}
              />
              <label className={classStyle} htmlFor="Fullstack">
                <p>풀스택</p>
              </label>
            </li>
          </ul>
        </div>
        <div className="px-6">
          <StackListDropdwon stacks={stacks} setStacks={setStacks} />
          <DurationRange duration={duration} setDuration={setDuration} />
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
