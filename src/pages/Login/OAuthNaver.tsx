import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { OAuthAPI } from "../../APIs/OAuthApi";
import { LoginLoading } from "./LoginLoading";

export const OAuthNaver = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const naverToken = searchParams.get("code");
  const naverState = searchParams.get("state");

  useEffect(() => {
    try {
      if (naverToken && naverState) {
        OAuthAPI.loginWithNaver(naverToken, naverState);
      }
      navigate("/");
      window.location.reload();
    } catch (err) {
      alert("네이버 로그인에 실패하였습니다.");
    }
  }, []);
  return (
    <>
      <LoginLoading />
    </>
  );
};
