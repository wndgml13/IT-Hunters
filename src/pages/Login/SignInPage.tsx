import React, { useState } from "react";
import { Link } from "react-router-dom";
import { instance } from "../../config/axios";
import { setAccessToken } from "../../config/cookies";
import { validError, validSuccess } from "./formStyle";

export const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;
  const naverURL =
    `https://nid.naver.com/oauth2.0/authorize?client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_NAVER_REDIRECT_URI}&state=` +
    Math.random().toString(36).substring(3, 14);

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
        window.location.replace("/");
      } catch (error) {
        alert("아이디 혹은 비밀번호가 맞지않습니다. 다시한번 확인해주세요.");
      }
    } else {
      alert("입력이 잘못되었습니다");
    }
  };

  const onKakaoLogin = () => {
    window.location.href = kakaoURL;
  };
  const onNaverLogin = () => {
    window.location.href = naverURL;
  };
  const onGoogleLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_BASEURL}oauth2/authorization/google`;
  };

  return (
    <div className="w-full h-full overflow-y-scroll pb-[3.5rem] p-6">
      <h1 className="text-xl">
        <img src="/imgs/logo.png" alt="it몬스터 로고" className="w-[50%]" />
      </h1>
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
        <p className="text-sm font-extralight mr-2">
          계정을 잊으셨나요?{" "}
          <Link to="/findmyemail" className="text-blue-500">
            아이디찾기
          </Link>{" "}
          {/* 혹은{" "}
          <Link to="#" className="text-blue-500">
            비밀번호찾기
          </Link>{" "} */}
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
        <button className="w-[64px] h-[64px]" onClick={onKakaoLogin}>
          <img
            className="w-full h-full rounded-full"
            src="https://play-lh.googleusercontent.com/KwGCiEolNEeR9Q4RFOnDtb8Pvqs3LNiQEdE07wMCnoULO3yLUprHbGGLBYNEt8k7WJY"
          />
        </button>
        <button className="w-[64px] h-[64px]" onClick={onNaverLogin}>
          <img
            className="w-full h-full rounded-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFAIptpOidYLp81FCTWsAHPyW4wvlxM3wENhodrjHSRYgLE60WPvKvgEQmKWS5ETj9g-k&usqp=CAU"
          />
        </button>
        <button className="w-[64px] h-[64px]" onClick={onGoogleLogin}>
          <img
            className="w-full h-full rounded-full"
            src="https://staffordonline.org/wp-content/uploads/2019/01/Google.jpg"
          />
        </button>
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
