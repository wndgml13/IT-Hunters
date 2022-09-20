import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
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
import { notificationApi } from "../../APIs/NotificationApi";

export const ChatRoomPage = () => {
  const textRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const usertoken = {
    Authorization: getCookieToken(),
  };
  const [chatdata, setChatData] = useRecoilState<chatData[]>(chatDataState);
  const { id } = useParams();
  const { data: getapprovedmember } = notificationApi.getApprovedQuestMember(8);
  console.log(getapprovedmember);
  const channelNum = id;
  const queryClient = useQueryClient();
  const baseURL = process.env.REACT_APP_API_BASEURL;

  const sock = new SockJs(`${baseURL}socket`);
  const client = Stomp.over(sock);
  const { data: chatolddata, isSuccess } = chatApi.getChatData(channelNum);
  const { data: userinfo } = UserInfoApi.getUserInfo();
  // client.debug = f => f;

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries(["chat", channelNum]);
      setChatData(chatolddata);
    }
  }, [isSuccess]);

  const messageBoxRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (chatdata) {
      chatConnect();
    }
    return () => {
      chatDisconnect();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  });

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

  const chatDisconnect = () => {
    client.disconnect(() => {
      client.unsubscribe("sub-0");
    }, usertoken);
  };

  // 채팅보내기
  const enterToSendChat = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log(textRef.current?.value);
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
      <div className="w-full absolute top-0 left-0 right-0 z-50 bg-white">
        <div className="flex justify-between px-6 py-4 border-b-2">
          <div className="flex">
            <button onClick={() => navigate(-1)} className="text-2xl mr-4">
              &lt;
            </button>
            <h1 className="text-2xl">IT monsters 팀방</h1>
          </div>
          <p className="text-3xl">...</p>
        </div>
      </div>
      {/* 채팅글들 */}
      <div>
        <div className="h-full w-full bottom-16 overflow-y-scroll scroll flex flex-col-reverse pt-14 pb-6">
          {chatdata?.map((cD, idx) =>
            cD.nickname !== userinfo.nickname ? (
              <div className="px-2 pt-4" key={idx}>
                <div className="flex">
                  <div className="w-[46px] h-[46px] bg-gray-300 rounded-full">
                    <img src={cD.profileImg} className="rounded-full" />
                  </div>
                  <div className="ml-4">
                    <h1>{cD.nickname}</h1>
                    <div className="flex">
                      <div className="bg-gray-300 px-4 py-1 rounded-lg max-w-[200px]">
                        <p className="break-all">{cD.content}</p>
                      </div>
                      {/* <p className="text-xs pt-4 pl-1">오후 10:00</p> */}
                      <p className="text-xs pt-4 pl-1">
                        {moment(cD.createdAt).format("LT")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="px-2 pt-4 float-right flex justify-end" key={idx}>
                <div className="flex">
                  <div className="mr-4">
                    <h1 className="text-right">{cD.nickname}</h1>
                    <div className="flex">
                      <p className="text-xs pt-4 pr-1">
                        {moment(cD.createdAt).format("LT")}
                      </p>
                      <div className="bg-gray-300 px-4 py-1 rounded-lg">
                        <p>{cD.content}</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-[46px] h-[46px] bg-gray-300 rounded-full">
                    <img src={cD.profileImg} className="rounded-full" />
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      </div>

      {/* 채팅입력창 */}
      <div className="w-full absolute bottom-0 left-0 right-0 z-50">
        <div className="flex bg-white pb-2">
          <button className="cursor-pointer  hover:bg-gray-400  bg-white w-20 h-12 text-2xl border-none">
            +
          </button>
          <input
            // value={chatInput}
            // onChange={InputHandler}
            ref={textRef}
            onKeyUp={enterToSendChat}
            placeholder="채팅을 입력해주세요!"
            className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full h-12 p-2.5"
          />
          <button
            onClick={sendChat}
            className="cursor-pointer hover:bg-gray-400  w-24 h-12 bg-white border-none"
          >
            전송하기
          </button>
        </div>
      </div>
    </div>
  );
};
