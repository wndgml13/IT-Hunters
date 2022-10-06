import { atom } from "recoil";
import { bookmarkListType } from "../types/bookmarkListType";

export const bookMarkState = atom<bookmarkListType[]>({
  key: "bookMarkState",
  default: [],
});
