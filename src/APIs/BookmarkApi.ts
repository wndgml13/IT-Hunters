import { useMutation, useQuery } from "@tanstack/react-query";
import { instance } from "../config/axios";

export const BookmarkApi = {
  bookMarkpost: () => {
    return useMutation(async (id: number) => {
      const { data } = await instance.post(`api/quests/${id}/bookmark`, {});
      return data;
    });
  },
  getMyBookmark: () => {
    return useQuery(["bookmarks"], async () => {
      const { data } = await instance.get("api/mypage/bookmark");
      return data;
    });
  },
};
