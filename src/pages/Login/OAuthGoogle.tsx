import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { setAccessToken } from "../../config/cookies";
import { alertState, onAlertState } from "../../store/alertState";
import { LoginLoading } from "./LoginLoading";

export const OAuthGoogle = () => {
  const [searchParams] = useSearchParams();

  const [tgVal, tg] = useRecoilState(onAlertState); // 알러트 true/false
  const setAlertContent = useSetRecoilState(alertState); // 알러트 내용

  const googleToken = searchParams.get("accessToken");

  useEffect(() => {
    try {
      setAccessToken(`BEARER ${googleToken}`);
      window.location.href = "/";
    } catch (err) {
      setAlertContent("구글 로그인에 실패하였습니다.");
      tg(tgVal);
    }
  }, []);
  return (
    <>
      <LoginLoading />
    </>
  );
};
