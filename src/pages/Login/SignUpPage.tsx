import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../../config/axios";

import {
  buttonStyle,
  inputFileStyle,
  inputStyle,
  labelStyle,
  validSuccess,
  validError,
} from "./formStyle";

export const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nickname, setNickname] = useState("");

  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordConfirmValid, setPasswordConfirmValid] = useState(false);
  const [nicknameValid, setNicknameValid] = useState(false);

  const navigate = useNavigate();

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (email && emailRegex.test(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value.length > 7) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  };
  const passwordConfirmHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value);
    if (e.target.value === password) {
      setPasswordConfirmValid(true);
    } else {
      setPasswordConfirmValid(false);
    }
  };
  const nicknameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    if (e.target.value.length > 2) {
      setNicknameValid(true);
    } else {
      setNicknameValid(false);
    }
  };

  const onSignup = async () => {
    if (emailValid && passwordValid && passwordConfirmValid && nicknameValid) {
      try {
        const data = await instance.post("api/members/signup", {
          email,
          password,
          nickname,
        });
        console.log(data);
        alert("회원가입 성공");
        setEmail("");
        setPassword("");
        setPasswordConfirm("");
        setNickname("");
        navigate("/signin");
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("입력이 잘못되었습니다");
    }
  };

  return (
    <div className="overflow-y-scroll h-[calc(100%-3.5rem)] pb-[4rem] overflow-x-hidden grid gap-6 p-10 mb-6 md:grid-cols-1">
      <h1 className="text-3xl">용병님, 자기소개를 부탁해요!</h1>

      <div className="relative">
        <label className={labelStyle}>이메일</label>
        <input
          type="email"
          value={email}
          onChange={emailHandler}
          className={inputStyle}
          required
        />
        <button
          type="submit"
          className=" absolute right-1 bottom-1 bg-gray-300 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-4 py-2 "
        >
          중복확인
        </button>
        {email.length > 0 ? (
          emailValid ? (
            <p className={validSuccess}>올바른 이메일 형식입니다</p>
          ) : (
            <p className={validError}> 올바르지 않은 이메일 형식입니다</p>
          )
        ) : null}
      </div>

      <div>
        <label className={labelStyle}>닉네임</label>
        <input
          type="text"
          value={nickname}
          onChange={nicknameHandler}
          className={inputStyle}
          required
        />
        {nickname.length > 0 ? (
          nicknameValid ? (
            <p className={validSuccess}>올바른 닉네임입니다</p>
          ) : (
            <p className={validError}>닉네임은 2글자 이상으로 입력해주세요.</p>
          )
        ) : null}
      </div>

      <div>
        <label className={labelStyle}>비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={passwordHandler}
          className={inputStyle}
          required
        />

        {password.length > 0 ? (
          passwordValid ? (
            <p className={validSuccess}>올바른 비밀번호 형식입니다</p>
          ) : (
            <p className={validError}>비밀번호는 8자리 이상 입력해주세요</p>
          )
        ) : null}
      </div>
      <div>
        <label className={labelStyle}>비밀번호 재확인</label>
        <input
          type="password"
          value={passwordConfirm}
          onChange={passwordConfirmHandler}
          className={inputStyle}
          required
        />
        {passwordConfirm.length > 0 ? (
          passwordConfirmValid ? (
            <p className={validSuccess}>동일한 비밀번호입니다.</p>
          ) : (
            <p className={validError}>비밀번호가 일치하지않습니다.</p>
          )
        ) : null}
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

      <button type="button" className={buttonStyle} onClick={onSignup}>
        회원가입
      </button>
    </div>
  );
};
