import { useInfiniteQuery } from "@tanstack/react-query";
import { instance } from "../config/axios";
import { IQuest } from "../types/questType";

interface IQuestInifite {
  content: IQuest[];
  nextPage: number;
  last: boolean;
  totalElements: number;
}

export const questApi = {
  getInfiniteFilteredQuests: (filterval: string) => {
    return useInfiniteQuery<
      IQuestInifite,
      Error,
      IQuestInifite,
      [string, string]
    >(
      ["filterlist", filterval],
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
