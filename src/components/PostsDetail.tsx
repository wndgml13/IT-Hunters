import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { instance } from "../config/axios";
import { getCookieToken } from "../config/cookies";
import { IQuestDetail, CommentGet } from "../types/postsDetailType";

export const PostsDetail = () => {
  const userToken = getCookieToken();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const [comment, setComment] = useState("");

  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();
  // 댓글 조회 -- api파일로 옮겨야함!!
  const getComments = async () => {
    const { data } = await instance.get<CommentGet[]>(
      `api/quests/${id}/comments`,
      {
        headers: { authorization: userToken },
      },
    );
    return data;
  };

  const { data: comments } = useQuery<CommentGet[]>(["comments"], getComments);

  // 댓글 작성 -- api파일로 옮겨야함!!
  const addComment = async (comment: string) => {
    const { data } = await instance.post(
      `/api/quests/${id}/comments`,
      { content: comment },
      {
        headers: { authorization: userToken },
      },
    );
    return data;
  };
  const { mutate: addCom } = useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
    },
  });

  const onEnterComment = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log(comment);
      addCom(comment);
      setComment("");
    }
  };

  const onSubmitComment = () => {
    addCom(comment);
    setComment("");
  };
  // 댓글 수정 -- api 파일로 옮겨야함!!
  // const editComments = async () => {
  //   const { data } = await instance.put<CommentGet[]>(
  //     `api/quests/${id}/comments/${commentId}`,
  //     {
  //       headers: { authorization: userToken },
  //     },
  //   );

  //   return data;
  // };

  // const { mutate: editCom } = useMutation(editComments, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(["editcomments"]);
  //   },
  // });

  // 댓글 삭제 -- api 파일로 옮겨야함!!
  // const deletecomments = async () => {
  //   const { data } = await instance.delete(
  //     `/api/quests/${id}/comments/${commentId}`,
  //     {
  //       headers: { authorization: userToken },
  //     },
  //   );
  //   return data;
  // };

  // const { mutate: delcomment } = useMutation(deletecomments, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(["deletecomments"]);
  //   },
  // });

  const { mutate: delcomment } = useMutation(
    (commentId: number) =>
      instance.delete(`/api/quests/${id}/comments/${commentId}`, {
        headers: { authorization: userToken },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments"]); // "comments"는 33번째 줄 usequery 키값임. 키값을 동일하게 안적어주면 새로고침 해야 댓글이 삭제됨.
      },
    },
  );

  const onDeletecomment = (commentId: number) => {
    delcomment(commentId);
  };

  // 포스트관련 -- api파일로 옮겨야함!!
  const getDetailPosts = async () => {
    const { data } = await instance.get<IQuestDetail>(`api/quests/${id}`, {
      headers: { authorization: userToken },
    });
    return data;
  };

  const { data: quest } = useQuery<IQuestDetail, Error>(
    ["Postsdetail"],
    getDetailPosts,
  );
  // 게시글 삭제 -- api 파일로 옮겨야함!!
  const deleteposts = async () => {
    const { data } = await instance.delete(`/api/quests/${id}`, {
      headers: { authorization: userToken },
    });
    return data;
  };

  const { mutate: delpost } = useMutation(deleteposts, {
    onSuccess: () => {
      queryClient.invalidateQueries(["filterlist"]);
    },
  });

  const onDeletepost = () => {
    delpost();
    navigate("/search");
  };

  // console.log(quest);
  return (
    <div className="w-full p-4">
      <div className="flex flex-row-reverse">
        <button
          type="button"
          className="cursor-pointer bg-blue-200 hover:bg-blue-400  h-10 mt-5 rounded-lg border-none"
          onClick={onDeletepost}
        >
          게시글 삭제
        </button>
      </div>
      <div className="flex justify-start">
        <div className="m-5 overflow-hidden relative w-24 h-24 bg-gray-100 rounded-full dark:bg-gray-600"></div>
        <div className="grid justify-items-start mt-5 m-3">
          <p>닉네임: {quest?.nickname}</p>
        </div>
      </div>
      {/* 제목 입력 란 */}
      <h1 className="text-2xl text-center border border-b-black">
        {" "}
        {quest?.title}
      </h1>
      <p>구인스택</p>
      <div className="flex row">
        {quest?.stacks.map(st => (
          <p className="bg-green-300 mx-2">{st}</p>
        ))}
      </div>
      <p>프로젝트 예상 기간 {quest?.duration}주</p>

      <p>-모집인원-</p>
      <p>Backend {quest?.classes.backend}명</p>
      <p>Frontend {quest?.classes.frontend}명</p>
      <p>Designer {quest?.classes.designer}명</p>
      <p>Fullstack {quest?.classes.fullstack}명</p>

      <div className="h-80 p-4 bg-blue-100">
        <p>{quest?.content}</p>
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          className="cursor-pointer bg-blue-200 hover:bg-blue-400  h-10 mt-5 rounded-lg border-none"
        >
          수정하기
        </button>
        <button
          type="button"
          className=" cursor-pointer bg-blue-200 hover:bg-blue-400  h-10 rounded-lg border-none
             mt-5"
        >
          신청하기
        </button>
      </div>

      {/* 댓글시작 */}
      {comments?.map(data => (
        <div key={data.commentId} className="my-8 border-b-2">
          <span className="border border-black px-2 py-1">{data.nickname}</span>
          <span className="text"> {data.content}</span>
          <div className="ml-24 text-sm">
            <a
              type="button"
              className="cursor-pointer mr-1 text-blue-600/100"
              onClick={() => {
                setVisible(!visible);
              }}
            >
              Edit
            </a>
            |
            <a
              type="button"
              className="cursor-pointer ml-1 text-blue-600/100"
              onClick={() => onDeletecomment(data.commentId)}
            >
              Delete
            </a>
            {/* {visible && <EachComment />} */}
          </div>
        </div>
      ))}
      <div className="flex row mt-5 mb-20 ">
        <input
          className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full h-14 p-2.5 mx-1"
          value={comment}
          placeholder="댓글을 입력해주세요."
          onChange={e => setComment(e.target.value)}
          onKeyPress={onEnterComment}
        />

        <button
          type="button"
          className="cursor-pointer bg-cyan-300 hover:bg-cyan-400  w-20 h-14 rounded-lg border-none
     "
          onClick={onSubmitComment}
        >
          댓글달기
        </button>
      </div>
    </div>
  );
};
