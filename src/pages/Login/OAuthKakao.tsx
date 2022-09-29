import { useEffect } from "react";
import { OAuthAPI } from "../../APIs/OAuthApi";

export const OAuthKakao = () => {
  const kakaoToken = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    try {
      if (kakaoToken) {
        OAuthAPI.loginWithKakao(kakaoToken);
      }
      window.location.replace("/");
    } catch (err) {
      alert("카카오 로그인에 실패하였습니다.");
    }
  }, []);
  return <div>Login ~~</div>;
};
