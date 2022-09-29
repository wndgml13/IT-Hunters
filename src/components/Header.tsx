import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="w-full sticky">
      <Link to="/" className="w-full sticky py-[10px] block">
        <img src="/imgs/logo.png" alt="IT몬스터즈 로고" className="w-[40%]" />
      </Link>
    </header>
  );
};
