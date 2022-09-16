import { useMutation, useQuery } from "@tanstack/react-query";
import { instance } from "../config/axios";
import { getCookieToken } from "../config/cookies";

const userToken = {
  headers: { authorization: getCookieToken() },
};

export const notificationApi = {
  getQuestOffer: () => {
    return useQuery(["questoffer"], async () => {
      const { data } = await instance.get("/api/offers", userToken);
      return data;
    });
  },
  approveQuestOffer: () => {
    return useMutation(async (offerId: number) => {
      const { data } = await instance.post(`/api/squads/${offerId}`, userToken);
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
};
