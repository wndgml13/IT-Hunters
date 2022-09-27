import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { BookmarkApi } from "../APIs/BookmarkApi";
import { CommentApi } from "../APIs/CommentApi";
import { PostsApi } from "../APIs/PostsApi";
import { ChatIcon, DeIcon, FeIcon, FuIcon } from "../assets/icons";
import { instance } from "../config/axios";
import { getCookieToken } from "../config/cookies";
import {
  useMoveScroolLocation,
  useMoveScroolStack,
  useMoveScroolInfo,
} from "../hooks/useMoveScrool";
import { loginInfoState } from "../store/loginInfoState";
import { CommentGet, OffersPost } from "../types/postsDetailType";
import { IQuest } from "../types/questType";
import { PostsComment } from "./Comments/PostsComment";

export const PostsDetail = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { elementLocation, onMoveToElementLocation } = useMoveScroolLocation();
  const { elementStack, onMoveToElementStack } = useMoveScroolStack();
  const { elementInfo, onMoveToElementInfo } = useMoveScroolInfo();

  const [locationTabLine, setLocationTabLine] = useState(false);
  const [stackTabLine, setStackTabLine] = useState(false);
  const [infoTabLine, setInfoTabLine] = useState(false);
  const [editDeleteToggle, setEditDeleteToggle] = useState(false);
  const [classes, setClasses] = useState({});

  const userToken = getCookieToken();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const userinfo = useRecoilValue(loginInfoState);

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
  console.log(quest);

  // 게시글 수정
  const onEditPosts = () => {
    navigate(`/editposts/${id}`);
  };

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

  // 직군 아이콘
  interface LooseObject {
    [key: string]: number | string;
  }
  const classesList: LooseObject = classes;
  const existStack = Object.keys(classesList).filter(
    item => classesList[item] !== 0,
  );

  useEffect(() => {
    if (quest) {
      setClasses(quest?.classes);
    }
  });

  return (
    <div className="w-full h-full overflow-y-scroll pb-[3.5rem] bg-slate-50">
      <button onClick={onBookMarkHandler}>⭐</button>☆
      <div className="flex mt-3">
        <button
          className="text-brandBlue text-2xl"
          onClick={() => navigate(-1)}
        >
          &lt;
        </button>
        <p className="ml-4 text-lg">게시판</p>
      </div>
      <div className="flex justify-start">
        <div className="m-4 relative w-[59px] h-[59px] bg-white rounded-full">
          <img
            className="w-full h-full border rounded-full"
            src={quest?.profileImg}
          />
        </div>

        <p className="text-[14px] grid justify-items-start mt-8">
          {quest?.nickname}
        </p>

        <Link to="/chats" className="ml-44 mt-8">
          <ChatIcon
            className={classNames({
              "fill-brandBlue": pathname === "/chats",
              "fill-black": pathname !== "/chats",
            })}
          />
        </Link>
      </div>
      <hr />
      <div className="flex justify-around text-[14px] mt-3 ">
        {locationTabLine ? (
          <button
            className="border-b-[2px] outline-none border-brandBlue text-black"
            onClick={() => {
              setLocationTabLine(locationTabLine);
              setStackTabLine(!stackTabLine);
              setInfoTabLine(!infoTabLine);
              onMoveToElementLocation();
            }}
          >
            작업 기간
          </button>
        ) : (
          <button
            className=" outline-none  text-gray-400/100 "
            onClick={() => {
              setLocationTabLine(!locationTabLine);
            }}
          >
            작업 기간
          </button>
        )}
        {stackTabLine ? (
          <button
            className="border-b-[2px] outline-none border-brandBlue text-black"
            onClick={() => {
              setStackTabLine(stackTabLine);
              setLocationTabLine(!locationTabLine);
              setInfoTabLine(!infoTabLine);
              onMoveToElementStack();
            }}
          >
            요구 스택
          </button>
        ) : (
          <button
            className=" outline-none  text-gray-400/100 "
            onClick={() => {
              setStackTabLine(!stackTabLine);
            }}
          >
            요구 스택
          </button>
        )}
        {infoTabLine ? (
          <button
            className="border-b-[2px] outline-none border-brandBlue text-black"
            onClick={() => {
              setInfoTabLine(infoTabLine);
              setLocationTabLine(!locationTabLine);
              setStackTabLine(!stackTabLine);
              onMoveToElementInfo();
            }}
          >
            상세 정보
          </button>
        ) : (
          <button
            className=" outline-none  text-gray-400/100 "
            onClick={() => {
              setInfoTabLine(!infoTabLine);
            }}
          >
            상세 정보
          </button>
        )}
      </div>
      {/* width 조절 해야 함 */}
      <div
        ref={elementLocation}
        className="flex justify-between bg-white  w-full h-[61px]"
      >
        <p className="text-[20px] text-brandBlue ml-10 mt-5">
          {quest?.duration}주
        </p>
        <p className="mt-5 mr-3">시작일: {quest?.createdAt.slice(0, 10)}</p>
      </div>
      <div ref={elementStack} className="bg-white w-full h-[201px] mt-3 p-5">
        <p>요구 스택</p>
        <ul className="grid gap-1 w-full grid-cols-3 mt-3">
          {quest?.stacks.map((stack, idx) => (
            <li key={idx}>
              <p className="flex justify-center p-2 w-full text-[14px] border-2 rounded-lg border-black">
                {stack}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div ref={elementInfo} className="bg-white w-full h-[612px] mt-3 p-5">
        <p>상세 정보</p>
        <div className="flex justify-between">
          <p className="text-xl font-normal font-cookie mt-3">{quest?.title}</p>
          {quest?.nickname === userinfo?.nickname ? (
            <a
              type="button"
              className="cursor-pointer"
              onClick={() => {
                setEditDeleteToggle(!editDeleteToggle);
              }}
            >
              ...
            </a>
          ) : null}
        </div>

        {/* tailwind */}
        {/* <div className="relative inline-block text-left flex flex-row-reverse">
          <div>
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
            >
              Options
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex={-1}
          >
            <div className="py-1" role="none">
              <a
                href="#"
                className="text-gray-700 block px-4 py-2 text-sm"
                role="menuitem"
                tabIndex={-1}
                id="menu-item-0"
              >
                Account settings
              </a>
              <a
                href="#"
                className="text-gray-700 block px-4 py-2 text-sm"
                role="menuitem"
                tabIndex={-1}
                id="menu-item-1"
              >
                Support
              </a>
              <a
                href="#"
                className="text-gray-700 block px-4 py-2 text-sm"
                role="menuitem"
                tabIndex={-1}
                id="menu-item-2"
              >
                License
              </a>
              <form method="POST" action="#" role="none">
                <button
                  type="submit"
                  className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-item-3"
                >
                  Sign out
                </button>
              </form>
            </div>
          </div>
        </div> */}
        {/* 제목 밑에 직군 아이콘 */}
        <ul className="flex flex-row-reverse mt-3">
          {existStack.map(stack => {
            switch (stack) {
              case "frontend":
                return (
                  <li key={stack}>
                    <FeIcon />
                  </li>
                );
              case "backend":
                return (
                  <li key={stack}>
                    <DeIcon />
                  </li>
                );
              case "designer":
                return (
                  <li key={stack}>
                    <DeIcon />
                  </li>
                );
              case "fullstack":
                return (
                  <li key={stack}>
                    <FuIcon />
                  </li>
                );
            }
          })}
        </ul>
        {editDeleteToggle && (
          <div className="flex-col grid justify-items-end shadow-[2px_0_0_rgb(0,0,0,0.1)]">
            <a
              className="border-none text-brandBlue cursor-pointer inline-flex w-[90px] justify-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
              onClick={onEditPosts}
            >
              수정하기
            </a>
            <a
              className="shadow-[0px_2px_0_0_rgb(0,0,0,0.1)] border-none border border-t-1 text-red-400 cursor-pointer inline-flex w-[90px] justify-center bg-white px-4 py-2 text-sm font-medium  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
              onClick={onDeletepost}
            >
              삭제하기
            </a>
          </div>
        )}
        <p className="my-5">{quest?.content}</p>
        <hr />
        <button
          type="button"
          className={
            "mt-5 text-white w-full h-[57px] bg-brandBlue font-bold rounded-lg text-lg px-5 py-2.5 mr-2 mb-[58px] focus:outline-none shadow-[5px_5px_0_0_rgb(244,200,40)]"
          }
          onClick={onOfferHandler}
        >
          참가하기
        </button>
      </div>
      {/* 댓글시작 */}
      {comments?.map((co: CommentGet) => (
        <PostsComment key={co.commentId} co={co} />
      ))}
      {/* 댓글 입력란 */}
      <div className="flex row mt-5 mb-20 gap-2">
        <input
          className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full h-14 p-2.5 mx-1"
          value={comment}
          placeholder="댓글을 입력해주세요."
          onChange={e => setComment(e.target.value)}
          onKeyPress={onEnterComment}
        />

        <button
          type="button"
          className="text-white w-20 h-[57px] bg-brandBlue font-bold rounded-lg  px-5 py-2.5 mr-2 mb-[58px] focus:outline-none shadow-[5px_5px_0_0_rgb(244,200,40)]"
          onClick={onSubmitComment}
        >
          댓글달기
        </button>
      </div>
    </div>
  );
};
