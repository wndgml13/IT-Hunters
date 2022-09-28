import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setAccessToken = (accessToken: string) => {
  const today = new Date();
  const expireDate = today.setDate(today.getDate() + 7);

  return cookies.set("monster_token", accessToken, {
    sameSite: "strict",
    // secure: false,
    path: "/",
    expires: new Date(expireDate),
    // httpOnly: true,
  });
};

export const getCookieToken = () => {
  return cookies.get("monster_token");
};

export const removeCookieToken = () => {
  return cookies.remove("monster_token", { sameSite: "strict", path: "/" });
};
