import { useState } from "react";
import axios from "axios";
import { instance } from "../config/axios";

interface PostsAdd {
  title: string;
  content: string;
  frontend: number;
  duration: number;
}

export const PostsDetail = () => {
  const [nickname, setNickName] = useState("");
  const [content, setConTent] = useState("");
  const [stacklist, setStackList] = useState("");
  const [duration, setDuraTion] = useState("");
  const [backend, setBackEnd] = useState("");
  const [frontend, setFrontEnd] = useState("");
  const [designer, setDeSigner] = useState("");
  const [fullstack, setFullStack] = useState("");

  // const onSubmitHandler = async () => {
  //   try {
  //     let res = await axios({
  //       method: 'POST',
  //       url: "http://localhost:8080/api/quests",
  //       data: {

  //       }
  //     })
  //   }
  // }

  return (
    <>
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
      <h1>리액트 쿼리 사용자 모십니다.</h1>
      <p>구인스택</p>
      <p>프로젝트 예상 기간</p>
      <p>-모집인원-</p>
      <p>Backend</p>
      <p>Frontend</p>
      <p>Designer</p>
      <p>Fullstack</p>

      <div className="h-96 max-w-md bg-orange-200">
        <p>끝까지 함께 하실 분 모십니다.</p>
      </div>
      <button
        type="button"
        className="cursor-pointer bg-cyan-300 hover:bg-cyan-400 w-20 h-10 rounded-lg border-none"
      >
        수정하기
      </button>
      <button
        type="button"
        className="cursor-pointer bg-cyan-300 hover:bg-cyan-400 w-20 h-10 rounded-lg border-none
          ml-72 mt-5"
      >
        신청하기
      </button>
      <div className="mt-5 h-32 max-w-md bg-orange-200">
        <p>함께해요~~~</p>
      </div>
      <button
        type="button"
        className="cursor-pointer bg-cyan-300 hover:bg-cyan-400 w-20 h-10 rounded-lg border-none
          ml-96 mt-5"
      >
        댓글달기
      </button>
    </>
  );
};
