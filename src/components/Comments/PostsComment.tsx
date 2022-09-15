import { useState } from "react";
import { CommentGet } from "../../types/postsDetailType";
import { instance } from "../../config/axios";
import { getCookieToken } from "../../config/cookies";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { PostsSubComment } from "./PostsSubComment";

export const PostsComment = ({ co }: { co: CommentGet }) => {
  const userToken = getCookieToken();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const [subComment, setSubcomment] = useState<string>(""); // 답글 추가
  const [editComment, seteditComment] = useState(""); // 댓글 수정

  const [editCommentToggle, setEditCommentToggle] = useState(false); // 댓글 Edit 토글
  const [subCommentToggle, setSubCommentToggle] = useState(false); // 답글 달기 토글

  // 댓글 수정 -- api파일로 옮겨야함!!
  const { mutate: editCom } = useMutation(
    (commentId: number) =>
      instance.put(
        `/api/quests/${id}/comments/${commentId}`,
        {
          content: editComment,
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

  const onEditcomment = (commentId: number) => {
    editCom(commentId);
    seteditComment("");
  };

  // const onEntereditComment = async (
  //   e: React.KeyboardEvent<HTMLTextAreaElement>,
  // ) => {
  //   if (e.key === "Enter") {
  //     editComment(editComment);
  //     seteditComment("");
  //   }
  // };

  // 댓글 삭제 -- api파일로 옮겨야함!!
  const { mutate: delComment } = useMutation(
    (commentId: number) =>
      instance.delete(`/api/quests/${id}/comments/${commentId}`, {
        headers: { authorization: userToken },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments"]);
      },
    },
  );

  const onDeletecomment = (commentId: number) => {
    delComment(commentId);
  };

  // 답글 작성 -- api파일로 옮겨야함!!
  const addSubComment = async (subcomment: string) => {
    const { data } = await instance.post(
      `/api/quests/${id}/comments/${co.commentId}/subComments`,
      { content: subcomment },
      {
        headers: { authorization: userToken },
      },
    );
    return data;
  };

  const { mutate: addSubcom } = useMutation(addSubComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
    },
  });

  const onEntersubComment = async (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e.key === "Enter") {
      console.log(subComment);
      addSubcom(subComment);
      setSubcomment("");
    }
  };

  const onSubmitSubComment = () => {
    addSubcom(subComment);
    setSubcomment("");
    console.log(subComment);
  };

  return (
    <>
      {/* 댓글 추가 */}
      <div key={co.commentId} className="my-8 border-b-2">
        <span className="border border-black px-2 py-1">{co.nickname}</span>
        <span className="text"> {co.content}</span>

        <div className="ml-24 text-sm">
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
            onClick={() => onDeletecomment(co.commentId)}
          >
            Delete
          </a>
          |
          <a
            type="button"
            className="cursor-pointer ml-1 text-gray-400/100"
            onClick={() => {
              setSubCommentToggle(!subCommentToggle);
            }}
          >
            답글 달기
          </a>
          {/* 댓글 Edit 버튼 */}
          {editCommentToggle && (
            <div className="flex justify-between gap-2">
              <textarea
                id="message"
                rows={2}
                className="mb-2 block p-2.5 mt-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                placeholder="댓글 수정"
                value={editComment}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  seteditComment(e.target.value);
                }}
                // onKeyPress={onEntereditComment}
              />
              <button
                type="button"
                className="cursor-pointer bg-blue-200 hover:bg-blue-400 w-20 h-10 mt-6 rounded-lg border-none"
                onClick={() => {
                  onEditcomment(co.commentId);
                }}
              >
                Edit
              </button>
              <button
                type="button"
                className="cursor-pointer bg-blue-200 hover:bg-blue-400 w-20 h-10 mt-6 rounded-lg border-none"
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
            <textarea
              id="message"
              rows={2}
              className="mb-2 block p-2.5 mt-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
              value={subComment}
              placeholder="답글 입력"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
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
