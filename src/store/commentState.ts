import { atom } from "recoil";

export const commentState = atom<boolean>({
  key: "commentState",
  default: false,
});
