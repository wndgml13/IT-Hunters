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
import { BookmarkApi } from "../APIs/BookmarkApi";
import { bookMarkState } from "../store/bookMarkState";

const FooterNavBar = () => {
  const { data: userinfo, isSuccess } = UserInfoApi.getUserInfo();
  const setLoginInfo = useSetRecoilState<LoginInfoType>(loginInfoState);
  useEffect(() => {
    if (isSuccess) {
      setLoginInfo(userinfo);
    }
  }, [isSuccess, userinfo]);
  const { pathname } = useLocation();

  const { data: myBookmark, isSuccess: isBMsuccess } =
    BookmarkApi.getMyBookmark();
  const setMyBookmarks = useSetRecoilState(bookMarkState);

  useEffect(() => {
    if (isBMsuccess) {
      setMyBookmarks(myBookmark);
    }
  }, [isBMsuccess, myBookmark]);

  return (
    <footer
      className={classNames(
        "fixed z-40 bottom-0 w-[480px] sm:w-full ",
        {
          hidden: pathname.includes("/chats/"),
        },
        { hidden: pathname.includes("/signup") },
      )}
    >
      <div className="flex items-center justify-center gap-x-11 bg-white pt-3 pb-7 shadow-[0_0_20px_1px_rgba(194,194,194,0.5)] ">
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
      </div>
    </footer>
  );
};

export default FooterNavBar;
