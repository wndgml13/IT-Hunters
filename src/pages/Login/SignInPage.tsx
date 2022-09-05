import React from "react";
import { useInput } from "../../hooks/useInput";

export const SignInPage = () => {
  const [email, emailHandler] = useInput("");
  const [password, passwordHandler] = useInput("");

  const labelStyle = "mb-2 text-sm font-medium text-gray-900";
  const inputStyle =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5";
  const buttonStyle =
    "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none";

  return (
    <div className="grid gap-6 mb-6 md:grid-cols-1">
      <h1 className="text-3xl">
        IT용병단, 그 화려한 모험으로 당신을 초대합니다.
      </h1>
      <div>
        <label className={labelStyle}>이메일</label>
        <input
          type="email"
          value={email}
          onChange={emailHandler}
          className={inputStyle}
          placeholder="이메일을 입력해주세요"
        />
      </div>
      <div>
        <label className="labelStyle">비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={passwordHandler}
          className={inputStyle}
          placeholder="비밀번호를 입력해주세요"
        />
      </div>

      <button type="button" className={buttonStyle}>
        로그인
      </button>

      <div>
        <label>간편 로그인</label>
        <div className="grid grid-cols-3">
          <div className="w-20 h-20 rounded-full bg-green-300 ">
            {/* <img className= 'w-full h-full' alt='profileImg' /> */}
          </div>
          <div className="w-20 h-20 rounded-full bg-green-300 ">
            {/* <img className= 'w-full h-full' alt='profileImg' /> */}
          </div>
          <div className="w-20 h-20 rounded-full bg-green-300 ">
            {/* <img className= 'w-full h-full' alt='profileImg' /> */}
          </div>
        </div>
      </div>

      <p>
        아직회원이 아니신가요?{" "}
        <button className="text-blue-600">회원가입</button>
      </p>
    </div>
  );
};
