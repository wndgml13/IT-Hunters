import { useQuery } from "@tanstack/react-query";
import { instance } from "../config/axios";
import { getCookieToken } from "../config/cookies";

import { IQuest } from "../types/questType";

const userToken = getCookieToken();

export const questApi = {
  getAllQuests: async () => {
    const { data } = await instance.get<IQuest[]>("api/quests", {
      headers: { authorization: userToken },
    });
    return data;
  },
  getFilteredQuests: (filterval: string) => {
    return useQuery<IQuest[]>(["filterlist", filterval], () =>
      instance
        .get<IQuest[]>(`api/quests/search?${filterval}`)
        .then(res => res.data),
    );
  },
};
