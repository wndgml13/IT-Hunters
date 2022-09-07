import {
  ContentInput,
  StackDropDown,
  BackendDropDown,
  FrontendDropDown,
  DesignerDropDown,
  FullstackDropDown,
  DuraTionDropDown,
} from "../hooks/dropdown";
import { useState } from "react";
import axios from "axios";
import { instance } from "../config/axios";
import { ComponentProps } from "react";
import { getCookieToken } from "../config/cookies";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export interface PostsAdd {
  title: string;
  content: string;
  duration: number;
  stacks: string[];
  backend: number;
  frontend: number;
  designer: number;
  fullstack: number;
}

export const AddPosts = () => {
  const userToken = getCookieToken();
  const navigate = useNavigate();

  const [title, setTiTle] = useState<string>("");
  const [content, setConTent] = useState<string>("");
  const [stacks, setStacks] = useState<string[]>([]);
  const [duration, setDuraTion] = useState<number>(0);
  const [backend, setBackEnd] = useState<number>(0);
  const [frontend, setFrontEnd] = useState<number>(0);
  const [designer, setDeSigner] = useState<number>(0);
  const [fullstack, setFullStack] = useState<number>(0);
  const [postInfo, setPostInfo] = useState<PostsAdd>({
    title,
    content,
    duration,
    stacks,
    backend,
    frontend,
    designer,
    fullstack,
  });

  // const titleInputHandler: ComponentProps<"input">["onChange"] = e => {
  //   setTiTle(e.target.value);
  // };

  // const backendHandler: ComponentProps<"input">["onChange"] = e => {
  //   setBackEnd(e.target.value);
  // };
  // console.log(backend);

  // const addposts = async () => {
  //   const { data } = await instance.post<PostsAdd>(
  //     "https://g10000.shop/api/quests",
  //     {
  //       title,
  //       content,
  //       stacklist,
  //       duration,
  //       backend,
  //       frontend,
  //       designer,
  //       fullstack,
  //     },
  //   );
  // };

  const addPost = async (postInfo: PostsAdd) => {
    const { data } = await instance.post("api/quests", postInfo, {
      headers: { authorization: userToken },
    });
    return data;
  };
  const addPostsMutation = () => {
    return useMutation((data: PostsAdd) => {
      return addPost(data);
    });
  };

  const { mutateAsync } = addPostsMutation();
  const onSubmitHandler = async () => {
    if (postInfo) {
      try {
        console.log("onSubmitHandler");
        const responce = await mutateAsync(postInfo);
        console.log(responce);
        alert("게시글 작성 완료!");
        navigate("/search");
        return;
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("내용을 전부 입력해주세요!!");
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
      ></input>
      {/* DropDown */}
      <div>
        <p className="flex justify-between mr-96">구인스택 {StackDropDown}</p>
        <p className="flex justify-between mr-96">
          프로젝트 예상 기간 {DuraTionDropDown}
        </p>
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
