import { Link } from "react-router-dom";

import { SearchIcon } from "../assets/icons";

export const Header = () => {
  return (
    <header className="w-full sticky">
      <ul className="flex  justify-between px-[26px] w-full h-[45px] items-center ">
        <li>
          <Link to="/">ITmonsters</Link>
        </li>
        <li>
          <Link to="/search">
            <SearchIcon />
          </Link>
        </li>
      </ul>
    </header>
  );
};
