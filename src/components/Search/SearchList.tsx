import { useQuery } from "@tanstack/react-query";
import { instance } from "../../config/axios";
import { getCookieToken } from "../../config/cookies";
import { inputStyle } from "../../pages/Login/formStyle";
import { SearchResultCard } from "./SearchResultCard";

// 검색화면의 리스트의 type들 -- types 폴더에 옮기거나 APIs에 같이 해도될듯
export interface IQuestlist {
  backend: number | null;
  bookmarkCnt: number;
  commentCnt: number;
  content: string;
  createdAt: string;
  designer: number | null;
  duration: number;
  frontend: number | null;
  fullstack: number | null;
  modifiedAt: string;
  nickname: string;
  questId: number;
  status: boolean;
  title: string;
}

export const SearchList = () => {
  const userToken = getCookieToken();

  //퀘스트 전체 보기 api -- APIs 폴더에 옮길예정
  const getAllQuests = async () => {
    const { data } = await instance.get<IQuestlist[]>("api/quests", {
      headers: { authorization: userToken },
    });

    return data;
  };

  const {
    data: quests,
    isError,
    error,
    isLoading,
  } = useQuery<IQuestlist[], Error>(["Searchlist"], getAllQuests);

  if (isError) {
    <div>{error.message}</div>;
  }

  console.log(quests);

  return (
    <div className="p-4">
      <input className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 mb-3" />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        quests?.map(quest => (
          <SearchResultCard key={quest.questId} quest={quest} />
        ))
      )}
      {/* <SearchResultCard />
      <SearchResultCard /> */}
    </div>
  );
};
