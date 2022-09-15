import { useState } from "react";
import { SubCommentGet } from "../../types/postsDetailType";
import { instance } from "../../config/axios";
import { getCookieToken } from "../../config/cookies";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const PostsSubComment = ({
  sc,
  coId,
}: {
  sc: SubCommentGet;
  coId: number;
}) => {
  const userToken = getCookieToken();
  const queryClient = useQueryClient();
  const { id } = useParams();
  console.log(coId);
  const [editSubcomment, setEditsubComment] = useState(""); // 답글 수정
  const [editSubCommentToggle, setEditSubCommentToggle] = useState(false); // 답글 수정 토글

  //답글 수정 -- api파일로 옮겨야함!!
  const { mutate: editSubcom } = useMutation(
    (data: { commentId: number; subCommentId: number }) =>
      instance.put(
        `/api/quests/${id}/comments/${data.commentId}/subComments/${data.subCommentId}`,
        {
          content: editSubcomment,
        },
        {
          headers: { authorization: userToken },
        },
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments"]);
      },
    },
  );
  console.log(editSubcomment);
  const onEditsubComment = (commentId: number, subCommentId: number) => {
    editSubcom({ commentId, subCommentId });
    setEditsubComment("");
    return;
  };

  // 답글 삭제 -- api파일로 옮겨야함!!
  const { mutate: delSubcomment } = useMutation(
    (data: { commentId: number; subCommentId: number }) =>
      instance.delete(
        `/api/quests/${id}/comments/${data.commentId}/subComments/${data.subCommentId}`,
        {
          headers: { authorization: userToken },
        },
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments"]);
      },
    },
  );

  const onDeletesubComment = (commentId: number, subCommentId: number) => {
    delSubcomment({ commentId, subCommentId });
  };

  return (
    <>
      {/* 답글 추가 */}
      <>
        <div key={sc.subCommentId} className="mx-14 my-5">
          <span className="border border-black px-2 py-1">{sc.nickname}</span>
          <span> {sc.content}</span>
          <div className="ml-24 text-sm">
            <a
              type="button"
              className="cursor-pointer mr-1 text-gray-400/100 hover:text-blue-600/100"
              onClick={() => {
                setEditSubCommentToggle(!editSubCommentToggle);
              }}
            >
              Edit
            </a>
            |
            <a
              type="button"
              className="cursor-pointer ml-1 mr-1 text-gray-400/100 hover:text-blue-600/100"
              onClick={() => onDeletesubComment(coId, sc.subCommentId)}
            >
              Delete
            </a>
          </div>
        </div>
        {/* 답글 Edit 버튼 */}
        {editSubCommentToggle && (
          <div className="flex justify-between gap-2 ml-24 text-sm">
            <textarea
              id="message"
              rows={2}
              className="mb-2 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="답글 수정"
              value={editSubcomment}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setEditsubComment(e.target.value);
              }}
            />
            <button
              type="button"
              className="cursor-pointer bg-blue-200 hover:bg-blue-400 w-20 h-10 mt-3 rounded-lg border-none"
              onClick={() => {
                onEditsubComment(coId, sc.subCommentId);
              }}
            >
              Edit
            </button>
            <button
              type="button"
              className="cursor-pointer bg-blue-200 hover:bg-blue-400 w-20 h-10 mt-3 rounded-lg border-none"
            >
              Cancel
            </button>
          </div>
        )}
      </>
    </>
  );
};
