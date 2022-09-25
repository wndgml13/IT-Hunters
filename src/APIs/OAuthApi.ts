import { instance } from "../config/axios";
import { setAccessToken } from "../config/cookies";

export const OAuthAPI = {
  loginWithKakao: async (kakaoToken: string) => {
    return await instance
      .get(`oauth/kakao/callback?code=${kakaoToken}`)
      .then(data => {
        setAccessToken(data.headers.authorization);
      });
  },
};
