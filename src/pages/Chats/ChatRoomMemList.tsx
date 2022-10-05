import { useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { chatApi } from "../../APIs/ChatApi";
import { ChatExitIcon } from "../../assets/icons";
import { YesOrNoModal } from "../../components/Modals/YesOrNoModal";

import { useModal } from "../../hooks/useModal";
import { loginInfoState } from "../../store/loginInfoState";
import { chatRoominfo } from "../../types/chatType";

export const ChatRoomMemList = ({
  roomInfo,
  tgVal,
  tg,
}: {
  roomInfo: chatRoominfo;
  tgVal: boolean;
  tg: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutateAsync: exitChatroom } = chatApi.exitChatRoom();
  const { mutateAsync: kickOutMember } = chatApi.kickOutMember();

  const [getOutTg, setGetOutTg] = useState(false);

  const onExitChatroom = () => {
    exitChatroom(roomInfo.channelId).then(() => {
      queryClient.invalidateQueries(["chatlist"]);
      alert("스쿼드를 나갑니다");
      navigate("/chats");
    });
  };

  const onKickoutMember = (memberId: number) => {
    const channelId = roomInfo.channelId;
    kickOutMember({ channelId, memberId }).then(() => {
      queryClient.invalidateQueries(["chatinfo"]);
      alert("강퇴");
    });
  };

  const node = useRef<null | HTMLDivElement>(null);

  const { id: userid } = useRecoilValue(loginInfoState);

  useModal({ node, tgVal, tg });

  return (
    <div
      className={`${
        tgVal
          ? "h-full w-full absolute top-0 right-0 left-0 z-40 flex justify-center items-center bg-[#c2c2c2] bg-opacity-50"
          : null
      }`}
    >
      <div
        className={`bg-bgGray2 w-[60%] h-full absolute z-50 right-0 top-0 shadow-inner ${
          tgVal ? "translate-x-0" : "translate-x-full"
        } ease-in-out duration-300`}
        ref={node}
      >
        <div className="my-8 mx-3 p-4 relative rounded-lg bg-white shadow-md">
          <h1 className="text-xl font-bold">{roomInfo.channelName}</h1>
          <p className="text-xs">{roomInfo.squadMembers.length}명 참여</p>
          {/* <p className="absolute top-2 right-3">X</p> */}
        </div>

        <div className="mx-3 bg-white px-4 py-4 rounded-lg shadow-md overflow-y-scroll">
          <h3 className="mb-2">대화 상대</h3>
          {roomInfo.squadMembers.map((sqm, idx) => (
            <div className="flex py-3 border-b relative" key={idx}>
              <div
                className="w-[40px] h-[40px] cursor-pointer"
                onClick={() => navigate(`/user/${sqm.memberId}`)}
              >
                <img
                  src={sqm.profileImg}
                  className="w-full h-full rounded-2xl"
                />
              </div>
              <h1 className="ml-2 my-2">
                {sqm.memberId === userid ? (
                  <span className="text-xs mx-1">나</span>
                ) : null}
                {sqm.nickname}{" "}
                {sqm.memberId === roomInfo.leaderId ? (
                  <span className="text-xs mx-3 absolute right-0 text-center py-1 rounded-lg">
                    팀장
                  </span>
                ) : null}
                {roomInfo.leaderId === userid ? (
                  sqm.memberId !== roomInfo.leaderId ? (
                    <button
                      onClick={() => {
                        onKickoutMember(sqm.memberId);
                      }}
                      className="absolute mx-3 right-0 text-xs"
                    >
                      강퇴
                    </button>
                  ) : null
                ) : null}
              </h1>
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 w-full p-3 bg-white">
          {" "}
          <button
            onClick={() => {
              setGetOutTg(!getOutTg);
            }}
          >
            <ChatExitIcon />
          </button>
        </div>
      </div>
      {getOutTg && (
        <YesOrNoModal
          tgVal={getOutTg}
          tg={setGetOutTg}
          onAction={onExitChatroom}
          modalTitle={"정말 나가시겠습니까?"}
        />
      )}
    </div>
  );
};
