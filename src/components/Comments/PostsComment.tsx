import { useState } from "react";
import { CommentGet } from "../../types/postsDetailType";
import { instance } from "../../config/axios";
import { getCookieToken } from "../../config/cookies";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

export const PostsComment = () => {
  const userToken = getCookieToken();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [editCommentToggle, setEditCommentToggle] = useState(false);
  const [editSubCommentToggle, setEditSubCommentToggle] = useState(false);
  const [subCommentToggle, setSubCommentToggle] = useState(false);
  const navigate = useNavigate();
  const [subComment, setSubcomment] = useState<string>("");

  // 댓글, 대댓글 조회
  const getComments = async () => {
    const { data } = await instance.get<CommentGet[]>(
      `api/quests/${id}/comments`,
      {
        headers: { authorization: userToken },
      },
    );
    // console.log(data);
    return data;
  };

  const { data: comments } = useQuery<CommentGet[]>(["comments"], getComments);
  console.log(comments);

  // 댓글 작성 -- api파일로 옮겨야함!!
  const addComment = async (comment: string) => {
    const { data } = await instance.post(
      `/api/quests/${id}/comments`,
      { content: comment },
      {
        headers: { authorization: userToken },
      },
    );
    return data;
  };

  const { mutate: addCom } = useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
    },
  });

  const onEnterComment = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log(comment);
      addCom(comment);
      setComment("");
    }
  };

  const onSubmitComment = () => {
    addCom(comment);
    setComment("");
  };

  // 댓글 수정 -- api파일로 옮겨야함!!
  const { mutate: editComment } = useMutation(
    (content: number) =>
      instance.put(`/api/quests/${id}/comments/5`, {
        headers: { authorization: userToken },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments"]);
      },
    },
  );

  const onEditcomment = (content: number) => {
    editComment(content);
  };

  // 대댓글 작성 -- api파일로 옮겨야함!!
  const addSubComment = async (subcomment: string) => {
    const { data } = await instance.post(
      `/api/quests/${id}/comments/5/subComments`,
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

  // 대댓글 삭제 -- api파일로 옮겨야함!!
  const { mutate: delSubcomment } = useMutation(
    (subCommentId: number) =>
      instance.delete(
        `/api/quests/${id}/comments/5/subComments/${subCommentId}`,
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

  const onDeletesubComment = (subCommentId: number) => {
    delSubcomment(subCommentId);
  };

  return (
    <>
      {/* 댓글 추가 */}
      {comments?.map(data => (
        <div key={data.commentId} className="my-8 border-b-2">
          <span className="border border-black px-2 py-1">{data.nickname}</span>
          <span className="text"> {data.content}</span>

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
              onClick={() => onDeletecomment(data.commentId)}
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
                />
                <button
                  type="button"
                  className="cursor-pointer bg-blue-200 hover:bg-blue-400 w-20 h-10 mt-6 rounded-lg border-none"
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
          {data?.subCommentList.map(sc => (
            <>
              <div key={sc.subCommentId} className="mx-14 my-5">
                <span className="border border-black px-2 py-1">
                  {sc.nickname}
                </span>
                <span> {sc.content}</span>
                <div className="ml-24 text-sm">
                  <a
                    type="button"
                    className="cursor-pointer mr-1 text-gray-400/100 hover:text-blue-600/100"
                    onClick={() => {
                      // upDateComment(data.commentId);
                      setEditSubCommentToggle(!editSubCommentToggle);
                    }}
                  >
                    Edit
                  </a>
                  |
                  <a
                    type="button"
                    className="cursor-pointer ml-1 mr-1 text-gray-400/100 hover:text-blue-600/100"
                    onClick={() => onDeletesubComment(sc.subCommentId)}
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
                  />
                  <button
                    type="button"
                    className="cursor-pointer bg-blue-200 hover:bg-blue-400 w-20 h-10 mt-3 rounded-lg border-none"
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
                onClick={onSubmitSubComment}
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
      ))}
      {/* 댓글 입력란 */}
      <div className="flex row mt-5 mb-20 ">
        <input
          className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full h-14 p-2.5 mx-1"
          value={comment}
          placeholder="댓글을 입력해주세요."
          onChange={e => setComment(e.target.value)}
          onKeyPress={onEnterComment}
        />

        <button
          type="button"
          className="cursor-pointer bg-cyan-300 hover:bg-cyan-400  w-20 h-14 rounded-lg border-none"
          onClick={onSubmitComment}
        >
          댓글달기
        </button>
      </div>
    </>
  );
};
