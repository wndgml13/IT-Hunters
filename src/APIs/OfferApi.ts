import { useMutation } from "@tanstack/react-query";
import { instance } from "../config/axios";
import { getCookieToken } from "../config/cookies";
import { OffersPost } from "../types/postsDetailType";

const userToken = {
  headers: { authorization: getCookieToken() },
};

export const OfferApi = {
  offerPost: () => {
    return useMutation(async (id: number) => {
      const { data } = await instance.post<OffersPost>(
        `api/quests/${id}/offers`,
        { classType: "FRONTEND" },
        userToken,
      );
      return data;
    });
  },
};
