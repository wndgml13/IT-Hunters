import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { BookmarkApi } from "../APIs/BookmarkApi";
import { CommentApi } from "../APIs/CommentApi";
import { PostsApi } from "../APIs/PostsApi";
import { DeIcon, FeIcon, FuIcon } from "../assets/icons";
import { instance } from "../config/axios";
import { getCookieToken } from "../config/cookies";
import {
  useMoveScroolLocation,
  useMoveScroolStack,
  useMoveScroolInfo,
} from "../hooks/useMoveScrool";
import convertDateText from "../lib/convertDateText";
import { loginInfoState } from "../store/loginInfoState";
import { CommentGet, OffersPost } from "../types/postsDetailType";
import { PostsComment } from "./Comments/PostsComment";

export const PostsDetail = () => {
  const navigate = useNavigate();

  const { elementLocation, onMoveToElementLocation } = useMoveScroolLocation(); // 작업 기간 스크롤 고정
  const { elementStack, onMoveToElementStack } = useMoveScroolStack(); // 요구 스택 스크롤 고정
  const { elementInfo, onMoveToElementInfo } = useMoveScroolInfo(); // 상세 정보 스크롤 고정

  const [locationTabLine, setLocationTabLine] = useState(false); // 작업 기간 탭
  const [stackTabLine, setStackTabLine] = useState(false); // 요구 스택 탭
  const [infoTabLine, setInfoTabLine] = useState(false); // 상세 정보 탭
  const [editDeleteToggle, setEditDeleteToggle] = useState(false); // 수정,삭제 점 3개 토글
  const [classes, setClasses] = useState({}); // 직군 아이콘

  const [deleteModal, setDeleteModal] = useState(false); // 게시글 삭제하기 모달창 띄우고 닫기

  const userToken = getCookieToken();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [comment, setComment] = useState(""); // 댓글 작성
  const userinfo = useRecoilValue(loginInfoState); // 내 게시글 or 댓글에만 수정,삭제 버튼 보이게

  // 댓글, 답글 조회
  const { data: comments } = CommentApi.getComments(Number(id));
  console.log(comments);
  // 댓글 작성
  const { mutateAsync: addComment } = CommentApi.addComment();

  const onSubmitComment = () => {
    if (comment) {
      const payload = { id: Number(id), comment: comment };
      addComment(payload).then(() => {
        queryClient.invalidateQueries(["comments"]);
      });
      setComment("");
    }
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
      queryClient.invalidateQueries(["filterlist"]);
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

  // 모달 바깥 창을 클릭했을 때 모달창 닫기
  const modalClose = () => {
    setDeleteModal(!deleteModal);
  };
  // useEffect(() => {
  //   const clickOutside = e => {
  //     // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
  //     if (actionModal && node.current && !node.current.contains(e.target)) {
  //       setActionModal(false);
  //     }
  //   };
  // });

  return (
    <div className="w-full h-full overflow-y-scroll pb-[3.5rem] bg-slate-50">
      <button onClick={onBookMarkHandler}>⭐</button>☆
      <div className="flex my-3 ml-4">
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
            className="w-full h-full border rounded-full cursor-pointer"
            src={quest?.profileImg}
            onClick={() => {
              navigate(`/user/${userinfo.id}`);
            }}
          />
        </div>
        <button
          className="h-full text-[14px] grid justify-items-start mt-8 hover:outline-none hover:border-b-2 border-black"
          onClick={() => {
            navigate(`/user/${userinfo.id}`);
          }}
        >
          {quest?.nickname}
        </button>
      </div>
      <hr />
      <div className="flex justify-around text-[14px] mt-3 ">
        {locationTabLine ? (
          <button
            className="border-b-[3px] outline-none border-brandBlue text-black"
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
            className="border-b-[3px] outline-none border-brandBlue text-black"
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
            className="border-b-[3px] outline-none border-brandBlue text-black"
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
      {/* 요구 스택 heigt 조절 필요 */}
      <div ref={elementStack} className="bg-white w-full mt-3 p-5">
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
      <div ref={elementInfo} className="relative bg-white w-full mt-3 p-5">
        <p>상세 정보</p>
        <div className="flex justify-between">
          <p className="text-xl font-normal font-cookie mt-3">{quest?.title}</p>

          {quest?.nickname === userinfo?.nickname ? (
            <button
              className="cursor-pointer"
              onClick={() => {
                setEditDeleteToggle(!editDeleteToggle);
              }}
            >
              ...
            </button>
          ) : null}
        </div>
        <p className="text-xs text-gray-400">
          {quest?.createdAt && convertDateText(quest?.createdAt)}
        </p>

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
          <div className="absolute right-5 top-[75px] flex-col grid justify-items-end drop-shadow-lg">
            <button
              className="border-none text-brandBlue cursor-pointer inline-flex w-[90px] justify-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50 focus:outline-none  focus:ring-offset-2 focus:ring-offset-gray-100"
              onClick={onEditPosts}
            >
              수정하기
            </button>
            <button
              className=" border-none border text-red-400 cursor-pointer inline-flex w-[90px] justify-center bg-white px-4 py-2 text-sm font-medium  hover:bg-gray-50 focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-100"
              onClick={() => {
                setDeleteModal(!deleteModal);
              }}
            >
              삭제하기
            </button>
          </div>
        )}
        <p className="my-5">{quest?.content}</p>
        <hr />
        <button
          type="button"
          className={
            "mt-5 mb-5 text-white w-full h-[57px] bg-brandBlue font-bold rounded-lg text-lg px-5 py-2.5 mr-2 focus:outline-none shadow-[5px_5px_0_0_rgb(244,200,40)]"
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
      <div className="flex row mt-5  gap-2 p-2">
        <img
          className="mt-1 w-12 h-12 border rounded-full"
          src={userinfo?.profileImage}
        />
        <input
          className="bg-gray-50 border-2 border-brandBlue text-gray-900 text-sm rounded-3xl focus:outline-none focus:ring focus:ring-brandBlue w-full h-14 p-2.5 mx-1"
          value={comment}
          placeholder="댓글을 입력해주세요."
          onChange={e => setComment(e.target.value)}
          onKeyPress={onEnterComment}
        />

        <button
          type="button"
          className="text-white text-sm w-20 h-[57px] bg-brandBlue font-bold rounded-2xl  px-5 py-1.5 mr-2 mb-3 focus:outline-none shadow-[5px_5px_0_0_rgb(244,200,40)]"
          onClick={onSubmitComment}
        >
          댓글달기
        </button>
      </div>
      {/* 게시글 삭제 모달창 */}
      {deleteModal && (
        <div onClick={modalClose}>
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-[250px] sm:max-w-lg">
                <div onClick={e => e.stopPropagation()}>
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <svg
                          className="h-6 w-6 text-red-600"
                          fill="none"
                          stroke-width="1.5"
                          stroke="currentColor"
                        >
                          <path d="M12 10.5v3.75m-9.303 3.376C1.83 19.126 2.914 21 4.645 21h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 4.88c-.866-1.501-3.032-1.501-3.898 0L2.697 17.626zM12 17.25h.007v.008H12v-.008z" />
                        </svg>
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <span
                          className="text-xl font-normal font-cookie"
                          id="modal-title"
                        >
                          삭제하겠는가?
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    {deleteModal && (
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={modalClose}
                      >
                        취소
                      </button>
                    )}
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={onDeletepost}
                    >
                      확인
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
