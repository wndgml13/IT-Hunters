import { useQuery } from "@tanstack/react-query";
import { mainPageAPis } from "../APIs/mainPageApis";

export function getRecentQuestsQuery() {
  return useQuery(["recentQuests"], mainPageAPis.getRecentQuests);
}

export function getMonthMonsterQuery() {
  return useQuery(["monthMonter"], mainPageAPis.getMonthMonter);
}

export function getPopularQuestsQuery() {
  return useQuery(["popularQuests"], mainPageAPis.getPopularQuests);
}
