import React from "react";
import { useInput } from "../../hooks/useInput";

export const SignUpPage = () => {
  const [email, emailHandler] = useInput("");
  const [password, passwordHandler] = useInput("");
  const [passwordConfirm, passwordConfirmHandler] = useInput("");
  const [nickname, nicknameHandler] = useInput("");

  const labelStyle = "mb-2 text-sm font-medium text-gray-900";
  const inputStyle =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5";
  const buttonStyle =
    "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none";
  const inputFileStyle =
    "block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100";

  return (
    <div className="grid gap-6 mb-6 md:grid-cols-1">
      <h1 className="text-3xl">용병님, 자기소개를 부탁해요!</h1>
      <div>
        <label className={labelStyle}>이메일</label>
        <input
          type="email"
          value={email}
          onChange={emailHandler}
          className={inputStyle}
        />
      </div>
      <div>
        <label className="labelStyle">비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={passwordHandler}
          className={inputStyle}
        />
      </div>
      <div>
        <label className="labelStyle">비밀번호 재확인</label>
        <input
          type="password"
          value={passwordConfirm}
          onChange={passwordConfirmHandler}
          className={inputStyle}
        />
      </div>

      <div>
        <label className="labelStyle">닉네임</label>
        <input
          type="text"
          value={nickname}
          onChange={nicknameHandler}
          className={inputStyle}
        />
      </div>

      <div className="grid grid-cols-3 gap-4 ">
        <div className="w-20 h-20 rounded-full bg-green-300 ">
          {/* <img className= 'w-full h-full' alt='profileImg' /> */}
        </div>
        <div className="col-span-2">
          <input
            className={inputFileStyle}
            aria-describedby="file_input_help"
            type="file"
          />
        </div>
      </div>

      <button type="button" className={buttonStyle}>
        회원가입
      </button>
    </div>
  );
};
