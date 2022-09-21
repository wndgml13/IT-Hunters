import { useEffect, useState } from "react";
import { instance } from "../config/axios";
import { getCookieToken } from "../config/cookies";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useInput } from "../hooks/useInput";
import { PostsAdd } from "../types/postsaddType";
import { useRecoilValue } from "recoil";
import { loginInfoState } from "../store/loginInfoState";
import { NoLoginError } from "../pages/ErrorPage/NoLoginError";
import { FeIcon } from "../assets/icons";

export const AddPosts = () => {
  const userToken = getCookieToken();
  const navigate = useNavigate();

  const [title, titleHandler] = useInput("");
  const [content, setContent] = useState("");
  const [stacks, setStacks] = useState<string[]>([]);
  const [duration, setDuration] = useState<number>(0);
  const [backend, setBackend] = useState<number>(0);
  const [frontend, setFrontend] = useState<number>(0);
  const [designer, setDesigner] = useState<number>(0);
  const [fullstack, setFullstack] = useState<number>(0);
  const [durationH, setDurationH] = useState<number>(0);

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

  const [FStoggle, setFStoggle] = useState(false);

  const frontStackData = [
    { stack: "React" },
    { stack: "Vue Js" },
    { stack: "Javascript" },
    { stack: "TypeScript" },
    { stack: "Next Js" },
    { stack: "Angular Js" },
  ];

  const contentHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onDurationHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (parseInt(e.target.value) > 0) {
      setDuration(parseInt(e.target.value));
      setDurationH(parseInt(e.target.value) * 5);
    }
  };

  const addStack = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const copy = [...stacks];
    copy.push(e.target.value);
    setStacks(copy);
  };

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

  // 등록하기 버튼
  const onSubmitHandler = async () => {
    if (content && title) {
      const responce = await mutateAsync(postInfo);
      alert("게시글 작성 완료!");
      navigate("/search");
      return;
    }
    if (!title) {
      return alert("제목을 입력해 주세요!!");
    }
    if (!content) {
      return alert("프로젝트 내용을 입력해 주세요!!");
    }
  };

  const stackStyle =
    "inline-flex p-2 w-full text-[14px] text-gray-300 w-full border border-gray-300 cursor-pointer peer-checked:text-blue-500 peer-checked:ring-blue-500 peer-checked:ring-1 peer-checked:border-transparent";

  if (!userToken) {
    return <NoLoginError />;
  }

  return (
    <div className="w-full h-full overflow-y-scroll pb-[3.5rem] px-6 ">
      <div className="flex mt-3">
        <button
          className="text-brandBlue text-2xl"
          onClick={() => navigate(-1)}
        >
          &lt;
        </button>
        <p className="ml-4 text-lg">파티 모집 글쓰기</p>
      </div>
      <h1 className="font-cookie my-6">좋은 파티를 구하길 바란다</h1>
      <div>
        <h2 className="mb-4">필요직업군</h2>
        <ul className="flex gap-x-[21px] overflow-x-scroll">
          <li className="w-[84px] h-[120px] border flex-col align-center justify-center border-black rounded-lg">
            <div className="flex justify-center py-6">
              <FeIcon />
            </div>
            <p className="text-center text-[12px]">프론트엔드</p>
            <div className="flex justify-center">
              <button
                className="text-center text-[16px]"
                onClick={() => {
                  if (frontend > 0) setFrontend(frontend - 1);
                }}
              >
                -
              </button>
              <p className="mx-2 text-[12px]">{frontend}</p>
              <button
                className="text-center text-[16px]"
                onClick={() => {
                  if (frontend < 20) setFrontend(frontend + 1);
                }}
              >
                +
              </button>
            </div>
          </li>
          <li className="w-[84px] h-[120px] border flex-col align-center justify-center border-black rounded-lg">
            <div className="flex justify-center py-6">
              <FeIcon />
            </div>
            <p className="text-center text-[12px]">프론트엔드</p>
            <div className="flex justify-center">
              <button
                className="text-center text-[16px]"
                onClick={() => {
                  if (frontend > 0) setFrontend(frontend - 1);
                }}
              >
                -
              </button>
              <p className="mx-2 text-[12px]">{frontend}</p>
              <button
                className="text-center text-[16px]"
                onClick={() => {
                  if (frontend < 20) setFrontend(frontend + 1);
                }}
              >
                +
              </button>
            </div>
          </li>
          <li className="w-[84px] h-[120px] border flex-col align-center justify-center border-black rounded-lg">
            <div className="flex justify-center py-6">
              <FeIcon />
            </div>
            <p className="text-center text-[12px]">프론트엔드</p>
            <div className="flex justify-center">
              <button
                className="text-center text-[16px]"
                onClick={() => {
                  if (frontend > 0) setFrontend(frontend - 1);
                }}
              >
                -
              </button>
              <p className="mx-2 text-[12px]">{frontend}</p>
              <button
                className="text-center text-[16px]"
                onClick={() => {
                  if (frontend < 20) setFrontend(frontend + 1);
                }}
              >
                +
              </button>
            </div>
          </li>
          <li className="w-[84px] h-[120px] border flex-col align-center justify-center border-black rounded-lg">
            <div className="flex justify-center py-6">
              <FeIcon />
            </div>
            <p className="text-center text-[12px]">프론트엔드</p>
            <div className="flex justify-center">
              <button
                className="text-center text-[16px]"
                onClick={() => {
                  if (frontend > 0) setFrontend(frontend - 1);
                }}
              >
                -
              </button>
              <p className="mx-2 text-[12px]">{frontend}</p>
              <button
                className="text-center text-[16px]"
                onClick={() => {
                  if (frontend < 20) setFrontend(frontend + 1);
                }}
              >
                +
              </button>
            </div>
          </li>
        </ul>
      </div>
      <div className="my-2 pt-1 space-y-6">
        <h1 className="text-[16px]">기간</h1>
        <div className={`w-full  px-2 text-[12px] rounded-lg`}>
          <p
            className={` inline-block px-2 py-1 rounded-lg translate-x-[-50%] bg-brandBlue text-white relative after:content-[''] after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-4 after:border-x-transparent after:border-b-transparent after:border-t-gray-700`}
            style={{ left: `${durationH}%` }}
          >
            {duration}일
          </p>
        </div>
        <input
          type="range"
          min="0"
          max="20"
          step="1"
          value={duration}
          name="duration"
          onChange={onDurationHandler}
          className="cursor-pointer w-full h-[3px] range-sm bg-brandBlue accent-brandBlue"
        />
      </div>
      <div className="my-8 pt-1 space-y-6">
        <h1>요구 스택</h1>
        <h2 className="text-[14px]" onClick={() => setFStoggle(!FStoggle)}>
          프론트엔드 &gt;
        </h2>

        {FStoggle ? (
          <ul className="grid gap-1 w-full grid-cols-3">
            {frontStackData?.map(fsd => (
              <li>
                <input
                  type="checkbox"
                  className="sr-only peer"
                  value={fsd.stack}
                  id={fsd.stack}
                  checked={stacks.includes(fsd.stack) ? true : false}
                  // onChange={e => onStacksHandler(e)}
                />
                <label className={stackStyle} htmlFor={fsd.stack}>
                  <p>{fsd.stack}</p>
                </label>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <div className="my-4">
        <p className="mb-4">글쓰기</p>
        <input
          className="w-full pl-2.5 py-2 border-b-[1px] outline-none focus:border-brandBlue"
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
          onChange={contentHandler}
        />
      </div>

      <div className="w-full absolute bottom-0 left-0 right-0 z-50">
        <button
          type="button"
          onClick={onSubmitHandler}
          className="text-white bg-brandBlue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium bottom-0 w-full h-[3rem] text-sm px-5 py-2.5 text-center"
        >
          필터적용
        </button>
      </div>
    </div>
  );
};
