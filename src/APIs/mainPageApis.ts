import { instance } from "../config/axios";

export const mainPageAPis = {
  getRecentQuests: async () => {
    const { data } = await instance.get("/api/quests/recent");
    return data;
  },
  getMonthMonter: async () => {
    const { data } = await instance.get("/api/monster/month");
    return data;
  },
  getPopularQuests: async () => {
    const { data } = await instance.get("/api/quests/main");
    return data;
  },
};
