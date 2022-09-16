import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { CommentApi } from "../APIs/CommentApi";
import { PostsApi } from "../APIs/PostsApi";
import { instance } from "../config/axios";
import { getCookieToken } from "../config/cookies";
import { idState } from "../store/questIdState";
import { IQuestDetail, CommentGet, OffersPost } from "../types/postsDetailType";
import { PostsComment } from "./Comments/PostsComment";

export const PostsDetail = () => {
  const navigate = useNavigate();
  const userToken = getCookieToken();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [offer, setOffer] = useState("");
  const [idParam, setIdParam] = useRecoilState(idState);

  // 댓글, 답글 조회
  const { data: comments } = CommentApi.getComments(Number(id));
  // const getComments = async () => {
  //   const { data } = await instance.get<CommentGet[]>(
  //     `api/quests/${id}/comments`,
  //     {
  //       headers: { authorization: userToken },
  //     },
  //   );
  //   return data;
  // };

  // const { data: comments } = useQuery<CommentGet[]>(["comments"], getComments);

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
      addCom(comment);
      setComment("");
    }
  };

  const onSubmitComment = () => {
    addCom(comment);
    setComment("");
  };

  // 게시글 조회 -- api파일로 옮겨야함!!
  const { data: quest } = PostsApi.getDetailPosts(Number(id));
  // const getDetailPosts = async () => {
  //   const { data } = await instance.get<IQuestDetail>(`api/quests/${id}`, {
  //     headers: { authorization: userToken },
  //   });
  //   return data;
  // };

  // const { data: quest } = useQuery<IQuestDetail, Error>(
  //   ["Postsdetail"],
  //   getDetailPosts,
  // );

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

  // 신청하기(합류요청) POST
  const offerPost = async () => {
    try {
      const { data } = await instance.post<OffersPost>(
        `api/quests/${id}/offers`,
        { classType: "FRONTEND" },
        {
          headers: { authorization: userToken },
        },
      );
      alert("합류요청 완료!!");
      return data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 400) {
          // 모집인원이 0명이면 400에러가 뜸
          alert("본인 게시글에는 신청할 수 없습니다.");
        } else if (err.response?.status === 409) {
          alert("이미 신청이 완료되었습니다.");
        } else if (err.response?.status === 401) {
          alert("로그인 하신 후 신청해 주세요.");
          navigate("/signin");
        }
      }
    }
  };

  const onOfferHandler = () => {
    offerPost();

    return;
  };

  return (
    <div className="w-full h-full overflow-y-scroll pb-[3.5rem] p-4">
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
          onClick={onOfferHandler}
        >
          신청하기
        </button>
      </div>

      {/* 댓글시작 */}
      {comments?.map(co => (
        <PostsComment key={co.commentId} co={co} />
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
    </div>
  );
};
