import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { questApi } from "../../APIs/QuestApi";
import {
  classesState,
  filterState,
  stacksState,
} from "../../store/filterState";
import { modalState } from "../../store/modalState";
import { SearchFilter } from "./SearchFilter";
import { FilterIcon, SearchIcon, UpSignIcon } from "../../assets/icons";
import { QuestInSearch } from "../QuestInSearch";
import classNames from "classnames";

export const SearchList = () => {
  const [modal, setModal] = useRecoilState(modalState);
  const [filterParam, setFilterParam] = useRecoilState(filterState);
  const [title, setTitle] = useState("");
  const selectClass = useLocation().state;
  const { data } = questApi.getFilteredQuests(filterParam);

  const searchParam = filterParam + "&title=" + title;

  const onEnterInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setFilterParam(searchParam);
    }
  };

  const classes = useRecoilValue(classesState);
  const stacks = useRecoilValue(stacksState);

  const filteredResultList = [...classes, ...stacks];

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectClass) {
      setFilterParam(selectClass);
    }
  }, [selectClass]);

  return (
    <div className="h-screen overflow-y-scroll pb-[5rem]">
      <div className="absolute top-0 left-0 right-0 z-40 bg-white shadow-md">
        <div className="flex px-6 mt-4">
          <h1 className="mr-5 text-2xl w-14 font-cookie">파티</h1>{" "}
          <div className="flex w-full rounded-2xl border focus-within:border-brandBlue">
            <input
              value={title}
              onChange={e => {
                setTitle(e.target.value);
              }}
              placeholder="파티를 찾아보겠는가!"
              onKeyPress={onEnterInput}
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
                "bg-brandYellow": filteredResultList.length > 0,
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
          <div className="flex w-[75%] gap-x-2 overflow-x-scroll whitespace-nowrap">
            {filteredResultList?.map((frl, idx) => (
              <p
                key={idx}
                className="bg-brandBlue py-1 px-3 rounded-xl text-white"
              >
                {frl}
              </p>
            ))}
          </div>
          <div className="w-[3rem] text-center ">{data?.length} 건</div>
        </div>
      </div>

      {modal ? <SearchFilter /> : null}
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
