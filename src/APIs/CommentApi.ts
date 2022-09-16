import { useQuery } from "@tanstack/react-query";
import { instance } from "../config/axios";
import { getCookieToken } from "../config/cookies";
import { CommentGet } from "../types/postsDetailType";

const userToken = {
  headers: { authorization: getCookieToken() },
};

export const CommentApi = {
  // 댓글, 답글 조회
  getComments: (id: number) => {
    return useQuery<CommentGet[]>(["comments", id], async () => {
      const { data } = await instance.get<CommentGet[]>(
        `api/quests/${id}/comments`,
        userToken,
      );
      return data;
    });
  },
  // 댓글 작성 -- api파일로 옮겨야함!!
  addComment: async (id: number, comment: string) => {
    const { data } = await instance.post(
      `/api/quests/${id}/comments`,
      { content: comment },
      userToken,
    );
    return data;
  },
};
