import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { instance } from "../config/axios";
import { getCookieToken } from "../config/cookies";
import { IQuestDetail } from "../types/postsDetailType";

const userToken = {
  headers: { authorization: getCookieToken() },
};

export const PostsApi = {
  getDetailPosts: (id: number) => {
    return useQuery<IQuestDetail, Error>(["Postsdetail", id], async () => {
      const { data } = await instance.get<IQuestDetail>(
        `api/quests/${id}`,
        userToken,
      );
      return data;
    });
  },
};
