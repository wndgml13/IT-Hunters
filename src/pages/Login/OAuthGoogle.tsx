import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setAccessToken } from "../../config/cookies";

export const OAuthGoogle = () => {
  const [searchParams] = useSearchParams();

  const googleToken = searchParams.get("accessToken");

  console.log(googleToken);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      setAccessToken(`BEARAR ${googleToken}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }, []);
  return <div>Login ~~</div>;
};
