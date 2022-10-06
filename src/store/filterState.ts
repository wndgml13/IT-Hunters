import { atom } from "recoil";
import { IFilter } from "../types/search";

export const filterState = atom<IFilter>({
  key: "filterState",
  default: {
    classType: [],
    stack: [],
    duration: 20,
    title: "",
  },
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

export const titleState = atom<string>({
  key: "titleState",
  default: "",
});
