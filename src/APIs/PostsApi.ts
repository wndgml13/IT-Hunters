import { useMutation, useQuery } from "@tanstack/react-query";
import { instance } from "../config/axios";
import { getCookieToken } from "../config/cookies";
import { PostsAdd } from "../types/postsaddType";
import { IQuestDetail } from "../types/postsDetailType";

const userToken = {
  headers: { authorization: getCookieToken() },
};

interface EditPostsPayload {
  id: number;
  title: string;
  content: string;
  frontend: number | null;
  backend: number | null;
  designer: number | null;
  fullstack: number | null;
  duration: number;
  stacks: string[];
}

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

  // 게시글 수정 -- 작업중
  editPosts: () => {
    return useMutation((payload: EditPostsPayload) =>
      instance.put(
        `/api/quests/${payload.id}`,
        {
          title: payload.title,
          content: payload.content,
          frontend: payload.frontend,
          backend: payload.backend,
          designer: payload.designer,
          fullstack: payload.fullstack,
          duration: payload.duration,
          stacks: payload.stacks,
        },
        userToken,
      ),
    );
  },
  // 게시글 등록
  submitPost: () => {
    return useMutation(async (postInfo: PostsAdd) => {
      const { data } = await instance.post(
        "api/quests",
        {
          backend: postInfo.backend,
          content: postInfo.content,
          designer: postInfo.designer,
          duration: postInfo.duration,
          frontend: postInfo.frontend,
          fullstack: postInfo.fullstack,
          stacks: postInfo.stacks,
          title: postInfo.title,
        },
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
