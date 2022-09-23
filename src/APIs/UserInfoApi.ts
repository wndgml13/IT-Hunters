import { useQuery } from "@tanstack/react-query";
import { instance } from "../config/axios";
import { getCookieToken } from "../config/cookies";

export const UserInfoApi = {
  getUserInfo: () => {
    return useQuery(
      ["userinfo"],
      async () => {
        const { data } = await instance.get(`/api/members/status`);
        return data;
      },
      {
        enabled: !!getCookieToken(),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      },
    );
  },
};
