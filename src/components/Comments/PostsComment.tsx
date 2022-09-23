import { useState } from "react";
import { CommentGet } from "../../types/postsDetailType";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { PostsSubComment } from "./PostsSubComment";
import { CommentApi } from "../../APIs/CommentApi";
import { subCommentApi } from "../../APIs/subCommentApi";
import { useRecoilValue } from "recoil";
import { loginInfoState } from "../../store/loginInfoState";

export const PostsComment = ({ co }: { co: CommentGet }) => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const userinfo = useRecoilValue(loginInfoState);

  const [subComment, setSubcomment] = useState<string>(""); // 답글 추가
  const [editComment, seteditComment] = useState(""); // 댓글 수정

  const [editCommentToggle, setEditCommentToggle] = useState(false); // 댓글 Edit 토글
  const [subCommentToggle, setSubCommentToggle] = useState(false); // 답글 달기 토글

  // 댓글 수정
  const { mutateAsync: modifiedComment } = CommentApi.modifiedComment();

  const onEditcomment = () => {
    const payload = {
      id: Number(id),
      editComment: editComment,
      commentId: co.commentId,
    };
    modifiedComment(payload).then(() => {
      queryClient.invalidateQueries(["comments"]);
    });
    seteditComment("");
  };

  const onEntereditComment = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onEditcomment();
      seteditComment("");
    }
  };

  // 댓글 삭제
  const { mutateAsync: deleteComment } = CommentApi.deleteComment();

  const onDeletecomment = () => {
    const payload = {
      id: Number(id),
      commentId: co.commentId,
    };
    deleteComment(payload).then(() => {
      queryClient.invalidateQueries(["comments"]);
    });
  };

  // 답글 작성
  const { mutateAsync: addSubComment } = subCommentApi.addSubComment();

  const onSubmitSubComment = () => {
    const payload = {
      id: Number(id),
      commentId: co.commentId,
      subComment: subComment,
    };
    addSubComment(payload).then(() => {
      queryClient.invalidateQueries(["comments"]);
    });
    setSubcomment("");
  };

  const onEntersubComment = async (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter") {
      onSubmitSubComment();
      setSubcomment("");
    }
  };

  return (
    <>
      {/* 댓글 추가 */}
      <div key={co.commentId} className="my-8 border-b-2">
        <span className="border border-black px-2 py-1">{co.nickname}</span>
        <span className="text"> {co.content}</span>

        <div className="ml-24 text-sm">
          {co?.nickname === userinfo?.nickname ? (
            <div>
              <a
                type="button"
                className="cursor-pointer mr-1 text-gray-400/100 hover:text-blue-600/100"
                onClick={() => {
                  setEditCommentToggle(!editCommentToggle);
                }}
              >
                Edit
              </a>
              |
              <a
                type="button"
                className="cursor-pointer ml-1 mr-1 text-gray-400/100 hover:text-blue-600/100"
                onClick={() => onDeletecomment()}
              >
                Delete
              </a>
            </div>
          ) : null}
          <a
            type="button"
            className="mb-2 flex flex-row-reverse cursor-pointer ml-1 text-gray-400/100"
            onClick={() => {
              setSubCommentToggle(!subCommentToggle);
            }}
          >
            답글 달기
          </a>
          {/* 댓글 Edit 버튼 */}
          {editCommentToggle && (
            <div className="flex justify-between gap-2 mb-2">
              <input
                id="message"
                className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full h-14 my-3 p-2.5 mx-1"
                placeholder="댓글 수정"
                value={editComment}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  seteditComment(e.target.value);
                }}
                onKeyPress={onEntereditComment}
              />
              <button
                type="button"
                className="cursor-pointer bg-blue-200 hover:bg-blue-400 w-20 h-10 mt-6 rounded-lg border-none"
                onClick={onEditcomment}
              >
                Edit
              </button>
              <button
                type="button"
                className="cursor-pointer bg-blue-200 hover:bg-blue-400 w-20 h-10 mt-6 rounded-lg border-none"
                onClick={() => {
                  setEditCommentToggle(!editCommentToggle);
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
        {/* 답글 추가 */}
        {co?.subCommentList.map(sc => (
          <PostsSubComment key={sc.subCommentId} sc={sc} coId={co.commentId} />
        ))}

        {/* 답글 달기 버튼 */}
        {subCommentToggle && (
          <div className="flex justify-between gap-2 ml-24 text-sm">
            <input
              id="message"
              className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full h-14 mb-3 p-2.5 mx-1"
              value={subComment}
              placeholder="답글 입력"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSubcomment(e.target.value)
              }
              onKeyPress={onEntersubComment}
            />
            <button
              type="button"
              className="cursor-pointer bg-blue-200 hover:bg-blue-400 w-20 h-10 mt-5 rounded-lg border-none"
              onClick={() => {
                onSubmitSubComment();
              }}
            >
              Send
            </button>
            <button
              type="button"
              className="cursor-pointer bg-blue-200 hover:bg-blue-400 w-20 h-10 mt-5 rounded-lg border-none"
              onClick={() => {
                setSubCommentToggle(!subCommentToggle);
              }}
            >
              Cencel
            </button>
          </div>
        )}
      </div>
    </>
  );
};
