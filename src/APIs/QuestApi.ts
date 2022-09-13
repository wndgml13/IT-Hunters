import { useQuery } from "@tanstack/react-query";
import { instance } from "../config/axios";
import { getCookieToken } from "../config/cookies";

import { IQuestlist } from "../types/questInfoType";

const userToken = getCookieToken();

export const questApi = {
  getAllQuests: async () => {
    const { data } = await instance.get<IQuestlist[]>("api/quests", {
      headers: { authorization: userToken },
    });
    return data;
  },
  getFilteredQuests: (filterval: string) => {
    return useQuery<IQuestlist[]>(["filterlist", filterval], () =>
      instance
        .get<IQuestlist[]>(`api/quests/search?${filterval}`)
        .then(res => res.data),
    );
  },
};
