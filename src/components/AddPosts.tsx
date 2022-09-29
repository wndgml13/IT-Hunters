import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInput } from "../hooks/useInput";
import { DurationRange } from "./DurationRange";
import { StackListDropdwon } from "./StackListDropdown";
import { PostsApi } from "../APIs/PostsApi";
import { NumMemberGet } from "./NumMemberGet";
import { useQueryClient } from "@tanstack/react-query";
import { PageHeader } from "./PageHeader";

export const AddPosts = () => {
  const navigate = useNavigate();

  const [title, titleHandler] = useInput("");
  const [content, setContent] = useState("");
  const [stacks, setStacks] = useState<string[]>([]);
  const [duration, setDuration] = useState<number>(0);
  const [backend, setBackend] = useState<number>(0);
  const [frontend, setFrontend] = useState<number>(0);
  const [designer, setDesigner] = useState<number>(0);
  const [fullstack, setFullstack] = useState<number>(0);

  const postInfo = {
    title,
    content,
    duration,
    stacks,
    backend,
    frontend,
    designer,
    fullstack,
  };

  const queryClient = useQueryClient();
  const { mutateAsync: submitPost } = PostsApi.submitPost();

  // 등록하기 버튼 catch error 해야함
  const onSubmitHandler = async () => {
    if (content && title && backend + frontend + designer + fullstack > 0) {
      submitPost(postInfo).then(() => {
        queryClient.invalidateQueries(["Postsdetail"]);
        queryClient.invalidateQueries(["filterlist"]);
      });
      alert("게시글 작성 완료!");
      navigate("/search");
      return;
    }
    if (!title) {
      return alert("제목을 입력해 주세요!!");
    } else if (!content) {
      return alert("프로젝트 내용을 입력해 주세요!!");
    } else if (backend + frontend + designer + fullstack === 0) {
      return alert("프로젝트에 필요한 직군을 선택해주세요!");
    }
  };

  return (
    <div className="w-full h-full overflow-y-scroll pb-[3.5rem] px-6 ">
      <PageHeader pgTitle={"파티 모집 글쓰기"} />
      <h1 className="font-cookie my-6">
        좋은 <span className="text-brandBlue font-cookie">파티</span>를 구하길
        바란다
      </h1>
      <div>
        <h2 className="mb-4">
          필요직업군 <span className="text-red-500">*</span>
        </h2>
        <ul className="flex justify-between ">
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
        <textarea
          id="message"
          rows={15}
          className="block p-2.5 mt-6 w-full text-sm text-gray-900 bg-gray-100 rounded-lg focus:ring-blue-500 focus:border-blue-500 "
          placeholder="프로젝트 내용을 입력해주세요."
          style={{ resize: "none" }}
          value={content}
          onChange={e => setContent(e.target.value)}
        />
      </div>

      <div className="w-full absolute bottom-0 left-0 right-0 z-50">
        <button
          type="button"
          onClick={onSubmitHandler}
          className="text-white bg-brandBlue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium bottom-0 w-full h-[3rem] text-sm px-5 py-2.5 text-center"
        >
          등록하기
        </button>
      </div>
    </div>
  );
};
