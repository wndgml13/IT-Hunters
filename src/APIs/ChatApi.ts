import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { instance } from "../config/axios";
import { chatData, chatlist } from "../types/chatType";

interface IkickoutPayload {
  channelId: number;
  memberId: number;
}

export const chatApi = {
  getChatRoomlist: () => {
    return useQuery(["chatlist"], async () => {
      const { data } = await instance.get<chatlist[]>(`/api/channels/`);
      return data;
    });
  },
  getChatData: (channelNum: string | undefined) => {
    return useQuery(
      ["chat", channelNum],
      async () => {
        const { data } = await instance.get<chatData[]>(
          `/api/channels/${channelNum}`,
        );
        return data;
      },
      // { refetchInterval: 500 },
    );
  },
  getChatRoomInfo: (channelId: number | undefined) => {
    return useQuery(["chatInfo"], async () => {
      const { data } = await instance.get(`/api/channels/${channelId}/squad`);
      return data;
    });
  },
  exitChatRoom: () => {
    return useMutation(async (channelId: number) => {
      const { data } = await instance.post(`/api/channels/${channelId}`, {});
      return data;
    });
  },
  kickOutMember: () => {
    return useMutation(async (payload: IkickoutPayload) => {
      const { data } = await instance.post(
        `/api/channels/${payload.channelId}/${payload.memberId}`,
        {},
      );
      return data;
    });
  },
  getPastMessage: () => {
    return useInfiniteQuery(["chatList"], async () => {
      const data = await instance.post(
        `/api/channels/21/test?page=0&size=10`,
        {},
      );
      return data;
    });
  },
};
