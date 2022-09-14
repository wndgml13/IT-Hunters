import { useQuery } from "@tanstack/react-query";
import { instance } from "../config/axios";
import { getCookieToken } from "../config/cookies";
import { chatData, chatlist } from "../types/chatType";

const userToken = {
  headers: { authorization: getCookieToken() },
};

export const chatApi = {
  getChatRoomlist: () => {
    return useQuery(["chatlist"], async () => {
      const { data } = await instance.get<chatlist[]>(
        `/api/channels/`,
        userToken,
      );
      return data;
    });
  },
  getChatData: () => {
    return useQuery(
      ["chat"],
      async () => {
        const { data } = await instance.get<chatData[]>(
          `/api/channels/3`,
          userToken,
        );
        return data;
      },
      { refetchInterval: 500 },
    );
  },
};

// const getChat = async () => {
//   const { data } = await instance.get<chatData[]>(`/api/channels/3`, {
//     headers: { authorization: userToken },
//   });
//   return data;
// };

// const { data: achat } = useQuery<chatData[]>(["chat"], getChat);
