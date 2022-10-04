import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useInput } from "../hooks/useInput";
import { DurationRange } from "./DurationRange";
import { StackListDropdwon } from "./StackListDropdown";
import { PostsApi } from "../APIs/PostsApi";
import { NumMemberGet } from "./NumMemberGet";
import { useQueryClient } from "@tanstack/react-query";
import { PageHeader } from "./PageHeader";
import { useRecoilState, useSetRecoilState } from "recoil";
import { alertState, onAlertState } from "../store/alertState";

export const EditPosts = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data: editInfo, isSuccess } = PostsApi.getDetailPosts(Number(id)); // 게시글 조회 get
  const [title, titleHandler, setTitle] = useInput("");
  const [content, setContent] = useState("");
  const [stacks, setStacks] = useState<string[]>([]);
  const [duration, setDuration] = useState<number>(0);
  const [backend, setBackend] = useState<number>(0);
  const [frontend, setFrontend] = useState<number>(0);
  const [designer, setDesigner] = useState<number>(0);
  const [fullstack, setFullstack] = useState<number>(0);
  const [count, setCount] = useState<number>(0); // 프로젝트 내용 글자수 세기

  const [tgVal, tg] = useRecoilState(onAlertState); // 알러트 true/false
  const setAlertContent = useSetRecoilState(alertState); // 알러트 내용

  useEffect(() => {
    if (isSuccess) {
      setStacks(editInfo.stacks);
      setTitle(editInfo.title);
      setContent(editInfo.content);
      setDuration(editInfo.duration);
      setBackend(editInfo.classes.backend);
      setFrontend(editInfo.classes.frontend);
      setDesigner(editInfo.classes.designer);
      setFullstack(editInfo.classes.fullstack);
      setCount(editInfo.content.length);
    }
  }, [isSuccess]);

  // 게시글 수정
  const { mutateAsync: editPosts } = PostsApi.editPosts();

  const onEditPostsHandler = () => {
    if (content && title && backend + frontend + designer + fullstack > 0) {
      try {
        const payload = {
          id: Number(id),
          title,
          content,
          frontend,
          backend,
          designer,
          fullstack,
          duration,
          stacks,
        };
        editPosts(payload).then(() => {
          queryClient.invalidateQueries(["Postsdetail"]);
          queryClient.invalidateQueries(["filterlist"]);
        });
        tg(!tgVal);
        setAlertContent("게시글 수정 완료!");
        navigate("/search");
      } catch (error) {
        setAlertContent("게시글 수정에 실패하셨습니다.");
        tg(!tgVal);
        console.log(error);
      }
    }
    if (!title) {
      setAlertContent("제목을 입력해주세요!");
      tg(!tgVal);
    } else if (!content) {
      setAlertContent("프로젝트 내용을 입력해 주세요!!");
      tg(!tgVal);
    } else if (backend + frontend + designer + fullstack === 0) {
      setAlertContent("프로젝트에 필요한 직군을 선택해주세요!");
      tg(!tgVal);
    }
  };

  const onInputHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value.slice(0, 999));
    setCount(e.target.value.length);
    if (e.target.value.length > 999) {
      tg(!tgVal);
      setAlertContent("최대 1000자까지 입력 가능합니다.");
    }
  };

  return (
    <div className="w-full h-full overflow-y-scroll pb-[3.5rem] px-6 ">
      <PageHeader pgTitle={"파티 모집 글수정"} />
      <h1 className="font-cookie my-6">좋은 파티를 구하길 바란다</h1>
      <div>
        <h2 className="mb-4">
          필요직업군 <span className="text-red-500">*</span>
        </h2>
        <ul className="flex justify-between">
          <NumMemberGet
            num={frontend}
            setNum={setFrontend}
            title={"프론트엔드"}
          />
          <NumMemberGet num={backend} setNum={setBackend} title={"백엔드"} />
          <NumMemberGet
            num={designer}
            setNum={setDesigner}
            title={"디자이너"}
          />
          <NumMemberGet
            num={fullstack}
            setNum={setFullstack}
            title={"풀스택"}
          />
        </ul>
      </div>

      <DurationRange duration={duration} setDuration={setDuration} />

      <StackListDropdwon stacks={stacks} setStacks={setStacks} />

      <div className="my-4">
        <p className="mb-4">
          글쓰기 <span className="text-red-500">*</span>
        </p>
        <input
          className="w-full pl-2.5 py-2 border-b-[2px] outline-none focus:border-brandBlue"
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={titleHandler}
        />
        <div className="mt-7 flex justify-between text-sm">
          <p>
            내용 <span className="text-red-500">*</span>
          </p>
          <p>{count}자/1000자</p>
        </div>
        <textarea
          id="message"
          rows={15}
          className="block p-2.5 mt-3 w-full text-sm text-gray-900 bg-gray-100 rounded-lg focus:ring-blue-500 focus:border-blue-500 "
          placeholder="프로젝트 내용을 입력해주세요."
          style={{ resize: "none" }}
          value={content}
          onChange={onInputHandler}
        />
      </div>

      <div className="mb-6 w-full shadow-[5px_5px_0_0_rgb(244,200,40)]">
        <button
          type="button"
          onClick={onEditPostsHandler}
          className="text-white bg-brandBlue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium bottom-0 w-full h-[3rem] text-sm px-5 py-2.5 text-center"
        >
          수정하기
        </button>
      </div>
    </div>
  );
};
