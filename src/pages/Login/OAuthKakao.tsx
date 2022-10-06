import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { OAuthAPI } from "../../APIs/OAuthApi";
import { alertState, onAlertState } from "../../store/alertState";
import { LoginLoading } from "./LoginLoading";

export const OAuthKakao = () => {
  const kakaoToken = new URL(window.location.href).searchParams.get("code");

  const [tgVal, tg] = useRecoilState(onAlertState); // 알러트 true/false
  const setAlertContent = useSetRecoilState(alertState); // 알러트 내용

  useEffect(() => {
    try {
      if (kakaoToken) {
        OAuthAPI.loginWithKakao(kakaoToken);
      }
    } catch (err) {
      setAlertContent("카카오 로그인에 실패하셨습니다.");
      tg(!tgVal);
    }
  }, []);
  return (
    <>
      <LoginLoading />
    </>
  );
};
