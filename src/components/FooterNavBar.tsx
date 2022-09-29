import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import {
  HomeIcon,
  ChatIcon,
  WriteIcon,
  MyPageIcon,
  SearchIcon,
} from "../assets/icons";
import { UserInfoApi } from "../APIs/UserInfoApi";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { loginInfoState } from "../store/loginInfoState";
import { LoginInfoType } from "../types/loginInfoType";

export const FooterNavBar = ({ mobile }: { mobile: string }) => {
  const { data: userinfo, isSuccess } = UserInfoApi.getUserInfo();
  const setLoginInfo = useSetRecoilState<LoginInfoType>(loginInfoState);
  useEffect(() => {
    if (isSuccess) {
      setLoginInfo(userinfo);
    }
  }, [isSuccess, userinfo]);
  const { pathname } = useLocation();

  return (
    <footer
      className={classNames(
        "flex  justify-center items-center gap-x-11 w-full z-[9999] left-0 bottom-0 shadow-[4px_0_3px_1px_rgba(194,194,194,0.5)]",
        {
          "h-[70px]": mobile === "other" || mobile === "kakao",
          "h-[130px]": mobile === "IOS",
          "h-[120px]": mobile === "android",
          "pb-[70px]": mobile === "android" || mobile === "IOS",
          hidden: pathname.includes("/chats/"),
        },
      )}
    >
      <Link to="/search">
        <SearchIcon
          className={classNames({
            "stroke-brandBlue": pathname === "/search",
            "stroke-white": pathname !== "/search",
          })}
        />
      </Link>
      <Link to="/addposts">
        <WriteIcon
          className={classNames("fill-black", {
            "fill-brandBlue": pathname === "/addposts",
          })}
        />
      </Link>
      <Link to="/">
        <HomeIcon
          className={classNames({
            "fill-brandBlue": pathname === "/",
            "fill-black": pathname !== "/",
          })}
        />
      </Link>
      <Link to="/chats">
        <ChatIcon
          className={classNames({
            "fill-brandBlue": pathname === "/chats",
            "fill-black": pathname !== "/chats",
          })}
        />
      </Link>
      <Link to="/mypage">
        <MyPageIcon
          className={classNames({
            "fill-brandBlue": pathname === "/mypage",
            "fill-black": pathname !== "/mypage",
          })}
        />
      </Link>
    </footer>
  );
};
