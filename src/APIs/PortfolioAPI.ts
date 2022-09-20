import { useMutation, useQuery } from "@tanstack/react-query";
import { instance } from "../config/axios";
import { getCookieToken } from "../config/cookies";
import { portfolioType } from "../types/profileType";

const userToken = {
  headers: { authorization: getCookieToken() },
};

export const PortfolioApi = {
  getPortfolio: (memberId: number) => {
    return useQuery(["portfolio", memberId], async () => {
      const { data } = await instance.get(`api/myPage/${memberId}`, userToken);
      return data;
    });
  },
  editPortfolio: () => {
    return useMutation(async (portfolioInfo: portfolioType) => {
      const { data } = await instance.put(
        `api/folio`,
        {
          title: portfolioInfo.title,
          notionUrl: portfolioInfo.notionUrl,
          githubUrl: portfolioInfo.githubUrl,
          blogUrl: portfolioInfo.blogUrl,
        },
        userToken,
      );
      return data;
    });
  },
};
