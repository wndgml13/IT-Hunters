import { useMutation, useQuery } from "@tanstack/react-query";
import { instance } from "../config/axios";
import { getCookieToken } from "../config/cookies";

export const BookmarkApi = {
  bookMarkpost: () => {
    return useMutation(async (id: number) => {
      const { data } = await instance.post(`api/quests/${id}/bookmark`, {});
      return data;
    });
  },
  getMyBookmark: () => {
    return useQuery(
      ["bookmarks"],
      async () => {
        const { data } = await instance.get("api/myPage/bookmark");
        return data;
      },
      {
        enabled: !!getCookieToken(),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      },
    );
  },
};
