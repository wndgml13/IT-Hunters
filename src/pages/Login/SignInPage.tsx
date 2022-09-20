import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { instance } from "../../config/axios";
import { setAccessToken } from "../../config/cookies";
import {
  buttonStyle,
  inputStyle,
  labelStyle,
  validError,
  validSuccess,
} from "./formStyle";

export const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

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

  const onSignin = async () => {
    if (emailValid && passwordValid) {
      try {
        const data = await instance.post("api/members/login", {
          email,
          password,
        });
        console.log(data.headers);

        setAccessToken(data.headers.authorization);
        axios.defaults.headers.common[
          "Authorization"
        ] = `${data.headers.authorization}`;

        alert("로그인 성공");
        setEmail("");
        setPassword("");
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("입력이 잘못되었습니다");
    }
  };

  return (
    <div className="grid gap-6 mb-6 md:grid-cols-1 p-10">
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
        {email.length > 0 ? (
          emailValid ? (
            <p className={validSuccess}>올바른 이메일 형식입니다</p>
          ) : (
            <p className={validError}> 올바르지 않은 이메일 형식입니다</p>
          )
        ) : null}
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
        {password.length > 0 ? (
          passwordValid ? (
            <p className={validSuccess}>올바른 비밀번호 형식입니다</p>
          ) : (
            <p className={validError}>비밀번호는 8자리 이상 입력해주세요</p>
          )
        ) : null}
      </div>

      <button type="button" className={buttonStyle} onClick={onSignin}>
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
        <button className="text-blue-600">
          <Link to="/signup">회원가입</Link>
        </button>
      </p>
    </div>
  );
};
