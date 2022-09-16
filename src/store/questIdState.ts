import { atom } from "recoil";

export const idState = atom<number>({
  key: "idState",
  default: 0,
});
