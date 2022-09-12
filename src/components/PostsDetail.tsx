import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { instance } from "../config/axios";
import { getCookieToken } from "../config/cookies";
import { IQuestDetail, IQuestDetailPut } from "../types/postsDetailType";

export const PostsDetail = () => {
  const { questId } = useParams();
  const userToken = getCookieToken();
  const navigate = useNavigate();

  const [postsTitle, setPostsTitle] = useState("");
  const [postsContent, setPostsContent] = useState("");
  const [postsFrontend, setPostsFrontend] = useState("");
  const [postsBackend, setPostsBackend] = useState("");
  const [postsFullstack, setPostsFullstack] = useState("");
  const [postsDesigner, setPostsDesigner] = useState("");
  const [postsDuration, setPostsDuration] = useState("");
  const [postsStacks, setPostsStacks] = useState("");
  const [postsResult, setPostsResult] = useState("");
  const [postsPublished, setPostsPublished] = useState("");

  const fortmatResponse = (res: IQuestDetailPut) => {
    return JSON.stringify(res, null, 2);
  };

  const { isLoading: isUpdatingTutorial, mutate: updateTutorial } = useMutation<
    IQuestDetailPut,
    Error
  >(
    async () => {
      return await putDetailPosts();
    },
    // {
    //   onSuccess: res => {
    //     setPostsResult(fortmatResponse(res));
    //   },
    //   onError: err => {
    //     setPostsResult(fortmatResponse(err.responce?.data || err));
    //   },
    // },
  );

  const putDetailPosts = async () => {
    const responce = await instance.put<IQuestDetailPut>("api/quests/15", {
      headers: { authorization: userToken },
    });
    return responce.data;
  };

  const deleteDetailPosts = async () => {
    await instance.delete<IQuestDetail>("api/quests/15", {
      headers: { authorization: userToken },
    });
  };

  // 댓글 기능 구현
  // const getComments = async () => {
  //   const { data } = await instance.get<CommentGet>("api/quests/16/comments", {
  //     headers: { authorization: userToken },
  //   });
  //   return data;
  // };

  // const { data: comments } = useQuery<CommentGet, Error>(
  //   ["comments"],
  //   getComments,
  // );
  // console.log(comments);

  const getDetailPosts = async () => {
    const { data } = await instance.get<IQuestDetail>("api/quests/15", {
      headers: { authorization: userToken },
    });
    return data;
  };

  const {
    data: quest,
    isError,
    error,
    isLoading,
  } = useQuery<IQuestDetail, Error>(["Postsdetail"], getDetailPosts);

  if (isError) {
    <div>{error.message}</div>;
  }
  // console.log(quest);
  return (
    <div className="w-full p-12">
      <div className="flex flex-row-reverse">
        <button
          type="button"
          className="cursor-pointer bg-cyan-300 hover:bg-cyan-400 h-10 mt-5 rounded-lg border-none"
          onClick={() => {
            deleteDetailPosts();
            navigate("/search");
          }}
        >
          게시글 삭제
        </button>
      </div>
      <div className="flex justify-start">
        <div className="m-5 overflow-hidden relative w-24 h-24 bg-gray-100 rounded-full dark:bg-gray-600">
          <svg
            className="absolute -left-1 w-28 h-28 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <div className="grid justify-items-start mt-5 m-3">
          <p>닉네임:</p>
          <p>직업:</p>
        </div>
      </div>

      {/* 제목 입력 란 */}
      <h1>{quest?.title}</h1>
      <p>구인스택 {quest?.stacks}</p>
      <p>프로젝트 예상 기간 {quest?.duration}주</p>
      <p>-모집인원-</p>
      <p>Backend {quest?.classes.backend}명</p>
      <p>Frontend {quest?.classes.frontend}명</p>
      <p>Designer {quest?.classes.designer}명</p>
      <p>Fullstack {quest?.classes.fullstack}명</p>

      <div className="h-96  bg-orange-200">
        <p>{quest?.content}</p>
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          className="cursor-pointer bg-cyan-300 hover:bg-cyan-400  h-10 mt-5 rounded-lg border-none"
        >
          수정하기
        </button>
        <button
          type="button"
          className=" cursor-pointer bg-cyan-300 hover:bg-cyan-400  h-10 rounded-lg border-none
             mt-5"
        >
          신청하기
        </button>
      </div>
      <div className="mt-5 h-32  bg-orange-200">
        <p>함께해요~~~</p>
      </div>

      <div className="flex flex-row-reverse">
        <button
          type="button"
          className="cursor-pointer bg-cyan-300 hover:bg-cyan-400  h-10 rounded-lg border-none
           mt-5"
        >
          댓글달기
        </button>
      </div>
    </div>
  );
};
