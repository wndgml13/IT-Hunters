import { useState } from "react";

import { useRecoilState } from "recoil";
import { questApi } from "../../APIs/QuestApi";
import { filterState } from "../../store/filterState";
import { modalState } from "../../store/modalState";

import { SearchFilter } from "./SearchFilter";
import { SearchResultCard } from "./SearchResultCard";

export const SearchList = () => {
  const [modal, setModal] = useRecoilState(modalState);
  const [filterParam, setFilterParam] = useRecoilState(filterState);
  const [title, setTitle] = useState("");

  const { data } = questApi.getFilteredQuests(filterParam);
  console.log(filterParam);

  const searchParam = filterParam + "&title=" + title;

  const onEnterInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log(searchParam);
      setFilterParam(searchParam);
    }
  };

  return (
    <div className="p-4 h-screen overflow-y-scroll pb-[3.5rem]">
      <input
        value={title}
        onChange={e => {
          setTitle(e.target.value);
        }}
        onKeyPress={onEnterInput}
        className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
      />
      <div>
        <button
          className="rounded-lg text-xl border border-black p-2 my-4"
          onClick={() => {
            setModal(true);
          }}
        >
          검색 필터
        </button>
        {modal ? <SearchFilter /> : null}
      </div>
      <div>
        {data?.map(quest => (
          <SearchResultCard key={quest.questId} quest={quest} />
        ))}
      </div>
    </div>
  );
};

// const {
//   data: quests,
//   isError,
//   error,
//   isLoading,
// } = useQuery<IQuestlist[], Error>(["Searchlist"], questApi.getAllQuests);

// const {
//   data: quests,

//   isLoading,
// } = useQuery<IQuestlist[]>(
//   ["Searchlist", filterParam],
//   questApi.getFilteredQuests(filterParam),
// );
