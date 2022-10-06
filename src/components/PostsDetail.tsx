import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { BookmarkApi } from "../APIs/BookmarkApi";
// import { BookmarkApi } from "../APIs/BookmarkApi";
import { CommentApi } from "../APIs/CommentApi";
import { PostsApi } from "../APIs/PostsApi";
import {
  BookmarkFill,
  BookmarkNoFill,
  DeIcon,
  Dot3,
  FeIcon,
  FuIcon,
  SendIcon,
} from "../assets/icons";
import { getCookieToken } from "../config/cookies";
import convertDateText from "../lib/convertDateText";
import { alertState, onAlertState } from "../store/alertState";
import { bookMarkState } from "../store/bookMarkState";
import { loginInfoState } from "../store/loginInfoState";
import { CommentGet } from "../types/postsDetailType";
import { PostsComment } from "./Comments/PostsComment";
import { YesOrNoModal } from "./Modals/YesOrNoModal";
import { OffersClassesModal } from "./OffersClassesModal";
import { PageHeader } from "./PageHeader";

export const PostsDetail = () => {
  const navigate = useNavigate();

  const [tgVal, tg] = useRecoilState(onAlertState); // 알러트 true/false
  const setAlertContent = useSetRecoilState(alertState); // 알러트 내용

  const [editDeleteToggle, setEditDeleteToggle] = useState(false); // 수정,삭제 점 3개 토글
  const [classes, setClasses] = useState({}); // 직군 아이콘

  const [deleteModal, setDeleteModal] = useState(false); // 게시글 삭제하기 모달창 띄우고 닫기
  const [offerClassModal, setOfferClassModal] = useState(false); // 직군 선택이 되지 않은 몬스터가 참가하기 버튼을 눌렀을 때 직군 선택 모달

  const queryClient = useQueryClient();
  const { id } = useParams();
  const [comment, setComment] = useState(""); // 댓글 작성
  const userinfo = useRecoilValue(loginInfoState); // 내 게시글 or 댓글에만 수정,삭제 버튼 보이게

  const myBookmark = useRecoilValue(bookMarkState);

  // 댓글, 답글 조회
  const { data: comments } = CommentApi.getComments(Number(id));

  // 댓글 작성
  const { mutateAsync: addComment } = CommentApi.addComment();

  const onSubmitComment = () => {
    if (comment) {
      const payload = { id: Number(id), comment: comment };
      addComment(payload).then(() => {
        queryClient.invalidateQueries(["comments"]);
        queryClient.invalidateQueries(["Postsdetail"]); // 댓글 작성 시 개수 실시간 카운팅
      });
      setComment("");
    } else {
      setAlertContent("내용을 입력해주세요!");
      tg(!tgVal);
    }
  };

  // const onSubmitCommentUseMemo = useMemo(() => {
  //   return onSubmitComment;
  // }, []);

  const onInputComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
    if (e.target.value.length > 254) {
      setAlertContent("최대 255자까지 입력 가능합니다.");
      tg(!tgVal);
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

  // 게시글 북마크 POST
  const { mutateAsync: bookMarkpost } = BookmarkApi.bookMarkpost();

  const onBookmarkQuest = () => {
    bookMarkpost(Number(id)).then(() => {
      queryClient.invalidateQueries(["bookmarks"]);
    });
  };

  const bookmarked = myBookmark.filter(f => {
    if (f.questId === quest?.questId) return true;
  });

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

  // 작업 기간, 요구 스택, 상세 정보 탭
  const durationTab = useRef<HTMLDivElement>(null);
  const stacksTab = useRef<HTMLDivElement>(null);
  const contentTab = useRef<HTMLDivElement>(null);

  return (
    <div className=" w-full h-full overflow-y-scroll pb-[3.5rem] bg-[#f5f5f5]">
      <div className="relative flex justify-between ml-6">
        <PageHeader pgTitle={"게시판"} />
        {quest?.nickname === userinfo?.nickname ? (
          <button
            className="cursor-pointer mr-6"
            onClick={() => {
              setEditDeleteToggle(!editDeleteToggle);
            }}
          >
            <Dot3 />
          </button>
        ) : null}
        {editDeleteToggle && (
          <div className="absolute right-6 top-12 flex-col grid justify-items-end drop-shadow-lg">
            <button
              className="border-none text-brandBlue cursor-pointer inline-flex w-[90px] justify-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-100"
              onClick={onEditPosts}
            >
              수정하기
            </button>
            <button
              className=" border-none border text-red-400 cursor-pointer inline-flex w-[90px] justify-center bg-white px-4 py-2 text-sm font-medium  hover:bg-gray-100"
              onClick={() => {
                setDeleteModal(!deleteModal);
                setEditDeleteToggle(!editDeleteToggle);
              }}
            >
              삭제하기
            </button>
          </div>
        )}
      </div>

      <div className="flex mx-6 mt-[28px] mb-[18px]">
        <div className="w-[59px] h-[59px] rounded-full">
          <img
            className="cursor-pointer w-full h-full border rounded-full"
            src={quest?.profileImg}
            onClick={() => {
              navigate(`/user/${quest?.memberId}`);
            }}
          />
        </div>
        <div className="text-[14px] ml-3 mt-5 h-full hover:outline-none hover:border-b-2 border-black">
          <button
            onClick={() => {
              navigate(`/user/${quest?.memberId}`);
            }}
          >
            {quest?.nickname}
          </button>
        </div>
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
        <ul className="grid gap-2 w-full grid-cols-2 mt-6 px-5">
          <li className="grid gap-2 grid-cols-2">
            <p>프론트엔드</p>{" "}
            <p>
              : <span className="font-bold">{quest?.classes.frontend}</span> 명
            </p>
          </li>
          <li className="grid gap-2 grid-cols-2">
            <p>백엔드 </p>{" "}
            <p>
              : <span className="font-bold">{quest?.classes.frontend}</span> 명
            </p>
          </li>
          <li className="grid gap-2 grid-cols-2">
            <p>디자이너 </p>{" "}
            <p>
              : <span className="font-bold">{quest?.classes.frontend}</span> 명
            </p>
          </li>
          <li className="grid gap-2 grid-cols-2">
            <p>풀스택 </p>{" "}
            <p>
              : <span className="font-bold">{quest?.classes.frontend}</span> 명
            </p>
          </li>
        </ul>
      </div>
      <div className=" bg-white w-full mt-3 pt-7" ref={contentTab}>
        <div className="flex justify-between">
          <p className="px-6">상세 정보</p>
          {getCookieToken() ? (
            <div className="mr-8">
              {bookmarked.length > 0 ? (
                <>
                  <button onClick={onBookmarkQuest}>
                    <BookmarkFill />
                  </button>
                </>
              ) : (
                <button onClick={onBookmarkQuest}>
                  <BookmarkNoFill />
                </button>
              )}
            </div>
          ) : null}
        </div>
        <div className="flex justify-between">
          <p className="text-xl font-normal font-cookie px-6 mt-[10px] break-all">
            {quest?.title}
          </p>
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

        <div className="my-2 w-full border-b px-6 pb-6">
          <div className="whitespace-pre-line break-all">{quest?.content}</div>
        </div>

        {quest?.offeredMember.includes(userinfo.id) ||
        quest?.memberId === userinfo.id ? null : (
          <div className="p-5">
            <button
              type="button"
              className="text-white w-full h-[57px] bg-brandBlue font-bold rounded-lg text-lg px-5 py-2.5 shadow-[5px_5px_0_0_rgb(244,200,40)]"
              onClick={() => {
                setOfferClassModal(!offerClassModal);
              }}
            >
              참가하기
            </button>
          </div>
        )}
      </div>
      {/* 댓글시작 */}
      <div className="mt-3">
        <div className="p-5 bg-white text-gray-800">
          댓글 {quest?.commentCnt}개
        </div>
        {comments?.map((co: CommentGet) => (
          <PostsComment key={co.commentId} co={co} />
        ))}
      </div>

      {/* 댓글 입력란 */}
      {getCookieToken() ? (
        <div className="flex flex-row gap-2 px-4">
          <div className="mt-5 w-16 h-14">
            <img
              className="w-full h-full border rounded-full"
              src={userinfo.profileImage}
            />
          </div>
          <div className="flex mt-5 mb-[30px] bg-white  rounded-2xl border focus:border-brandBlue w-full h-14 mx-1">
            <input
              className="rounded-2xl px-2.5 w-full"
              value={comment}
              placeholder="댓글을 입력해주세요."
              onChange={onInputComment}
              onKeyPress={onEnterComment}
              maxLength={255}
            />
            <button
              onClick={onSubmitComment}
              className="rounded-full w-10 h-10 mr-1 px-3 my-2 bg-brandBlue"
            >
              <SendIcon />
            </button>
          </div>
        </div>
      ) : null}

      {deleteModal && (
        <YesOrNoModal
          tgVal={deleteModal}
          tg={setDeleteModal}
          onAction={onDeletepost}
          modalTitle={"정말 삭제하겠는가 ?"}
        />
      )}

      {offerClassModal && (
        <OffersClassesModal
          cmTg={offerClassModal}
          setCmTg={setOfferClassModal}
          questId={quest?.questId}
        />
      )}
    </div>
  );
};
