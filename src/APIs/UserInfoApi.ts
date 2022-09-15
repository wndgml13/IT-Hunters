import { useQuery } from "@tanstack/react-query";
import { instance } from "../config/axios";
import { getCookieToken } from "../config/cookies";

const userToken = {
  headers: { authorization: getCookieToken() },
};

export const UserInfoApi = {
  getUserInfo: () => {
    return useQuery(["userinfo"], async () => {
      const { data } = await instance.get(`/api/members/status`, userToken);
      return data;
    });
  },
};
