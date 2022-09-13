import { useNavigate } from "react-router-dom";

export const ChatListPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* 채팅탭 헤더 */}
      <div className="flex justify-between p-8 border-b-2">
        <h1 className="text-3xl">채팅</h1>
        <p className="text-3xl">+</p>
      </div>
      {/* 채팅리스트들 */}
      <div>
        <div
          className="border-b-2 w-full h-24 px-6 py-4 flex hover:bg-gray-100"
          onClick={() => navigate("/chats/1")}
        >
          <div className="w-[60px] h-[60px] bg-gray-300 rounded-full"></div>
          <div className="px-4">
            <div className="flex">
              <h1>베니</h1>
              <p className="pl-2 text-gray-400">디자이너</p>
            </div>
            <h1 className="pt-2">가장최근메세지</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
