import { atom } from "recoil";
import { chatData } from "../types/chatType";

export const chatDataState = atom<chatData[]>({
  key: "chatDataState",
  default: [],
});
