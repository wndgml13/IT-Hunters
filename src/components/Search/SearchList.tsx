import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { useRecoilState } from "recoil";

import { questApi } from "../../APIs/QuestApi";

import { SearchFilter } from "./SearchFilter";
import { FilterIcon, SearchIcon, UpSignIcon } from "../../assets/icons";
import { QuestInSearch } from "../QuestInSearch";

import { modalState } from "../../store/modalState";
import { filterState } from "../../store/filterState";

import { IFilter } from "../../types/search";
export const SearchList = () => {
  const [modal, setModal] = useRecoilState(modalState);
  const [filters, setFilters] = useRecoilState<IFilter>(filterState);
  const [pfilter, setPfilter] = useState(
    [
      ...filters.classType.map(c => "classType=" + c),
      ...filters.stack.map(c => "stack=" + c),
      "duration=" + filters.duration,
      "title=" + filters.title,
    ].join("&"),
  );
  useEffect(() => {
    setPfilter(
      [
        ...filters.classType.map(c => "classType=" + c),
        ...filters.stack.map(c => "stack=" + c),
        "duration=" + filters.duration,
        "title=" + filters.title,
      ].join("&"),
    );
  }, [filters]);

  const listRef = useRef<HTMLDivElement>(null);

  const dlelteFitler = (key: string) => () => {
    if (filters.classType.includes(key)) {
      const copy = {
        ...filters,
        classType: filters.classType.filter(v => v !== key),
      };
      setFilters(copy);
    }
    if (filters.stack.includes(key)) {
      const copy = { ...filters, stack: filters.stack.filter(v => v !== key) };
      setFilters(copy);
    }
  };

  const { data } = questApi.getFilteredQuests(pfilter);

  return (
    <div className="h-screen overflow-y-scroll pb-[5rem]">
      <div className="absolute top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="flex px-6 mt-4">
          <h1 className="mr-5 text-2xl w-14 font-cookie">파티</h1>{" "}
          <div className="flex w-full rounded-2xl border focus-within:border-brandBlue">
            <input
              type="text"
              onChange={e => {
                setFilters(prev => ({ ...prev, title: e.target.value }));
              }}
              placeholder="파티를 찾아보겠는가!"
              // onKeyPress={onEnterInput}
              className="w-full pl-2.5 py-2 outline-none rounded-2xl "
            />
            <button className="mb-1 text-sm px-2 py-1 ">
              <SearchIcon />
            </button>
          </div>
        </div>
        <div className=" py-3 px-3 flex justify-between">
          <div className="bg-white w-[5rem]">
            <button
              className={classNames("flex gap-x-2  px-2 py-1 rounded-lg", {
                "bg-brandYellow":
                  filters.classType.length > 0 || filters.stack.length > 0,
              })}
              onClick={() => {
                setModal(true);
              }}
            >
              필터
              <div className="py-1">
                <FilterIcon />
              </div>
            </button>
          </div>{" "}
          <ul className="scroll flex w-[75%] gap-x-2 overflow-x-scroll whitespace-nowrap">
            {filters.classType?.map(frl => (
              <li
                key={frl}
                onClick={dlelteFitler(frl)}
                className="bg-brandBlue py-1 px-3 rounded-xl text-white cursor-pointer"
              >
                {frl}
              </li>
            ))}
            {filters.stack?.map(frl => (
              <li
                key={frl}
                onClick={dlelteFitler(frl)}
                className="bg-brandBlue py-1 px-3 rounded-xl text-white cursor-pointer"
              >
                {frl}
              </li>
            ))}
          </ul>
          <div className="w-[3rem] text-center ">{data?.length} 건</div>
        </div>
      </div>

      {modal ? (
        <SearchFilter setFilters={setFilters} filters={filters} />
      ) : null}
      <div className="pt-28" ref={listRef}>
        {data?.map(quest => (
          <QuestInSearch key={quest.questId} quest={quest} />
        ))}
      </div>
      <button
        onClick={() => listRef.current?.scrollIntoView({ behavior: "smooth" })}
        className="absolute right-6 bottom-20 bg-brandBlue p-3 text-white rounded-full"
      >
        <UpSignIcon />
      </button>
    </div>
  );
};
