import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setAccessToken } from "../../config/cookies";

export const OAuthGoogle = () => {
  const [searchParams] = useSearchParams();

  const googleToken = searchParams.get("accessToken");

  const navigate = useNavigate();

  useEffect(() => {
    try {
      setAccessToken(`BEARAR ${googleToken}`);
      navigate("/");
    } catch (err) {
      alert("구글 로그인에 실패하였습니다.");
    }
  }, []);
  return <div>Login ~~</div>;
};
