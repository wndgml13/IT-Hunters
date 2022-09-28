import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UserInfoApi } from "../../APIs/UserInfoApi";

import { useModal } from "../../hooks/useModal";
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

  const node = useRef<null | HTMLDivElement>(null);

  const { data: userinfo } = UserInfoApi.getUserInfo();

  useModal({ node, tgVal, tg });

  return (
    <div className="h-full w-full absolute top-0 right-0 left-0 z-50 flex justify-center items-center bg-[#c2c2c2] bg-opacity-50">
      <div
        className="bg-bgGray2 w-[60%] h-full absolute z-50 right-0 top-0 shadow-inner"
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
            <div
              className="flex py-3 border-b"
              key={idx}
              onClick={() => navigate(`/user/${sqm.memberId}`)}
            >
              <div className="w-[40px] h-[40px]">
                <img src={sqm.profileImg} className="rounded-2xl" />
              </div>
              <h1 className="ml-2 my-2">
                {sqm.memberId === userinfo.id ? (
                  <span className="text-xs mx-1">나</span>
                ) : null}
                {sqm.nickname}
              </h1>
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 w-full p-3 bg-white">
          {" "}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.6011 11.9067L8.27091 11.9067"
              stroke="#4B23B8"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M16.7538 17.9658L22.813 11.9067L16.7538 5.84749"
              stroke="#4B23B8"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M1 22.813L0.999998 0.999999"
              stroke="#4B23B8"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
