import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SockJs from "sockjs-client";
import Stomp from "stompjs";
import { chatApi } from "../../APIs/ChatApi";
import { getCookieToken } from "../../config/cookies";

export const ChatRoomPage = () => {
  const [chatInput, setChatInput] = useState("");
  const navigate = useNavigate();
  const usertoken = {
    Authorization: getCookieToken(),
  };

  const baseURL = process.env.REACT_APP_API_BASEURL;

  const sock = new SockJs(`${baseURL}socket`);
  const client = Stomp.over(sock);
  const { data: chatdata } = chatApi.getChatData();

  console.log(chatdata);

  useEffect(() => {
    try {
      client.connect(usertoken, () => {
        client.subscribe(
          `${baseURL}sub/channels/3`,
          data => {
            console.log(data);
            // const newMessage = JSON.parse(data.body);
            // console.log("newMessage");
          },
          usertoken,
        );
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const sendChat = () => {
    if (chatInput === "") return;
    client.send(
      `/pub/channels/3`,
      usertoken,
      JSON.stringify({ content: chatInput }),
    );
    setChatInput("");
  };

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
      <div className="h-full w-full bottom-16 overflow-y-scroll scroll flex flex-col-reverse">
        {chatdata?.map(cD => (
          <div className="px-4 pt-4" key={cD.createdAt}>
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
                  <p className="text-xs pt-4 pl-1">{cD.createdAt}</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        <MyChat />
      </div>

      {/* 채팅입력창 */}
      <div className="w-full absolute bottom-0 left-0 right-0 z-50">
        <div className="flex bg-white pb-2">
          <button className="cursor-pointer  hover:bg-gray-400  bg-white w-20 h-12 text-2xl border-none">
            +
          </button>
          <input
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
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

const MyChat = () => {
  return (
    <div className="px-4 pt-4 float-right flex justify-end">
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
