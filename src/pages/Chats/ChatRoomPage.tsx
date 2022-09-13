import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";

import { getCookieToken } from "../../config/cookies";

export const ChatRoomPage = () => {
  const client = useRef({});
  const navigate = useNavigate();
  const usertoken = getCookieToken();

  // useEffect(() => {
  //   chatConnect();
  // }, []);
  // const chatConnect = () => {
  //   const sockJS = new SockJS(`${process.env.REACT_APP_API_BASEURL}connect`);
  //   const stompClient: Stomp.Client = Stomp.over(sockJS);
  // };

  return (
    <div>
      {/* 채팅방 헤더 */}
      <div className="flex justify-between px-6 py-4 border-b-2">
        <div className="flex">
          <button onClick={() => navigate(-1)} className="text-2xl mr-4">
            &lt;
          </button>
          <h1 className="text-2xl">IT monsters 팀방</h1>
        </div>

        <p className="text-3xl">...</p>
      </div>
      {/* 채팅글들 */}
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <MyChat />
      {/* 채팅입력창 */}
      <div className="fixed bottom-0 w-full h-16 z-50 bg-white pt-2">
        <div className="flex">
          <button className="cursor-pointer  hover:bg-gray-400  bg-white w-20 h-12 text-2xl border-none">
            +
          </button>
          <input className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full h-12 p-2.5" />
          <button className="cursor-pointer hover:bg-gray-400  w-24 h-12 bg-white border-none">
            전송하기
          </button>
        </div>
      </div>
    </div>
  );
};

const Chat = () => {
  return (
    <div className="px-4 pt-4">
      <div className="flex">
        <div className="w-[46px] h-[46px] bg-gray-300 rounded-full"></div>
        <div className="ml-4">
          <h1>유저1</h1>
          <div className="flex">
            <div className="bg-gray-300 px-4 py-1 rounded-lg max-w-[200px]">
              <p className="break-all">안녕하세요 여러분 만나서 반갑습니다</p>
            </div>
            <p className="text-xs pt-4 pl-1">오후 10:00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const MyChat = () => {
  return (
    <div className="px-4 pt-4 float-right">
      <div className="flex">
        <div className="mr-4">
          <h1 className="text-right">me</h1>
          <div className="flex">
            <p className="text-xs pt-4 pr-1">오후 10:00</p>
            <div className="bg-gray-300 px-4 py-1 rounded-lg">
              <p>안녕하세요</p>
            </div>
          </div>
        </div>
        <div className="w-[46px] h-[46px] bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
};
