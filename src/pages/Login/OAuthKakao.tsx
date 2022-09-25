import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OAuthAPI } from "../../APIs/OAuthApi";

export const OAuthKakao = () => {
  const kakaoToken = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    try {
      if (kakaoToken) {
        OAuthAPI.loginWithKakao(kakaoToken);
      }
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }, []);
  return <div>Login ~~</div>;
};
