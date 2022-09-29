import { atom } from "recoil";

export const filterState = atom<string | unknown>({
  key: "filterState",
  default: "",
});
