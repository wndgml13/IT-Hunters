import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BookmarkApi } from "../APIs/BookmarkApi";
import { CommentApi } from "../APIs/CommentApi";
import { PostsApi } from "../APIs/PostsApi";
import { instance } from "../config/axios";
import { getCookieToken } from "../config/cookies";
import { CommentGet, OffersPost } from "../types/postsDetailType";
import { PostsComment } from "./Comments/PostsComment";

export const PostsDetail = () => {
  const navigate = useNavigate();
  const userToken = getCookieToken();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [bookMark, setBookMark] = useState(false);

  // 게시글 수정 state -- 작업중
  const [title, setTitle] = useState(Number(id));
  const [content, setContent] = useState(Number(id));
  const [frontend, setFrontend] = useState(Number(id));
  const [backend, setBackend] = useState(Number(id));
  const [designer, setDesigner] = useState(Number(id));
  const [fullstack, setFullStack] = useState(Number(id));
  const [duration, setDuration] = useState(Number(id));
  const [stacks, setStacks] = useState(Number(id));

  // 댓글, 답글 조회
  const { data: comments } = CommentApi.getComments(Number(id));

  // 댓글 작성
  const { mutateAsync: addComment } = CommentApi.addComment();

  const onSubmitComment = () => {
    const payload = { id: Number(id), comment: comment };
    addComment(payload).then(() => {
      queryClient.invalidateQueries(["comments"]);
    });
    setComment("");
  };

  const onEnterComment = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmitComment();
      setComment("");
    }
  };

  // 게시글 조회
  const { data: quest } = PostsApi.getDetailPosts(Number(id));

  // 게시글 수정 -- 작업중
  // const { mutateAsync: editPosts } = PostsApi.editPosts();

  // const onEditPosts = () => {
  //   const payload = {
  //     id: Number(id),
  //     title: title,
  //     content: content,
  //     frontend: frontend,
  //     backend: backend,
  //     designer: designer,
  //     fullstack: fullstack,
  //     duration: duration,
  //     stacks: stacks,
  //   };
  //   editPosts(payload).then(() => {
  //     queryClient.invalidateQueries(["Postsdetail"]);
  //   });
  // };

  // 게시글 삭제
  const { mutateAsync: deleteposts } = PostsApi.deleteposts();

  const onDeletepost = () => {
    deleteposts(Number(id)).then(() => {
      queryClient.invalidateQueries(["Postsdetail"]);
    });
    navigate("/search");
  };

  // 신청하기(합류요청) POST -- 작업중
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

  // 게시글 북마크 POST
  const { mutateAsync: bookMarkpost } = BookmarkApi.bookMarkpost();

  const onBookMarkHandler = () => {
    bookMarkpost(Number(id));
  };

  return (
    <div className="w-full h-full overflow-y-scroll pb-[3.5rem] p-4">
      <button onClick={onBookMarkHandler}>⭐</button>☆
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
      {comments?.map((co: CommentGet) => (
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
