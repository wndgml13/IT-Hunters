import { Link } from "react-router-dom";

export const NoLoginError = () => {
  return (
    <div className="border flex justify-center items-center absolute top-0 left-0 w-full h-full text-center">
      <div>
        <p className="text-center">
          로그인이 되지 않았습니다 로그인 먼저 해주세요
        </p>
        <Link to="/signin" className="text-blue-400 text-center">
          login하러가기
        </Link>
      </div>
    </div>
  );
};
