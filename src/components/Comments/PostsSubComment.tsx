import { useState } from "react";
import { SubCommentGet } from "../../types/postsDetailType";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { subCommentApi } from "../../APIs/subCommentApi";

export const PostsSubComment = ({
  sc,
  coId,
}: {
  sc: SubCommentGet;
  coId: number;
}) => {
  const queryClient = useQueryClient();
  const { id } = useParams();

  const [editSubcomment, setEditsubComment] = useState(""); // 답글 수정
  const [editSubCommentToggle, setEditSubCommentToggle] = useState(false); // 답글 수정 토글

  //답글 수정
  const { mutateAsync: modifiedSubComment } =
    subCommentApi.modifiedSubComment();

  const onEditsubComment = () => {
    const payload = {
      id: Number(id),
      commentId: coId,
      subCommentId: sc.subCommentId,
      editSubComment: editSubcomment,
    };
    modifiedSubComment(payload).then(() => {
      queryClient.invalidateQueries(["comments"]);
    });
    setEditsubComment("");
  };

  const onEntereditSubComment = async (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter") {
      onEditsubComment();
      setEditsubComment("");
    }
  };

  // 답글 삭제 -- api파일로 옮겨야함!!
  const { mutateAsync: deleteSubComment } = subCommentApi.deleteSubComment();

  const onDeletesubComment = () => {
    const payload = {
      id: Number(id),
      commentId: coId,
      subCommentId: sc.subCommentId,
    };
    deleteSubComment(payload).then(() => {
      queryClient.invalidateQueries(["comments"]);
    });
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
              onClick={onDeletesubComment}
            >
              Delete
            </a>
          </div>
        </div>
        {/* 답글 Edit 버튼 */}
        {editSubCommentToggle && (
          <div className="flex justify-between gap-2 ml-24 text-sm">
            <input
              id="message"
              className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full h-14 mb-5 p-2.5 mx-1"
              placeholder="답글 수정"
              value={editSubcomment}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEditsubComment(e.target.value);
              }}
              onKeyPress={onEntereditSubComment}
            />
            <button
              type="button"
              className="cursor-pointer bg-blue-200 hover:bg-blue-400 w-20 h-10 mt-3 rounded-lg border-none"
              onClick={onEditsubComment}
            >
              Edit
            </button>
            <button
              type="button"
              className="cursor-pointer bg-blue-200 hover:bg-blue-400 w-20 h-10 mt-3 rounded-lg border-none"
              onClick={() => {
                setEditSubCommentToggle(!editSubCommentToggle);
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </>
    </>
  );
};
