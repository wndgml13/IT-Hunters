import { useCallback, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import Stomp from "stompjs";
import { UserInfoApi } from "../APIs/UserInfoApi";
import { getCookieToken } from "../config/cookies";
import { alertState, onAlertState } from "../store/alertState";

export const useAlert = ({ client }: { client: Stomp.Client }) => {
  const usertoken = {
    Authorization: getCookieToken(),
  };

  const { data, isSuccess } = UserInfoApi.getUserInfo();

  const [tgVal, tg] = useRecoilState(onAlertState);

  const setAlertContent = useSetRecoilState(alertState);

  useEffect(() => {
    if (isSuccess && data) {
      const id = data.id;
      alertConnect(id);
    }

    return () => {
      if (isSuccess && data) {
        const id = data.id;
        alertDisconnect(id);
      }
    };
  }, [isSuccess]);

  // 채팅 연결
  const alertConnect = (id: number) => {
    if (client.connected) {
      alertSub(id);
    } else {
      client.connect(usertoken, () => {
        alertSub(id);
      });
    }
  };

  const alertSub = useCallback((id: number) => {
    client.subscribe(
      `/sub/members/${id}`,
      data => {
        const newAlert = JSON.parse(data.body);
        setAlertContent(newAlert.content);
        tg(!tgVal);
      },
      { id: `alert-${id}` },
    );
  }, []);

  const alertDisconnect = (id: number) => {
    if (client !== null) {
      if (client.connected) client.unsubscribe(`${id}`);
    }
  };
};
