import { useState } from "react";
import { CommentGet } from "../../types/postsDetailType";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { PostsSubComment } from "./PostsSubComment";
import { CommentApi } from "../../APIs/CommentApi";
import { subCommentApi } from "../../APIs/subCommentApi";
import { useRecoilValue } from "recoil";
import { loginInfoState } from "../../store/loginInfoState";
import convertDateText from "../../lib/convertDateText";

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
      <div key={co.commentId} className="bg-white w-full p-4 border-b-2 ">
        <div className="flex flex-row gap-2">
          <img
            className="w-10 h-10 border rounded-full"
            src={co?.profileImage}
          />
          <div className="mt-2">
            <p>{co.nickname}</p>
          </div>
          <p className="text-xs text-gray-400 mt-3 ml-2">
            {co?.createdAt && convertDateText(co?.createdAt)}
          </p>
        </div>
        <p className="text-sm text-gray-700 mt-1"> {co.content}</p>

        <div className=" text-sm flex flex-justify-start gap-3">
          {co?.nickname === userinfo?.nickname ? (
            <div>
              <button
                className="text-sm text-gray-400/100 hover:text-brandBlue"
                onClick={() => {
                  setEditCommentToggle(!editCommentToggle);
                }}
              >
                수정
              </button>
              <button
                className="text-sm text-gray-400/100 hover:text-red-400 ml-3"
                onClick={() => onDeletecomment()}
              >
                삭제
              </button>
            </div>
          ) : null}
          <button
            className="mb-2 text-sm text-gray-400/100 hover:text-black"
            onClick={() => {
              setSubCommentToggle(!subCommentToggle);
            }}
          >
            답글 달기
          </button>
        </div>
        {/* 댓글 Edit 버튼 */}
        {editCommentToggle && (
          <div className="gap-1 mb-2">
            <input
              id="message"
              className="bg-gray-50 border border-gary text-gray-900 text-sm rounded-2xl w-full h-14 my-1 p-2.5 focus:outline-none"
              placeholder="댓글 수정"
              value={editComment}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                seteditComment(e.target.value);
              }}
              onKeyPress={onEntereditComment}
            />
            <div className="mt-3 flex flex-row-reverse gap-2">
              <button
                className="text-white w-12 h-10 bg-[#F4C828] font-bold rounded-lg focus:outline-none"
                onClick={onEditcomment}
              >
                수정
              </button>
              <button
                className="text-white w-12 h-10 bg-[#4B23B8] font-bold rounded-lg focus:outline-none"
                onClick={() => {
                  setEditCommentToggle(!editCommentToggle);
                }}
              >
                닫기
              </button>
            </div>
          </div>
        )}
        {/* 답글 추가 */}
        {co?.subCommentList.map(sc => (
          <PostsSubComment key={sc.subCommentId} sc={sc} coId={co.commentId} />
        ))}

        {/* 답글 달기 버튼 */}
        {subCommentToggle && (
          <div className="gap-1 text-sm">
            <input
              id="message"
              className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full h-14 my-1 p-2.5"
              value={subComment}
              placeholder="답글 입력"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSubcomment(e.target.value)
              }
              onKeyPress={onEntersubComment}
            />
            <div className="mt-3 flex flex-row-reverse gap-2">
              <button
                className="text-white w-12 h-10 bg-[#F4C828] font-bold rounded-lg focus:outline-none"
                onClick={() => {
                  onSubmitSubComment();
                }}
              >
                저장
              </button>
              <button
                className="text-white w-12 h-10 bg-[#4B23B8] font-bold rounded-lg focus:outline-none"
                onClick={() => {
                  setSubCommentToggle(!subCommentToggle);
                }}
              >
                닫기
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
