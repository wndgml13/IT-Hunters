import { atom } from "recoil";

export const filterState = atom<string | unknown>({
  key: "filterState",
  default: "",
});

export const classesState = atom<string[]>({
  key: "classesState",
  default: [],
});

export const stacksState = atom<string[]>({
  key: "stacksState",
  default: [],
});

export const durationState = atom<number>({
  key: "durationState",
  default: 20,
});
