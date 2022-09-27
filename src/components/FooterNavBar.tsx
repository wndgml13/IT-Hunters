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

export const FooterNavBar = () => {
  const { data: userinfo, isSuccess } = UserInfoApi.getUserInfo();
  const setLoginInfo = useSetRecoilState<LoginInfoType>(loginInfoState);
  useEffect(() => {
    if (isSuccess) {
      setLoginInfo(userinfo);
    }
  }, [isSuccess, userinfo]);

  const { pathname } = useLocation();
  return (
    <footer className="absolute flex justify-center items-center gap-x-11 h-[3.75rem] w-full left-0 bottom-0 z-10 shadow-[4px_0_30_1px_rgba(194,194,194,0.5)] bg-bgWhite">
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
