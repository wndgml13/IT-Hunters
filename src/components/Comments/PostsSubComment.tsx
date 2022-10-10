import { useEffect, useState } from "react";
import { SubCommentGet } from "../../types/postsDetailType";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { subCommentApi } from "../../APIs/subCommentApi";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { loginInfoState } from "../../store/loginInfoState";
import convertDateText from "../../lib/convertDateText";
import { alertState, onAlertState } from "../../store/alertState";

export const PostsSubComment = ({
  sc,
  coId,
}: {
  sc: SubCommentGet;
  coId: number;
}) => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const userinfo = useRecoilValue(loginInfoState);
  const navigate = useNavigate();

  const [tgVal, tg] = useRecoilState(onAlertState); // 알러트 true/false
  const setAlertContent = useSetRecoilState(alertState); // 알러트 내용

  const [editSubcomment, setEditsubComment] = useState(""); // 답글 수정
  const [editSubCommentToggle, setEditSubCommentToggle] = useState(false); // 답글 수정 토글

  //답글 수정
  const { mutateAsync: modifiedSubComment } =
    subCommentApi.modifiedSubComment();

  const onEditsubComment = () => {
    if (editSubcomment) {
      const payload = {
        id: Number(id),
        commentId: coId,
        subCommentId: sc.subCommentId,
        editSubComment: editSubcomment,
      };
      modifiedSubComment(payload).then(() => {
        queryClient.invalidateQueries(["comments"]);
      });
      setEditsubComment("");
    } else if (!editSubcomment) {
      setAlertContent("내용을 입력해주세요!");
      tg(!tgVal);
    }
  };

  const onInputEditSubComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditsubComment(e.target.value);
    if (e.target.value.length > 254) {
      setAlertContent("최대 255자까지 입력 가능합니다.");
      tg(!tgVal);
    }
  };

  const onEntereditSubComment = async (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter" && editSubcomment) {
      onEditsubComment();
      setEditsubComment("");
      setEditSubCommentToggle(!editSubCommentToggle); // 47번줄 editSubcomment 값이 있을 때만 인풋이 사라짐
    } else if (!editSubcomment) {
      setAlertContent("내용을 입력해주세요!");
      tg(!tgVal);
    }
  };

  useEffect(() => {
    setEditsubComment(sc.content);
  }, [editSubCommentToggle]); // 수정 토글이 열릴 때마다 기존 답글 내용이 보임

  // 답글 삭제
  const { mutateAsync: deleteSubComment } = subCommentApi.deleteSubComment();

  const onDeletesubComment = () => {
    const payload = {
      id: Number(id),
      commentId: coId,
      subCommentId: sc.subCommentId,
    };
    deleteSubComment(payload).then(() => {
      queryClient.invalidateQueries(["comments"]);
    });
  };

  return (
    <>
      {/* 답글 추가 */}
      <>
        <div key={sc.subCommentId} className="mx-10 my-2">
          <div className="flex flex-row gap-2">
            <img
              className="cursor-pointer w-10 h-10 border rounded-full"
              src={sc?.profileImage}
              onClick={() => {
                navigate(`/user/${sc.memberId}`);
              }}
            />
            <div className="mt-2 h-full hover:outline-none hover:border-b-2 border-black">
              <button
                onClick={() => {
                  navigate(`/user/${sc.memberId}`);
                }}
              >
                {sc.nickname}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-3 ml-2">
              {sc?.createdAt && convertDateText(sc?.createdAt)}
            </p>
          </div>
          <p className="p-2 rounded-xl text-sm text-black mt-2 break-all">
            {editSubCommentToggle ? !sc.content : sc.content}
          </p>
          {/* 답글 수정 폼 */}
          {editSubCommentToggle && (
            <div className="gap-1">
              <input
                id="message"
                className="bg-gray-50 border border-gary text-gray-900 text-sm rounded-3xl w-full h-14 my-1 p-2.5 focus:outline-none"
                placeholder="답글 수정"
                value={editSubcomment}
                onChange={onInputEditSubComment}
                onKeyPress={onEntereditSubComment}
                maxLength={255}
              />
              <div className="my-3 flex flex-row-reverse gap-2">
                <button
                  type="button"
                  className="text-white w-12 h-10 bg-[#F4C828] font-bold rounded-lg focus:outline-none"
                  onClick={() => {
                    onEditsubComment();
                    editSubcomment &&
                      setEditSubCommentToggle(!editSubCommentToggle);
                  }}
                >
                  수정
                </button>
                <button
                  type="button"
                  className="text-white w-12 h-10 bg-[#4B23B8] font-bold rounded-lg focus:outline-none"
                  onClick={() => {
                    setEditSubCommentToggle(!editSubCommentToggle);
                  }}
                >
                  닫기
                </button>
              </div>
            </div>
          )}
          {/* 답글 수정 버튼 */}
          {sc?.nickname === userinfo.nickname ? (
            <div className="text-sm">
              <button
                className="text-sm text-gray-400/100 hover:text-brandBlue"
                onClick={() => {
                  setEditSubCommentToggle(!editSubCommentToggle);
                }}
              >
                수정
              </button>
              <button
                className="text-sm text-gray-400/100 hover:text-red-400 ml-3"
                onClick={onDeletesubComment}
              >
                삭제
              </button>
            </div>
          ) : null}
        </div>
      </>
      {/* <PostsComment setEditSubCommentToggle={setEditSubCommentToggle} /> */}
    </>
  );
};
