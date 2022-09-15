import { Link } from "react-router-dom";

import { HomeIcon, ChatIcon, WriteIcon, MyPageIcon } from "../assets/icons";

export const FooterNavBar = () => {
  return (
    <footer className="absolute flex justify-around items-center h-[3.75rem] w-full left-0 bottom-0 z-10 shadow-[4px_0_30_1px_rgba(194,194,194,0.5)] bg-bgWhite">
      <Link to="/mypage">
        <MyPageIcon className="fill-black" />
      </Link>
      <Link to="/">
        <HomeIcon className="fill-black" />
      </Link>
      <Link to="/chats">
        <ChatIcon className="fill-black" />
      </Link>
      <Link to="/addposts">
        <WriteIcon className="fill-black" />
      </Link>
    </footer>
  );
};
