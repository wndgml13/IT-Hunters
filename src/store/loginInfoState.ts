import { atom } from "recoil";
import { LoginInfoType } from "../types/loginInfoType";

export const loginInfoState = atom<LoginInfoType>({
  key: "loginInfoState",
  default: {
    id: 0,
    folioTitle: "",
    followCnt: 0,
    nickname: "",
    profileImage: "",
    stacks: [],
    className: "",
  },
});
