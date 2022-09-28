import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { OAuthAPI } from "../../APIs/OAuthApi";

export const OAuthNaver = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const naverToken = searchParams.get("code");
  const naverState = searchParams.get("state");

  useEffect(() => {
    try {
      if (naverToken && naverState) {
        OAuthAPI.loginWithNaver(naverToken, naverState);
      }
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }, []);
  return <div>Login ~~</div>;
};
