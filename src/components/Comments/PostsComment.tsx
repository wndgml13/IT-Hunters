import { useEffect, useState } from "react";
import { CommentGet } from "../../types/postsDetailType";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { PostsSubComment } from "./PostsSubComment";
import { CommentApi } from "../../APIs/CommentApi";
import { subCommentApi } from "../../APIs/subCommentApi";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { loginInfoState } from "../../store/loginInfoState";
import convertDateText from "../../lib/convertDateText";
import { getCookieToken } from "../../config/cookies";
import { alertState, onAlertState } from "../../store/alertState";

export const PostsComment = ({ co }: { co: CommentGet }) => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const userinfo = useRecoilValue(loginInfoState);
  const navigate = useNavigate();

  const [tgVal, tg] = useRecoilState(onAlertState); // 알러트 true/false
  const setAlertContent = useSetRecoilState(alertState); // 알러트 내용

  const [subComment, setSubcomment] = useState<string>(""); // 답글 추가
  const [editComment, setEditComment] = useState(""); // 댓글 수정

  const [editCommentToggle, setEditCommentToggle] = useState(false); // 댓글 Edit 토글
  const [subCommentToggle, setSubCommentToggle] = useState(false); // 답글 달기 토글

  // 댓글 수정
  const { mutateAsync: modifiedComment } = CommentApi.modifiedComment();

  const onEditComment = () => {
    if (editComment) {
      const payload = {
        id: Number(id),
        editComment: editComment,
        commentId: co.commentId,
      };
      modifiedComment(payload).then(() => {
        queryClient.invalidateQueries(["comments"]);
      });
      setEditComment("");
    } else if (!editComment) {
      setAlertContent("내용을 입력해주세요!");
      tg(!tgVal); // 알러트 창 닫기
    }
  };

  const onInputEditComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditComment(e.target.value);
    if (e.target.value.length > 254) {
      setAlertContent("최대 255자까지 입력 가능합니다.");
      tg(!tgVal);
    }
  };

  const onEntereditComment = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && editComment) {
      onEditComment();
      setEditComment("");
      setEditCommentToggle(!editCommentToggle); // 43번째 줄 editComment 값이 있을 때만 인풋 창이 사라짐
    } else if (!editComment) {
      setAlertContent("내용을 입력해주세요!");
      tg(!tgVal);
    }
  };

  useEffect(() => {
    setEditComment(co.content);
  }, [editCommentToggle]); // 수정 토글이 열릴 때마다 기존 댓글 내용이 보임

  // 댓글 삭제
  const { mutateAsync: deleteComment } = CommentApi.deleteComment();

  const onDeletecomment = () => {
    const payload = {
      id: Number(id),
      commentId: co.commentId,
    };
    deleteComment(payload).then(() => {
      queryClient.invalidateQueries(["comments"]);
      queryClient.invalidateQueries(["Postsdetail"]); // 댓글 삭제 시 개수 실시간 카운팅
    });
  };

  // 답글 작성
  const { mutateAsync: addSubComment } = subCommentApi.addSubComment();

  const onSubmitSubComment = () => {
    if (subComment) {
      const payload = {
        id: Number(id),
        commentId: co.commentId,
        subComment: subComment,
      };
      addSubComment(payload).then(() => {
        queryClient.invalidateQueries(["comments"]);
      });
      setSubcomment("");
    } else {
      setAlertContent("내용을 입력해주세요!");
      tg(!tgVal);
    }
  };

  const onInputSubComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubcomment(e.target.value);
    if (e.target.value.length > 254) {
      setAlertContent("최대 255자까지 입력 가능합니다.");
      tg(!tgVal);
    }
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
            className="cursor-pointer w-10 h-10 border rounded-full"
            src={co?.profileImage}
            onClick={() => {
              navigate(`/user/${co.memberId}`);
            }}
          />
          <div className="mt-2 h-full hover:outline-none hover:border-b-2 border-black">
            <button
              onClick={() => {
                navigate(`/user/${co.memberId}`);
              }}
            >
              {co.nickname}
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-3 ml-2">
            {co?.createdAt && convertDateText(co?.createdAt)}
          </p>
        </div>
        <p className="whitespace-pre-wrap mx-3 p-2 rounded-xl text-sm text-black mt-1 break-all">
          {editCommentToggle ? !co.content : co.content}
        </p>
        {/* 댓글 수정 폼 */}
        {editCommentToggle && (
          <div className="gap-1 mb-2">
            <input
              id="message"
              className="bg-gray-50 border border-gary text-gray-900 text-sm rounded-3xl w-full h-14 my-1 p-2.5 focus:outline-none"
              placeholder="댓글 수정"
              value={editComment}
              onChange={onInputEditComment}
              onKeyPress={onEntereditComment}
              maxLength={255}
            />
            <div className="mt-3 flex flex-row-reverse gap-2">
              <button
                className="text-white w-12 h-10 bg-[#F4C828] font-bold rounded-lg focus:outline-none"
                onClick={() => {
                  onEditComment();
                  editComment && setEditCommentToggle(!editCommentToggle);
                }}
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
        {/* 댓글 수정 버튼 */}
        <div className=" text-sm flex flex-justify-start gap-3">
          {co?.nickname === userinfo?.nickname ? (
            <div>
              <button
                className="text-sm text-gray-400/100 hover:text-brandBlue"
                onClick={() => {
                  setEditCommentToggle(!editCommentToggle);
                  setSubCommentToggle(false);
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
          {getCookieToken() ? (
            <button
              className="mb-2 text-sm text-gray-400/100 hover:text-black"
              onClick={() => {
                setSubCommentToggle(!subCommentToggle);
                setEditCommentToggle(false);
              }}
            >
              답글 달기
            </button>
          ) : null}
        </div>
        {/* 답글 추가 */}
        {co?.subCommentList.map(sc => (
          <PostsSubComment key={sc.subCommentId} sc={sc} coId={co.commentId} />
        ))}
        {/* 답글 달기 버튼 */}
        {subCommentToggle && (
          <div className="gap-1">
            <input
              id="message"
              className="bg-gray-50 border border-gary text-gray-900 text-sm rounded-3xl w-full h-14 my-1 p-2.5 focus:outline-none"
              value={subComment}
              placeholder="답글 입력"
              onChange={onInputSubComment}
              onKeyPress={onEntersubComment}
              maxLength={255}
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
