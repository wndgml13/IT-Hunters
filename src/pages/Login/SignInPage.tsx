import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { instance } from "../../config/axios";
import { setAccessToken } from "../../config/cookies";
import { validError, validSuccess } from "./formStyle";

export const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const navigate = useNavigate();
  // const kakaoURL =
  //   "https://kauth.kakao.com/oauth/authorize?client_id=75e088caeb12f87f945b64b6df403621&redirect_uri=http://localhost:3000/oauth/kakao/callback&response_type=code";

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
        setAccessToken(data.headers.authorization);
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
  //http://localhost:8080/oauth/google/loginpage
  const onKakaoLogin = async () => {
    // const data = await instance.get("oauth/google/loginpage");
    // console.log(data);
  };

  return (
    <div className="w-full h-full overflow-y-scroll pb-[3.5rem] p-6">
      <h1 className="text-xl">로그인</h1>
      <div className="text-[28px] font-cookie mt-[70px]">
        <p className="font-cookie leading-10">
          <span className="font-cookie text-brandBlue">
            몬스터여,
            <br />
          </span>
          IT의 세계로 <br />
          모험을 떠날 준비가 되었나?
        </p>
      </div>

      <div className="mt-[34px] mb-[24px] flex-col space-y-4">
        <input
          type="email"
          value={email}
          onChange={emailHandler}
          className="text-gray-900 text-sm bg-[#f1f2f5] h-[52px] rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
          placeholder="이메일을 입력해주세요"
        />
        {email.length > 0 ? (
          emailValid ? (
            <p className={validSuccess}>올바른 이메일 형식입니다</p>
          ) : (
            <p className={validError}> 올바르지 않은 이메일 형식입니다</p>
          )
        ) : null}

        <input
          type="password"
          value={password}
          onChange={passwordHandler}
          className="text-gray-900 text-sm bg-[#f1f2f5] h-[52px] rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
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

      <div className="flex justify-end mb-[24px]">
        <p className="text-sm font-extralight">
          계정을 잊으셨나요?{" "}
          <Link to="#" className="text-blue-500">
            아이디찾기
          </Link>{" "}
          혹은{" "}
          <Link to="#" className="text-blue-500">
            비밀번호찾기
          </Link>{" "}
        </p>
      </div>

      <button
        type="button"
        className={
          "text-white w-full h-[57px] bg-brandBlue font-bold rounded-lg text-lg px-5 py-2.5 mr-2 mb-[58px] focus:outline-none shadow-[5px_5px_0_0_rgb(244,200,40)]"
        }
        onClick={onSignin}
      >
        로그인
      </button>

      <div className="grid grid-cols-3 place-items-center mb-[69px]">
        <button
          className="w-[68px] h-[68px] rounded-full bg-gray-300 "
          onClick={onKakaoLogin}
        >
          <img
            className="w-full h-full rounded-full"
            src="https://play-lh.googleusercontent.com/KwGCiEolNEeR9Q4RFOnDtb8Pvqs3LNiQEdE07wMCnoULO3yLUprHbGGLBYNEt8k7WJY"
          />
        </button>
        <div className="w-[68px] h-[68px] rounded-full bg-gray-300 ">
          {/* <img className= 'w-full h-full' alt='profileImg' /> */}
        </div>
        <div className="w-[68px] h-[68px] rounded-full bg-gray-300 ">
          {/* <img className= 'w-full h-full' alt='profileImg' /> */}
        </div>
      </div>

      <div className="flex justify-center">
        <p className="text-sm">
          아직 회원이 아니신가요?{" "}
          <Link to="/signup" className="text-blue-600">
            회원가입 &gt;{" "}
          </Link>
        </p>{" "}
      </div>
    </div>
  );
};
