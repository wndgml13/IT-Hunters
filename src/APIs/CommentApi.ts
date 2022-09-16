import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { instance } from "../config/axios";
import { getCookieToken } from "../config/cookies";
import { CommentGet } from "../types/postsDetailType";

const userToken = {
  headers: { authorization: getCookieToken() },
};

const { id } = useParams();

export const CommentApi = {
  // 댓글, 답글 조회
  getComments: () => {
    return useQuery<CommentGet[]>(["comments"], async () => {
      const { data } = await instance.get<CommentGet[]>(
        `api/quests/${id}/comments`,
        userToken,
      );
      return data;
    });
  },
  // 댓글 작성 -- api파일로 옮겨야함!!
  // addComment: async (comment: string) => {
  //   const { data } = await instance.post(
  //     `/api/quests/${id}/comments`,
  //     { content: comment },
  //     userToken,
  //   );
  //   return data;
  // },
};
