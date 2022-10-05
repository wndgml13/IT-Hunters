import { atom } from "recoil";

export const bookMarkState = atom<string | unknown>({
  key: "filterState",
  default: "",
});
