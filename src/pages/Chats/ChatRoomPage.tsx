import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import classNames from "classnames";
import moment from "moment";
import "moment/locale/ko";
import SockJs from "sockjs-client";
import Stomp from "stompjs";
import { chatApi } from "../../APIs/ChatApi";
import { UserInfoApi } from "../../APIs/UserInfoApi";
import { getCookieToken } from "../../config/cookies";
import { chatDataState } from "../../store/chatDataState";
import { chatData } from "../../types/chatType";
import { useQueryClient } from "@tanstack/react-query";
import { ChatRoomMemList } from "./ChatRoomMemList";
const baseURL = process.env.REACT_APP_API_BASEURL;
const sock = new SockJs(`${baseURL}socket`);
const client = Stomp.over(sock);

export const ChatRoomPage = ({ mobile }: { mobile: string }) => {
  const textRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const usertoken = {
    Authorization: getCookieToken(),
  };
  const [chatdata, setChatData] = useRecoilState<chatData[]>(chatDataState);
  const { id } = useParams();
  const [chatInfosToggle, setChatInfosToggle] = useState(false);
  const channelNum = id;
  const queryClient = useQueryClient();

  const { data: thisChatRoom } = chatApi.getChatRoomInfo(Number(id));

  const { data: chatolddata, isSuccess } = chatApi.getChatData(channelNum);
  const { data: userinfo } = UserInfoApi.getUserInfo();
  client.debug = f => f;

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries(["chat", channelNum]);
      setChatData(chatolddata);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (chatdata) {
      chatConnect();
    }
    return () => {
      chatDisconnect();
    };
  }, []);

  // 새글 올라오면 항상밑에서부터
  const messageBoxRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  });
  // 채팅 연결
  const chatConnect = () => {
    client.connect(usertoken, () => {
      client.subscribe(
        `/sub/channels/${id}`,
        data => {
          const newMessage = JSON.parse(data.body);
          setChatData(chatdatas => [newMessage, ...chatdatas]);
        },
        usertoken,
      );
    });
  };
  // 채팅 연결해제
  const chatDisconnect = () => {
    client.disconnect(() => {
      client.unsubscribe("sub-0");
    }, usertoken);
  };

  // 채팅보내기
  const enterToSendChat = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendChat();
      if (e.target === textRef.current) {
        textRef.current.value = "";
      }
    }
  };

  const sendChat = () => {
    if (textRef.current === null || textRef.current.value === "") return;
    client.send(
      `/pub/channels/${id}`,
      usertoken,
      JSON.stringify({ content: textRef.current.value }),
    );
    queryClient.invalidateQueries(["chat", channelNum]);
    textRef.current.value = "";
  };

  return (
    <div
      className="p-4 h-full overflow-y-scroll pb-[3.5rem]"
      ref={messageBoxRef}
    >
      {/* 채팅방 헤더 */}
      <div
        className="w-full absolute top-0 left-0 right-0 z-40 rounded-b-lg bg-white"
        style={{ boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.05)" }}
      >
        <div className="flex justify-between px-6 py-3 ">
          <button onClick={() => navigate(-1)} className="mr-4 text-white">
            <svg
              width="10"
              height="20"
              viewBox="0 0 12 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.5606 2.48233C11.6962 2.35109 11.805 2.19282 11.8805 2.01698C11.9559 1.84113 11.9965 1.65131 11.9998 1.45883C12.0031 1.26634 11.969 1.07515 11.8995 0.896649C11.8301 0.718149 11.7267 0.555999 11.5956 0.419873C11.4645 0.283747 11.3083 0.176433 11.1364 0.104334C10.9645 0.0322347 10.7804 -0.00317301 10.595 0.000223098C10.4096 0.00361921 10.2268 0.0457495 10.0574 0.124101C9.88803 0.202452 9.73561 0.315419 9.60921 0.456263L0.404703 10.0132C0.276402 10.1463 0.174623 10.3044 0.105182 10.4784C0.0357416 10.6523 0 10.8388 0 11.0272C0 11.2155 0.0357416 11.402 0.105182 11.576C0.174623 11.7499 0.276402 11.908 0.404703 12.0411L9.60921 21.5981C9.86972 21.8591 10.2186 22.0034 10.5806 21.9999C10.9426 21.9965 11.2888 21.8456 11.5447 21.5796C11.8005 21.3137 11.9456 20.9541 11.9485 20.5782C11.9515 20.2024 11.8122 19.8403 11.5606 19.5701L3.33358 11.0262L11.5606 2.48233Z"
                fill="black"
              />
            </svg>
          </button>
          <h1 className="text-2xl truncate font-cookie py-1">
            {thisChatRoom?.channelName}
          </h1>

          <button onClick={() => setChatInfosToggle(!chatInfosToggle)}>
            <svg
              width="36"
              height="36"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.2222 9.07422C12.6699 9.07422 12.2222 9.52193 12.2222 10.0742C12.2222 10.6265 12.6699 11.0742 13.2222 11.0742V9.07422ZM27.3889 11.0742C27.9412 11.0742 28.3889 10.6265 28.3889 10.0742C28.3889 9.52193 27.9412 9.07422 27.3889 9.07422V11.0742ZM7.55554 9.07422C7.00326 9.07422 6.55554 9.52193 6.55554 10.0742C6.55554 10.6265 7.00326 11.0742 7.55554 11.0742V9.07422ZM8.97221 11.0742C9.52449 11.0742 9.97221 10.6265 9.97221 10.0742C9.97221 9.52193 9.52449 9.07422 8.97221 9.07422V11.0742ZM7.55554 16.1576C7.00326 16.1576 6.55554 16.6053 6.55554 17.1576C6.55554 17.7098 7.00326 18.1576 7.55554 18.1576V16.1576ZM8.97221 18.1576C9.52449 18.1576 9.97221 17.7098 9.97221 17.1576C9.97221 16.6053 9.52449 16.1576 8.97221 16.1576V18.1576ZM7.55554 23.2409C7.00326 23.2409 6.55554 23.6886 6.55554 24.2409C6.55554 24.7932 7.00326 25.2409 7.55554 25.2409V23.2409ZM8.97221 25.2409C9.52449 25.2409 9.97221 24.7932 9.97221 24.2409C9.97221 23.6886 9.52449 23.2409 8.97221 23.2409V25.2409ZM13.2222 16.1576C12.6699 16.1576 12.2222 16.6053 12.2222 17.1576C12.2222 17.7098 12.6699 18.1576 13.2222 18.1576V16.1576ZM27.3889 18.1576C27.9412 18.1576 28.3889 17.7098 28.3889 17.1576C28.3889 16.6053 27.9412 16.1576 27.3889 16.1576V18.1576ZM13.2222 23.2409C12.6699 23.2409 12.2222 23.6886 12.2222 24.2409C12.2222 24.7932 12.6699 25.2409 13.2222 25.2409V23.2409ZM27.3889 25.2409C27.9412 25.2409 28.3889 24.7932 28.3889 24.2409C28.3889 23.6886 27.9412 23.2409 27.3889 23.2409V25.2409ZM13.2222 11.0742H27.3889V9.07422H13.2222V11.0742ZM7.55554 11.0742H8.97221V9.07422H7.55554V11.0742ZM7.55554 18.1576H8.97221V16.1576H7.55554V18.1576ZM7.55554 25.2409H8.97221V23.2409H7.55554V25.2409ZM13.2222 18.1576H27.3889V16.1576H13.2222V18.1576ZM13.2222 25.2409H27.3889V23.2409H13.2222V25.2409Z"
                fill="black"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* 채팅글들 */}
      <div>
        <div className="h-full w-full bottom-16 overflow-y-scroll scroll flex flex-col-reverse pt-14 pb-6">
          {chatdata?.map((cD, idx) =>
            cD.memberId !== userinfo.id ? (
              <div className="pt-3" key={idx}>
                <div className="flex ">
                  <div
                    className="w-[32px] h-[32px] cursor-pointer"
                    onClick={() => {
                      navigate(`/user/${cD.memberId}`);
                    }}
                  >
                    <img
                      src={cD.profileImg}
                      className="w-full h-full rounded-full"
                    />
                  </div>
                  <div className="ml-4 ">
                    <p className="mb-1 text-sm font-semibold text-gray-800">
                      {cD.nickname}
                    </p>
                    <div className="flex ">
                      <div className="bg-[#4B23B819] px-4 py-2 rounded-lg rounded-tl-none max-w-[200px]">
                        <p className="break-all text-xs">{cD.content}</p>
                      </div>
                      <div className="ml-2 relative">
                        <p className="text-[10px] text-gray-700 w-12 absolute bottom-0">
                          {moment(cD.createdAt).format("LT")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="pt-3 flex justify-end" key={idx}>
                <div className="relative">
                  <p className="text-[10px] text-gray-700 w-12 absolute bottom-0 right-0">
                    {moment(cD.createdAt).format("LT")}
                  </p>
                </div>
                <div className="bg-brandBlue max-w-[200px] px-4 py-2 rounded-lg rounded-tr-none">
                  <p className="text-white text-xs">{cD.content}</p>
                </div>
              </div>
            ),
          )}
        </div>
      </div>

      {/* 채팅입력창 */}
      <div
        className={classNames("w-full absolute bottom-0 left-0 right-0 z-40", {
          "bottom-[20px]": mobile === "other",
        })}
      >
        <div className="flex bg-white my-2 mx-4 rounded-3xl border-[2px] focus-within:border-brandBlue">
          {/* <button className="cursor-pointer  hover:bg-gray-400  bg-white w-20 h-12 text-2xl border-none">
            +
          </button> */}
          <input
            // value={chatInput}
            // onChange={InputHandler}
            ref={textRef}
            onKeyUp={enterToSendChat}
            placeholder="채팅을 입력해주세요!"
            className="bg-white rounded-3xl text-gray-900 text-sm outline-none w-full h-12 px-3.5 py-2.5"
          />
          <button
            onClick={sendChat}
            className="rounded-full w-10 h-10 mr-1 my-1 px-3 py-1 bg-brandBlue "
          >
            <svg
              width="20"
              height="21"
              viewBox="0 0 24 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.9325 9.82509L3.8445 1.21509C3.39802 0.953927 2.85163 0.929114 2.38332 1.14874C1.915 1.36837 1.5847 1.80432 1.5 2.31459C1.50585 2.48413 1.54671 2.65061 1.62 2.80359L4.8735 10.6636C5.03679 11.1855 5.12566 11.7279 5.1375 12.2746C5.1257 12.8213 5.03683 13.3637 4.8735 13.8856L1.62 21.7456C1.54671 21.8986 1.50585 22.0651 1.5 22.2346C1.58531 22.7441 1.91554 23.1792 2.38335 23.3985C2.85117 23.6177 3.39684 23.5931 3.843 23.3326L20.9325 14.7226C21.8855 14.28 22.4951 13.3246 22.4951 12.2738C22.4951 11.2231 21.8855 10.2677 20.9325 9.82509V9.82509Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      {chatInfosToggle ? (
        <ChatRoomMemList
          roomInfo={thisChatRoom}
          tgVal={chatInfosToggle}
          tg={setChatInfosToggle}
        />
      ) : null}
    </div>
  );
};
