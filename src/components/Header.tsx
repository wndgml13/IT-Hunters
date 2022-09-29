import { useNavigate } from "react-router-dom";
import { notificationApi } from "../APIs/NotificationApi";
import { Bell } from "../assets/icons";
import { getCookieToken } from "../config/cookies";

export const Header = () => {
  const token = getCookieToken();
  const navigate = useNavigate();
  const { data: notifications } = notificationApi.getQuestOffer();
  console.log(notifications);
  return (
    <header className="w-full sticky flex p-[10px] justify-between">
      <img src="/imgs/logo.png" alt="IT몬스터즈 로고" className="w-[40%]" />

      {token && (
        <button
          className="relative pr-1"
          onClick={() => {
            navigate("notification");
          }}
        >
          <Bell />
          {notifications?.length > 0 ? (
            <span className="absolute w-2 h-2 top-[2px] right-0 rounded-[50%] bg-red-500"></span>
          ) : null}
        </button>
      )}
    </header>
  );
};
