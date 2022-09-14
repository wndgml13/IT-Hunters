import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { instance } from "../config/axios";
import { getCookieToken } from "../config/cookies";
import { IQuestDetail, CommentGet } from "../types/postsDetailType";
import { PostsComment } from "./Comments/PostsComment";

export const PostsDetail = () => {
  const userToken = getCookieToken();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();

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

  // 게시글 삭제 -- api 파일로 옮겨야함!!
  const deleteposts = async () => {
    const { data } = await instance.delete(`/api/quests/${id}`, {
      headers: { authorization: userToken },
    });
    return data;
  };

  const { mutate: delpost } = useMutation(deleteposts, {
    onSuccess: () => {
      queryClient.invalidateQueries(["filterlist"]);
    },
  });

  const onDeletepost = () => {
    delpost();
    navigate("/search");
  };

  // 신청하기 -- api 파일로 옮겨야함!!
  // const offersPosts = async () => {
  //   const { data } = await instance.post<OffersPost>(
  //     `/api/quests/${id}/offers`,
  //     {
  //       headers: { authorization: userToken },
  //     },
  //   );
  //   return data;
  // };

  // console.log(quest);
  return (
    <div className="w-full p-4">
      <div className="flex flex-row-reverse">
        <button
          type="button"
          className="cursor-pointer bg-blue-200 hover:bg-blue-400  h-10 mt-5 rounded-lg border-none"
          onClick={onDeletepost}
        >
          게시글 삭제
        </button>
      </div>
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
          // onClick={() => {
          //   navigate(`/addposts/${nickname}`);
          // }}
        >
          신청하기
        </button>
      </div>

      {/* 댓글시작 */}
      <PostsComment />
    </div>
  );
};
