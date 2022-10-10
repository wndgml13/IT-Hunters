import { Link } from "react-router-dom";

const NoLoginError = () => {
  return (
    <div className="border flex justify-center items-center  w-full h-screen text-center">
      <div>
        <div className="flex justify-center mb-10">
          <img src="/imgs/dia.png" className="w-[60%] h-[60%] animate-bounce" />
        </div>

        <p className="text-center text-xl font-cookie mb-6">
          로그인이 되지 않았습니다!
        </p>
        <Link
          to="/signin"
          className="bg-brandBlue text-white px-4 py-2 rounded-2xl text-center font-cookie"
        >
          login하러가기
        </Link>
      </div>
    </div>
  );
};

export default NoLoginError;
