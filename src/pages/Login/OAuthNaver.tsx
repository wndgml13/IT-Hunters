import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { OAuthAPI } from "../../APIs/OAuthApi";
import { alertState, onAlertState } from "../../store/alertState";
import { LoginLoading } from "./LoginLoading";

const OAuthNaver = () => {
  const [searchParams] = useSearchParams();

  const [tgVal, tg] = useRecoilState(onAlertState); // 알러트 true/false
  const setAlertContent = useSetRecoilState(alertState); // 알러트 내용

  const naverToken = searchParams.get("code");
  const naverState = searchParams.get("state");

  useEffect(() => {
    try {
      if (naverToken && naverState) {
        OAuthAPI.loginWithNaver(naverToken, naverState);
      }
    } catch (err) {
      setAlertContent("네이버 로그인에 실패하였습니다.");
      tg(!tgVal);
    }
  }, []);
  return (
    <>
      <LoginLoading />
    </>
  );
};

export default OAuthNaver;
