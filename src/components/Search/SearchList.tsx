import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { questApi } from "../../APIs/QuestApi";
import { filterState } from "../../store/filterState";
import { modalState } from "../../store/modalState";
import { SearchFilter } from "./SearchFilter";
import { SearchIcon } from "../../assets/icons";
import { QuestInSearch } from "../QuestInSearch";

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

  useEffect(() => {
    if (selectClass) {
      setFilterParam(selectClass);
    }
  }, [selectClass]);

  return (
    <div className="h-full overflow-y-scroll pb-[3.5rem]">
      <div className="flex py-3 px-6 absolute top-0 left-0 right-0 z-50 bg-white">
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

      <div className="mt-12 py-5 px-6 flex justify-between border-b">
        <div className="bg-white">
          <button
            className="flex gap-x-2 bg-whtie"
            onClick={() => {
              setModal(true);
            }}
          >
            필터
            <div className="py-1">
              <svg
                width="16"
                height="16"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.5206 2.66436C21.0938 2.01946 20.636 1 19.7732 1H2.22684C1.36399 1 0.906189 2.01946 1.47943 2.66436L8.54741 10.6158C8.71012 10.7989 8.8 11.0353 8.8 11.2802V18.1734C8.8 18.5669 9.03078 18.9239 9.38964 19.0853L11.7896 20.1653C12.4514 20.4631 13.2 19.9791 13.2 19.2534V11.2802C13.2 11.0353 13.2899 10.7989 13.4526 10.6158L20.5206 2.66436Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>
        </div>
        <div>{data?.length} 건</div>
      </div>

      {modal ? <SearchFilter /> : null}
      <div>
        {data?.map(quest => (
          <QuestInSearch key={quest.questId} quest={quest} />
        ))}
      </div>
    </div>
  );
};
