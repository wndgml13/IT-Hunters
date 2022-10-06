import { useMutation, useQuery } from "@tanstack/react-query";
import { instance } from "../config/axios";
import { CommentGet } from "../types/postsDetailType";

interface CommentPayload {
  id: number;
  comment: string;
}

interface ModifiedPayload {
  id: number;
  commentId: number;
  editComment: string;
}

interface DeletePayload {
  id: number;
  commentId: number;
}

export const CommentApi = {
  // 댓글, 답글 조회
  getComments: (id: number) => {
    return useQuery<CommentGet[]>(["comments", id], async () => {
      const { data } = await instance.get<CommentGet[]>(
        `api/quests/${id}/comments`,
      );
      return data;
    });
  },

  // 댓글 작성
  addComment: () => {
    return useMutation(async (payload: CommentPayload) => {
      // payload에 commentpayload 타입을 지정해준다.
      const { data } = await instance.post(
        `/api/quests/${payload.id}/comments`,
        { content: payload.comment },
      );
      return data;
    });
  },

  // 댓글 수정
  modifiedComment: () => {
    return useMutation((payload: ModifiedPayload) =>
      instance.put(`/api/quests/${payload.id}/comments/${payload.commentId}`, {
        content: payload.editComment,
      }),
    );
  },

  // 댓글 삭제
  deleteComment: () => {
    return useMutation((payload: DeletePayload) =>
      instance.delete(
        `/api/quests/${payload.id}/comments/${payload.commentId}`,
      ),
    );
  },
};
