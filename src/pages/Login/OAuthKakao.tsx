import { useEffect } from "react";
import { OAuthAPI } from "../../APIs/OAuthApi";
import { LoginLoading } from "./LoginLoading";

export const OAuthKakao = () => {
  const kakaoToken = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    try {
      if (kakaoToken) {
        OAuthAPI.loginWithKakao(kakaoToken);
      }
    } catch (err) {
      alert("카카오 로그인에 실패하셨습니다.");
    }
  }, []);
  return (
    <>
      <LoginLoading />
    </>
  );
};
