import { useMutation, useQuery } from "@tanstack/react-query";
import { instance } from "../config/axios";
import { portfolioType, profilePortfolioType } from "../types/profileType";

export const PortfolioApi = {
  getPortfolio: (memberId: number) => {
    return useQuery(["portfolio", memberId], async () => {
      if (memberId !== 0) {
        const { data } = await instance.get<profilePortfolioType>(
          `api/myPage/${memberId}`,
        );
        return data;
      }
    });
  },
  editPortfolio: () => {
    return useMutation(async (portfolioInfo: portfolioType) => {
      const { data } = await instance.put(`api/folio`, {
        title: portfolioInfo.title,
        notionUrl: portfolioInfo.notionUrl,
        githubUrl: portfolioInfo.githubUrl,
        blogUrl: portfolioInfo.blogUrl,
      });
      return data;
    });
  },
};
