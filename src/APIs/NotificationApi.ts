import { useMutation, useQuery } from "@tanstack/react-query";
import { instance } from "../config/axios";
import { getCookieToken } from "../config/cookies";

const userToken = {
  headers: { authorization: getCookieToken() },
};

export const notificationApi = {
  getQuestOffer: () => {
    return useQuery(["questoffer"], async () => {
      const { data } = await instance.get("/api/offers");
      return data;
    });
  },
  //POST (api주소, databody, token) 순서인데 databody 없으면 빈칸으로라도 보내야한다.
  approveQuestOffer: () => {
    return useMutation(async (offerId: number) => {
      const { data } = await instance.post(
        `/api/squads/${offerId}`,
        {},
        userToken,
      );
      return data;
    });
  },
  cancelQuestOffer: () => {
    return useMutation(async (offerId: number) => {
      const { data } = await instance.delete(
        `/api/offers/${offerId}`,
        userToken,
      );
      return data;
    });
  },
  getApprovedQuestMember: (questId: number) => {
    return useQuery(["approvedQuest"], async () => {
      const { data } = await instance.get(`/api/squads/${questId}`, userToken);
      return data;
    });
  },
  getMySquads: () => {
    return useQuery(["MySquads"], async () => {
      const { data } = await instance.get(`/api/squads`, userToken);
      return data;
    });
  },
};
