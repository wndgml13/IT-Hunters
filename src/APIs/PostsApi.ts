import { useMutation, useQuery } from "@tanstack/react-query";
import { instance } from "../config/axios";
import { getCookieToken } from "../config/cookies";
import { IQuestDetail } from "../types/postsDetailType";

const userToken = {
  headers: { authorization: getCookieToken() },
};

export const PostsApi = {
  // 게시글 조회
  getDetailPosts: (id: number) => {
    return useQuery<IQuestDetail, Error>(["Postsdetail", id], async () => {
      const { data } = await instance.get<IQuestDetail>(
        `api/quests/${id}`,
        userToken,
      );
      return data;
    });
  },

  // 게시글 삭제
  deleteposts: () => {
    return useMutation(async (id: number) => {
      const { data } = await instance.delete(`/api/quests/${id}`, userToken);
      return data;
    });
  },
};
