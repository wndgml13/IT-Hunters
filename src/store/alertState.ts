import { atom } from "recoil";

export const alertState = atom<string>({
  key: "alertState",
  default: "",
});

export const onAlertState = atom<boolean>({
  key: "onAlertState",
  default: false,
});
