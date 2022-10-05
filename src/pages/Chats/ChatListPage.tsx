import { useNavigate } from "react-router-dom";
import { chatApi } from "../../APIs/ChatApi";
import { MessageIcon } from "../../assets/icons";

export const ChatListPage = () => {
  const navigate = useNavigate();

  const { data: chat } = chatApi.getChatRoomlist();

  return (
    <div className="w-full  min-h-screen pb-[4rem] overflow-x-hidden">
      {/* 채팅탭 헤더 */}
      <div className="flex py-4 px-6 absolute top-0 left-0 right-0 z-50 bg-white border-b-2">
        <h1 className="mr-2 text-2xl font-cookie">채팅</h1> <MessageIcon />
      </div>
      {/* 채팅리스트들 */}
      <div className="pt-16">
        {chat?.map(chat => (
          <div
            className="border-b w-full h-24 px-6 py-4 flex hover:bg-gray-100"
            onClick={() => navigate(`/chats/${chat.id}`)}
            key={chat.id}
          >
            <img src={chat.imgUrl} className="w-[60px] h-[60px] rounded-full" />

            <div className="px-4 w-[75%]">
              <div className="flex-col">
                <p className="truncate font-semibold text-sm">
                  {chat.channelName}
                </p>
                <p className="pt-2 text-sm text-[#c2c2c2] truncate">
                  {chat.lastMessage}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
