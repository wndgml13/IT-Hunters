import { useQuery } from "@tanstack/react-query";
import { instance } from "../config/axios";

export const mainPageAPis = {
  getRecentQuests: () => {
    return useQuery(["recentQuests"], async () => {
      const { data } = await instance.get("/api/quests/recent");
      return data;
    });
  },
  getMonthMonter: () => {
    return useQuery(["monthMonter"], async () => {
      const { data } = await instance.get("/api/monster/month");
      return data;
    });
  },
  getPopularQuests: () => {
    return useQuery(["popularQuests"], async () => {
      const { data } = await instance.get("/api/quests/main");
      return data;
    });
  },
};
