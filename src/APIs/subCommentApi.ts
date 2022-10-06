import { useMutation } from "@tanstack/react-query";
import { instance } from "../config/axios";

interface SubCommentPayload {
  id: number;
  commentId: number;
  subComment: string;
}

interface SubModifiedPayload {
  id: number;
  commentId: number;
  subCommentId: number;
  editSubComment: string;
}

interface SubDeletePayload {
  id: number;
  commentId: number;
  subCommentId: number;
}

export const subCommentApi = {
  // 답글 작성
  addSubComment: () => {
    return useMutation(async (payload: SubCommentPayload) => {
      // payload에 commentpayload 타입을 지정해준다.
      const { data } = await instance.post(
        `/api/quests/${payload.id}/comments/${payload.commentId}/subComments`,
        { content: payload.subComment },
      );
      return data;
    });
  },
  // 답글 수정
  modifiedSubComment: () => {
    return useMutation((payload: SubModifiedPayload) =>
      instance.put(
        `/api/quests/${payload.id}/comments/${payload.commentId}/subComments/${payload.subCommentId}`,
        {
          content: payload.editSubComment,
        },
      ),
    );
  },
  // 답글 삭제
  deleteSubComment: () => {
    return useMutation((payload: SubDeletePayload) =>
      instance.delete(
        `/api/quests/${payload.id}/comments/${payload.commentId}/subComments/${payload.subCommentId}`,
      ),
    );
  },
};
