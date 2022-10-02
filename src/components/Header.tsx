import { useNavigate } from "react-router-dom";
import { notificationApi } from "../APIs/NotificationApi";
import { Bell } from "../assets/icons";
import { getCookieToken } from "../config/cookies";

export const Header = () => {
  const token = getCookieToken();
  const navigate = useNavigate();
  const { data: notifications } = notificationApi.getQuestOffer();

  return (
    <header className="fixed z-[9999] top-0 w-[480px] sm:w-full">
      <div className="flex justify-between px-6 py-[6px] bg-white mb-[5rem]">
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
              <span className="flex h-2 w-2">
                <span className="absolute w-2 h-2 top-[2px] right-0 rounded-[50%] bg-red-500 animate-ping"></span>
                <span className="absolute w-2 h-2 top-[2px] right-0 rounded-[50%] bg-red-500"></span>
              </span>
            ) : null}
          </button>
        )}
      </div>
    </header>
  );
};
