import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { instance } from "../config/axios";
import { getCookieToken } from "../config/cookies";

import { IQuest } from "../types/questType";

const userToken = getCookieToken();

interface IQuestInifite {
  content: IQuest[];
  nextPage: number;
  last: boolean;
  totalElements: number;
}

export const questApi = {
  getAllQuests: async () => {
    const { data } = await instance.get<IQuest[]>("api/quests", {
      headers: { authorization: userToken },
    });
    return data;
  },
  getFilteredQuests: (filterval: string | unknown) => {
    return useQuery<IQuest[]>(["filterlist", filterval], () =>
      instance
        .get<IQuest[]>(`api/quests/search?${filterval}`)
        .then(res => res.data),
    );
  },
  getInfiniteFilteredQuests: (filterval: string) => {
    return useInfiniteQuery<
      IQuestInifite,
      Error,
      IQuestInifite,
      [string, string]
    >(
      ["filteredList", filterval],
      async ({ pageParam = 0 }) => {
        const { data } = await instance.get(
          `/api/quests/searches?page=${pageParam}&size=15&${filterval}`,
        );
        const { content, last, totalElements } = data;
        return { content, nextPage: pageParam + 1, last, totalElements };
      },
      {
        getNextPageParam: lastPage =>
          !lastPage.last ? lastPage.nextPage : undefined,
      },
    );
  },
};
