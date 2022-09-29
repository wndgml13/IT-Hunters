import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OAuthAPI } from "../../APIs/OAuthApi";
import { LoginLoading } from "./LoginLoading";

export const OAuthKakao = () => {
  const kakaoToken = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    try {
      if (kakaoToken) {
        OAuthAPI.loginWithKakao(kakaoToken);
      }
      navigate("/");
      window.location.reload();
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
