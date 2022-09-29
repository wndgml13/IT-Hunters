import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { OAuthAPI } from "../../APIs/OAuthApi";

export const OAuthNaver = () => {
  const [searchParams] = useSearchParams();

  const naverToken = searchParams.get("code");
  const naverState = searchParams.get("state");

  useEffect(() => {
    try {
      if (naverToken && naverState) {
        OAuthAPI.loginWithNaver(naverToken, naverState);
      }
      window.location.replace("/");
    } catch (err) {
      alert("네이버 로그인에 실패하였습니다.");
    }
  }, []);
  return <div>Login ~~</div>;
};
