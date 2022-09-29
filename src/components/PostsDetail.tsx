import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
// import { BookmarkApi } from "../APIs/BookmarkApi";
import { CommentApi } from "../APIs/CommentApi";
import { PostsApi } from "../APIs/PostsApi";
import { DeIcon, FeIcon, FuIcon } from "../assets/icons";
import { instance } from "../config/axios";
import convertDateText from "../lib/convertDateText";
import { loginInfoState } from "../store/loginInfoState";
import { CommentGet, OffersPost } from "../types/postsDetailType";
import { PostsComment } from "./Comments/PostsComment";
import { DeletePostModal } from "./DeletePostMdoal";
import { PageHeader } from "./PageHeader";

export const PostsDetail = () => {
  const navigate = useNavigate();

  const [editDeleteToggle, setEditDeleteToggle] = useState(false); // 수정,삭제 점 3개 토글
  const [classes, setClasses] = useState({}); // 직군 아이콘

  const [deleteModal, setDeleteModal] = useState(false); // 게시글 삭제하기 모달창 띄우고 닫기

  const queryClient = useQueryClient();
  const { id } = useParams();
  const [comment, setComment] = useState(""); // 댓글 작성
  const userinfo = useRecoilValue(loginInfoState); // 내 게시글 or 댓글에만 수정,삭제 버튼 보이게

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
      );
      alert("합류요청 완료!!");
      return data;
    } catch (err) {
      if (err instanceof AxiosError) {
        alert(err.response?.data.message);
        // if (err.response?.status === 400) {
        //   // 모집인원이 0명이면 400에러가 뜸
        //   alert("본인 게시글에는 신청할 수 없습니다.");
        // } else if (err.response?.status === 409) {
        //   alert("이미 신청이 완료되었습니다.");
        // } else if (err.response?.status === 401) {
        //   alert("로그인 하신 후 신청해 주세요.");
        //   navigate("/signin");
        // }
      }
    }
  };

  const onOfferHandler = () => {
    offerPost();
    return;
  };

  // 게시글 북마크 POST
  // const { mutateAsync: bookMarkpost } = BookmarkApi.bookMarkpost();

  // const onBookMarkHandler = () => {
  //   bookMarkpost(Number(id));
  // };

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
  const durationTab = useRef<HTMLDivElement>(null);
  const stacksTab = useRef<HTMLDivElement>(null);
  const contentTab = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full h-full overflow-y-scroll pb-[3.5rem] bg-[#f5f5f5]">
      <div className="flex ml-6">
        <PageHeader pgTitle={"게시판"} />
      </div>
      <div className="flex mx-6 mt-[28px] mb-[18px]">
        <div className="w-[59px] h-[59px]">
          <Link to={`/user/${quest?.memberId}`}>
            <img
              className="w-full h-full border rounded-full"
              src={quest?.profileImg}
            />
          </Link>
        </div>
        <p className="text-[14px] ml-[10px] py-5">
          <Link to={`/user/${quest?.memberId}`}> {quest?.nickname}</Link>
        </p>
      </div>
      <hr />
      <div className="flex justify-around text-[14px] mt-3 ">
        <button
          className="border-b-[2px] pb-2 px-2 outline-none focus-within:border-brandBlue text-black"
          onClick={() =>
            durationTab.current?.scrollIntoView({ behavior: "smooth" })
          }
        >
          작업 기간
        </button>

        <button
          className="border-b-[2px] pb-2 px-2 outline-none focus-within:border-brandBlue text-black"
          onClick={() =>
            stacksTab.current?.scrollIntoView({ behavior: "smooth" })
          }
        >
          요구 스택
        </button>

        <button
          className="border-b-[2px] pb-2 px-2 outline-none focus-within:border-brandBlue text-black"
          onClick={() =>
            contentTab.current?.scrollIntoView({ behavior: "smooth" })
          }
        >
          상세 정보
        </button>
      </div>
      {/* width 조절 해야 함 */}
      <div
        className="flex justify-between bg-white w-full py-5"
        ref={durationTab}
      >
        <p className="text-[20px] text-brandBlue ml-[49px]">
          {quest?.duration}주
        </p>
        <p className="mr-7">시작일: {quest?.createdAt.slice(0, 10)}</p>
      </div>
      {/* 요구 스택 heigt 조절 필요 */}
      <div className="bg-white w-full mt-3 p-6" ref={stacksTab}>
        <p>요구 스택</p>
        <ul className="grid gap-2 w-full grid-cols-3 mt-3">
          {quest?.stacks.map((stack, idx) => (
            <li key={idx}>
              <p className="flex justify-center p-2 w-full text-[14px] border-2 rounded-lg border-black">
                {stack}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white w-full mt-3 p-6">
        <p>남은 직업군</p>
        <ul className="grid gap-2 w-full grid-cols-2 mt-3">
          <li className="grid gap-2 grid-cols-2">
            <p>프론트엔드</p> <p>: {quest?.classes.frontend} 명</p>
          </li>
          <li className="grid gap-2 grid-cols-2">
            <p>백엔드 </p> <p>: {quest?.classes.backend} 명</p>
          </li>
          <li className="grid gap-2 grid-cols-2">
            <p>디자이너 </p> <p>: {quest?.classes.designer} 명</p>
          </li>
          <li className="grid gap-2 grid-cols-2">
            <p>풀스택 </p> <p>: {quest?.classes.fullstack} 명</p>
          </li>
        </ul>
      </div>
      <div className="relative bg-white w-full mt-3 pt-7" ref={contentTab}>
        <p className="px-6">상세 정보</p>
        <div className="flex justify-between">
          <p className="text-xl font-normal font-cookie px-6 mt-[10px]">
            {quest?.title}
          </p>

          {quest?.nickname === userinfo?.nickname ? (
            <button
              className="cursor-pointer mr-6"
              onClick={() => {
                setEditDeleteToggle(!editDeleteToggle);
              }}
            >
              <svg
                width="5"
                height="23"
                viewBox="0 0 5 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.20019 17.6016C2.63535 17.6016 3.06074 17.7306 3.42256 17.9724C3.78438 18.2141 4.06638 18.5577 4.23291 18.9598C4.39944 19.3618 4.44301 19.8042 4.35811 20.231C4.27322 20.6578 4.06367 21.0498 3.75597 21.3575C3.44826 21.6652 3.05623 21.8748 2.62943 21.9597C2.20263 22.0446 1.76025 22.001 1.35822 21.8345C0.956182 21.6679 0.612559 21.3859 0.370798 21.0241C0.129037 20.6623 -1.83826e-06 20.2369 -1.81924e-06 19.8018C-1.79373e-06 19.2182 0.231804 18.6586 0.644421 18.246C1.05704 17.8334 1.61667 17.6016 2.20019 17.6016ZM2.20019 8.80078C2.63535 8.80078 3.06074 8.92982 3.42256 9.17158C3.78438 9.41334 4.06638 9.75696 4.23291 10.159C4.39944 10.561 4.44301 11.0034 4.35811 11.4302C4.27322 11.857 4.06367 12.249 3.75597 12.5568C3.44826 12.8645 3.05623 13.074 2.62943 13.1589C2.20263 13.2438 1.76025 13.2002 1.35822 13.0337C0.956182 12.8672 0.612559 12.5852 0.370799 12.2233C0.129038 11.8615 -1.45356e-06 11.4361 -1.43454e-06 11.001C-1.40904e-06 10.4174 0.231804 9.85782 0.644421 9.4452C1.05704 9.03259 1.61667 8.80078 2.20019 8.80078ZM2.20019 -9.61736e-08C2.63535 -7.71523e-08 3.06074 0.129039 3.42256 0.3708C3.78438 0.61256 4.06638 0.956184 4.23291 1.35822C4.39944 1.76025 4.44301 2.20264 4.35811 2.62943C4.27322 3.05623 4.06367 3.44827 3.75597 3.75597C3.44826 4.06367 3.05623 4.27322 2.62943 4.35811C2.20263 4.44301 1.76025 4.39944 1.35822 4.23291C0.956183 4.06638 0.612559 3.78438 0.370799 3.42256C0.129038 3.06074 -1.06887e-06 2.63535 -1.04985e-06 2.2002C-1.02434e-06 1.61667 0.231805 1.05704 0.644421 0.644422C1.05704 0.231805 1.61667 -1.2168e-07 2.20019 -9.61736e-08V-9.61736e-08Z"
                  fill="#141124"
                />
              </svg>
            </button>
          ) : null}
        </div>
        <p className="text-xs mt-1 mx-6 text-gray-400">
          {quest?.createdAt && convertDateText(quest?.createdAt)}
        </p>

        {/* 제목 밑에 직군 아이콘 */}
        <ul className="flex flex-row-reverse mt-3 mr-6">
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
              className="border-none text-brandBlue cursor-pointer inline-flex w-[90px] justify-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
              onClick={onEditPosts}
            >
              수정하기
            </button>
            <button
              className=" border-none border text-red-400 cursor-pointer inline-flex w-[90px] justify-center bg-white px-4 py-2 text-sm font-medium  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
              onClick={() => {
                setDeleteModal(!deleteModal);
              }}
            >
              삭제하기
            </button>
          </div>
        )}
        <p className="my-5 w-full border-b border-b-[#ebebeb] px-6 pb-6">
          {quest?.content}
        </p>

        <div className="p-5">
          <button
            type="button"
            className={
              "text-white w-full h-[57px] bg-brandBlue font-bold rounded-lg text-lg px-5 py-2.5 shadow-[5px_5px_0_0_rgb(244,200,40)]"
            }
            onClick={onOfferHandler}
          >
            참가하기
          </button>
        </div>
      </div>
      {/* 댓글시작 */}
      {comments?.map((co: CommentGet) => (
        <PostsComment key={co.commentId} co={co} />
      ))}
      {/* 댓글 입력란 */}
      <div className="flex row mt-5  gap-2 p-2">
        <input
          className="bg-gray-50 border border-black text-gray-900 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 w-full h-14 p-2.5 mx-1"
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

      {deleteModal && (
        <DeletePostModal
          tgVal={deleteModal}
          tg={setDeleteModal}
          onDelete={onDeletepost}
        />
      )}
    </div>
  );
};
