import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { instance } from "../../config/axios";
import { getCookieToken } from "../../config/cookies";

export const ChatListPage = () => {
  const navigate = useNavigate();

  const userToken = getCookieToken();

  interface chatlist {
    id: number;
    channelName: string;
  }

  interface chatData {
    channelId: number;
    content: string;
    createdAt: string;
    memberId: number;
    nickname: string;
    profileImg: string;
  }

  const getChatlist = async () => {
    const { data } = await instance.get<chatlist[]>(`/api/channels/`, {
      headers: { authorization: userToken },
    });
    return data;
  };

  const { data: chat } = useQuery<chatlist[]>(["chatlist"], getChatlist);

  const getChat = async () => {
    const { data } = await instance.get<chatData[]>(`/api/channels/3`, {
      headers: { authorization: userToken },
    });
    return data;
  };

  const { data: achat } = useQuery<chatData[]>(["chat"], getChat);

  console.log(achat);

  return (
    <div>
      {/* 채팅탭 헤더 */}
      <div className="flex justify-between p-8 border-b-2">
        <h1 className="text-3xl">채팅</h1>
        <p className="text-3xl">+</p>
      </div>
      {/* 채팅리스트들 */}
      <div>
        {chat?.map(chat => (
          <div
            className="border-b-2 w-full h-24 px-6 py-4 flex hover:bg-gray-100"
            onClick={() => navigate("/chats/1")}
            key={chat.id}
          >
            <div className="w-[60px] h-[60px] bg-gray-300 rounded-full"></div>
            <div className="px-4">
              <div className="flex">
                <h1>{chat.channelName}</h1>
              </div>
              <h1 className="pt-2">가장최근메세지</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
