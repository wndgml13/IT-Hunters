import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";

import { HomeIcon, ChatIcon, WriteIcon, MyPageIcon } from "../assets/icons";

export const FooterNavBar = () => {
  const { pathname } = useLocation();
  return (
    <footer className="absolute flex justify-center items-center gap-x-16 h-[3.75rem] w-full left-0 bottom-0 z-10 shadow-[4px_0_30_1px_rgba(194,194,194,0.5)] bg-bgWhite">
      <Link to="/mypage">
        <MyPageIcon
          className={classNames("fill-black", {
            "fill-[#4B23B8]": pathname === "/mypage",
          })}
        />
      </Link>
      <Link to="/">
        <HomeIcon
          className={classNames("fill-black", {
            "fill-[#4B23B8]": pathname === "/",
          })}
        />
      </Link>
      <Link to="/chats">
        <ChatIcon
          className={classNames("fill-black", {
            "fill-[#4B23B8]": pathname === "/chats",
          })}
        />
      </Link>
      <Link to="/addposts">
        <WriteIcon
          className={classNames("fill-black", {
            "fill-[#4B23B8]": pathname === "/addposts",
          })}
        />
      </Link>
    </footer>
  );
};
