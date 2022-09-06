import {
  ContentInput,
  StackDropDown,
  BackendDropDown,
  FrontendDropDown,
  DesignerDropDown,
  FullstackDropDown,
  DuraTionDropDown,
  Down,
} from "../hooks/DropDown";
import { useState } from "react";
import axios from "axios";
import { instance } from "../config/axios";
import { ComponentProps } from "react";
import { getCookieToken } from "../config/cookies";
import { useMutation } from "@tanstack/react-query";

export interface PostsAdd {
  title: number & string;
  content: number & string;
  duration: number & string;
  backend: number & string;
  frontend: number & string;
  designer: number & string;
  fullstack: number & string;
}

export const AddPosts = () => {
  const userToken = getCookieToken();

  const [title, setTiTle] = useState("");
  const [nickname, setNickName] = useState("");
  const [content, setConTent] = useState("");
  const [stacklist, setStackList] = useState("");
  const [duration, setDuraTion] = useState("");
  const [backend, setBackEnd] = useState("");
  const [frontend, setFrontEnd] = useState("");
  const [designer, setDeSigner] = useState("");
  const [fullstack, setFullStack] = useState("");

  const titleInputHandler: ComponentProps<"input">["onChange"] = e => {
    setTiTle(e.target.value);
  };

  // const backendHandler: ComponentProps<"input">["onChange"] = e => {
  //   setBackEnd(e.target.value);
  // };
  // console.log(backend);

  const onSubmitHandler = async () => {
    try {
      const data = await instance.post(
        "api/quests",
        {
          title,
          content,
          stacklist,
          duration,
          backend,
          frontend,
          designer,
          fullstack,
        },
        { headers: { authorization: userToken } },
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

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
      <input
        className="border-b-gray-200 border-t-transparent border-r-transparent border-l-transparent outline-none border-double border-4 border-gray-600 w-3/7 text-3xl placeholder:italic placeholder:text-slate-300 text-center"
        placeholder="제목을 입력해주세요."
        onChange={titleInputHandler}
      ></input>
      {/* DropDown */}
      <div>
        {StackDropDown}
        {DuraTionDropDown}
        <p>- 모집인원 -</p>
        <p className="flex justify-between mr-96">Backend {BackendDropDown}</p>
        <p className="flex justify-between mr-96">
          Frontend {FrontendDropDown}
        </p>
        <p className="flex justify-between mr-96">
          Designer {DesignerDropDown}
        </p>
        <p className="flex justify-between mr-96">
          Fullstack {FullstackDropDown}
        </p>
      </div>
      {ContentInput}
      {Down}

      <button
        type="button"
        className="cursor-pointer bg-cyan-300 hover:bg-cyan-400 w-20 h-10 rounded-lg border-none
          ml-96 mt-5"
        onClick={onSubmitHandler}
      >
        등록하기
      </button>
    </>
  );
};
