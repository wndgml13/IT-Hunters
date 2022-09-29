import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { setAccessToken } from "../../config/cookies";
import { LoginLoading } from "./LoginLoading";

export const OAuthGoogle = () => {
  const [searchParams] = useSearchParams();

  const googleToken = searchParams.get("accessToken");

  useEffect(() => {
    try {
      setAccessToken(`BEARER ${googleToken}`);
      window.location.href = "/";
    } catch (err) {
      alert("구글 로그인에 실패하였습니다.");
    }
  }, []);
  return (
    <>
      <LoginLoading />
    </>
  );
};
