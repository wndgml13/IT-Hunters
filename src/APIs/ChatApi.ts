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
  getChatData: (channelNum: string | undefined) => {
    return useQuery(
      ["chat", channelNum],
      async () => {
        const { data } = await instance.get<chatData[]>(
          `/api/channels/${channelNum}`,
          userToken,
        );
        return data;
      },
      // { refetchInterval: 500 },
    );
  },
};
