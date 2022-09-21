import { useMutation } from "@tanstack/react-query";
import { instance } from "../config/axios";
import { getCookieToken } from "../config/cookies";

const userToken = {
  headers: { authorization: getCookieToken() },
};

export const BookmarkApi = {
  bookMarkpost: () => {
    return useMutation(async (id: number) => {
      const { data } = await instance.post(
        `api/quests/${id}/bookmark`,
        {},
        userToken,
      );
      return data;
    });
  },
};
