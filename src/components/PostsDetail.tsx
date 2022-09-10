import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { instance } from "../config/axios";
import { getCookieToken, setAccessToken } from "../config/cookies";
import {
  IQuestDetail,
  IQuestDetailPut,
  CommentGet,
} from "../types/postsDetailType";

export const PostsDetail = () => {
  const userToken = getCookieToken();
  const queryClient = useQueryClient();
  const [comment, setComment] = useState("");
  const { id } = useParams();

  // 댓글 관련 -- api파일로 옮겨야함!!
  const getComments = async () => {
    const { data } = await instance.get<CommentGet[]>(
      `api/quests/${id}/comments`,
      {
        headers: { authorization: userToken },
      },
    );
    return data;
  };

  const { data: comments } = useQuery<CommentGet[]>(["comments"], getComments);

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

  // 포스트관련 -- api파일로 옮겨야함!!
  const getDetailPosts = async () => {
    const { data } = await instance.get<IQuestDetail>(`api/quests/${id}`, {
      headers: { authorization: userToken },
    });
    return data;
  };

  const { data: quest } = useQuery<IQuestDetail, Error>(
    ["Postsdetail"],
    getDetailPosts,
  );

  console.log(quest);
  return (
    <div className="w-full p-4">
      <div className="flex justify-start">
        <div className="m-5 overflow-hidden relative w-24 h-24 bg-gray-100 rounded-full dark:bg-gray-600"></div>
        <div className="grid justify-items-start mt-5 m-3">
          <p>닉네임: {quest?.nickname}</p>
        </div>
      </div>
      {/* 제목 입력 란 */}
      <h1 className="text-2xl text-center border border-b-black">
        {" "}
        {quest?.title}
      </h1>
      <p>구인스택</p>
      <div className="flex row">
        {quest?.stacks.map(st => (
          <p className="bg-green-300 mx-2">{st}</p>
        ))}
      </div>
      <p>프로젝트 예상 기간 {quest?.duration}주</p>

      <p>-모집인원-</p>
      <p>Backend {quest?.classes.backend}명</p>
      <p>Frontend {quest?.classes.frontend}명</p>
      <p>Designer {quest?.classes.designer}명</p>
      <p>Fullstack {quest?.classes.fullstack}명</p>

      <div className="h-80 p-4 bg-blue-100">
        <p>{quest?.content}</p>
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          className="cursor-pointer bg-blue-200 hover:bg-blue-400  h-10 mt-5 rounded-lg border-none"
        >
          수정하기
        </button>
        <button
          type="button"
          className=" cursor-pointer bg-blue-200 hover:bg-blue-400  h-10 rounded-lg border-none
             mt-5"
        >
          신청하기
        </button>
      </div>

      {/* 댓글시작 */}
      {comments?.map(data => (
        <div key={data.commentId} className="my-5">
          <span className="border border-black px-2 py-1">{data.nickname}</span>
          <span className="text"> {data.content}</span>
        </div>
      ))}
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
          className="cursor-pointer bg-cyan-300 hover:bg-cyan-400  w-20 h-14 rounded-lg border-none
     "
          onClick={onSubmitComment}
        >
          댓글달기
        </button>
      </div>
    </div>
  );
};
