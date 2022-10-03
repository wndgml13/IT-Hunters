import { AxiosError } from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../components/PageHeader";
import { instance } from "../../config/axios";
import { validSuccess, validError } from "./formStyle";

export const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nickname, setNickname] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [authPhoneNum, setAuthPhoneNum] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordConfirmValid, setPasswordConfirmValid] = useState(false);
  const [nicknameValid, setNicknameValid] = useState(false);

  const [phoneNumValidToggle, setPhoneNumValidToggle] = useState(false);

  const [emailCheckMsg, setEmailCheckMsg] = useState("");
  const [nicknameCheckMsg, setNicknameCheckMsg] = useState("");
  const navigate = useNavigate();

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

  const isDuplicatedEmail = async () => {
    try {
      const { data } = await instance.post("/api/members/checkId", {
        email,
      });
      setEmailValid(true);
      setEmailCheckMsg(data.data);
    } catch (err) {
      if (err instanceof AxiosError) {
        setEmailValid(false);
        setEmailCheckMsg(err.response?.data.message);
      }
    }
  };

  const isDuplicatedNickname = async () => {
    try {
      const { data } = await instance.post("/api/members/checkNickname", {
        nickname,
      });
      setNicknameValid(true);
      setNicknameCheckMsg(data.data);
    } catch (err) {
      if (err instanceof AxiosError) {
        setNicknameValid(false);
        setNicknameCheckMsg(err.response?.data.message);
      }
    }
  };

  const checkPhoneNum = async () => {
    try {
      const { data } = await instance.post("/api/members/sendSmsForSignup", {
        phoneNumber: phoneNum,
      });
      alert("인증번호 발송");
      setPhoneNumValidToggle(true);
      return data;
    } catch (err) {
      if (err instanceof AxiosError) {
        alert(err.response?.data.message);
      }
    }
  };

  const confirmPhoneNum = async () => {
    try {
      const { data } = await instance.post("/api/members/confirmPhoneNumber", {
        phoneNumber: phoneNum,
        authNumber: authPhoneNum,
      });
      alert("인증성공");
      return data;
    } catch (err) {
      if (err instanceof AxiosError) {
        alert(err.response?.data.message);
      }
    }
  };

  const onSignup = async () => {
    if (emailValid && passwordValid && passwordConfirmValid && nicknameValid) {
      try {
        const { data } = await instance.post("api/members/signup", {
          email,
          password,
          nickname,
          phoneNumber: phoneNum,
        });
        alert("회원가입 성공");
        setEmail("");
        setPassword("");
        setPasswordConfirm("");
        setNickname("");
        navigate("/signin");
        return data;
      } catch (error) {
        alert("회원가입에 실패하였습니다.");
      }
    } else {
      alert("입력이 잘못되었습니다");
    }
  };

  return (
    <div className="w-full h-full overflow-y-scroll pb-[10rem] px-6">
      <h1 className="text-xl">
        <PageHeader pgTitle={"회원가입"} />
      </h1>

      <div className="text-[28px] font-cookie mt-[32px]">
        <p className="font-cookie leading-10">
          IT의 세계에 온것을
          <br /> 환영한다! <br />
          <span className="font-cookie text-brandBlue">그대의정보가</span>
          알고싶군.
        </p>
      </div>

      <div className="relative block mt-10">
        <p className="mb-4 text-sm font-medium text-gray-900">이메일</p>
        <div className="flex border-b-[2px] focus-within:border-b-brandBlue">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="이메일을 입력해주세요"
            className="w-full pl-2.5 py-2 outline-none "
            required
          />
          <button
            type="submit"
            className="mb-1 border w-[100px] text-brandBlue border-brandBlue rounded-2xl text-sm px-2 py-1 "
            onClick={isDuplicatedEmail}
          >
            중복확인
          </button>
        </div>

        {emailCheckMsg.length ? (
          emailValid ? (
            <p className={validSuccess}>{emailCheckMsg}</p>
          ) : (
            <p className={validError}> {emailCheckMsg}</p>
          )
        ) : null}
      </div>

      <div className="relative block mt-7">
        <p className="mb-4 text-sm font-medium text-gray-900">닉네임</p>
        <div className="flex border-b-[2px] focus-within:border-b-brandBlue">
          <input
            type="nickname"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            placeholder="닉네임을 입력해주세요"
            className="w-full pl-2.5 py-2 outline-none "
            required
          />
          <button
            type="submit"
            className="mb-1 border w-[100px] text-brandBlue border-brandBlue rounded-2xl text-sm px-2 py-1 "
            onClick={isDuplicatedNickname}
          >
            중복확인
          </button>
        </div>
        {nicknameCheckMsg.length > 0 ? (
          nicknameValid ? (
            <p className={validSuccess}>{nicknameCheckMsg}</p>
          ) : (
            <p className={validError}> {nicknameCheckMsg}</p>
          )
        ) : null}
      </div>

      <div className="mt-7">
        <p className="mb-4 text-sm font-medium text-gray-900">비밀번호</p>
        <input
          type="password"
          value={password}
          onChange={passwordHandler}
          placeholder="영문/숫자 조합 8~20자리"
          className="w-full pl-2.5 py-2 border-b-[2px] outline-none focus:border-brandBlue"
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
      <div className="mt-7">
        <p className="mb-4 text-sm font-medium text-gray-900">
          비밀번호 재확인
        </p>
        <input
          type="password"
          value={passwordConfirm}
          onChange={passwordConfirmHandler}
          placeholder="영문/숫자 조합 8~20자리"
          className="w-full pl-2.5 py-2 border-b-[2px] outline-none focus:border-brandBlue"
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

      <div className="mt-7">
        <p className="mb-4 text-sm font-medium text-gray-900">휴대폰 번호</p>
        <div className="flex">
          <input
            type="tel"
            placeholder="'-' 제외하고 입력해주세요"
            value={phoneNum}
            onChange={e => setPhoneNum(e.target.value)}
            className="w-4/5 pl-2.5 py-2 mr-8 outline-none  border-b-[2px] focus-within:border-b-brandBlue"
            required
          />
          <button
            type="submit"
            className="mb-1 border w-[120px] text-brandBlue border-brandBlue rounded-xl text-sm px-2 py-1 "
            onClick={checkPhoneNum}
          >
            인증번호 요청
          </button>
        </div>
      </div>
      {phoneNumValidToggle ? (
        <div className="mt-7">
          <p className="mb-4 text-sm font-medium text-gray-900">인증번호</p>
          <div className="flex">
            <input
              type="text"
              placeholder="인증번호를 입력해주세요"
              value={authPhoneNum}
              onChange={e => setAuthPhoneNum(e.target.value)}
              className="w-4/5 pl-2.5 py-2 mr-8 outline-none  border-b-[2px] focus-within:border-b-brandBlue"
              required
            />
            <button
              type="submit"
              className="mb-1 border w-[120px] text-brandBlue border-brandBlue rounded-xl text-sm px-2 py-1 "
              onClick={confirmPhoneNum}
            >
              인증번호 확인
            </button>
          </div>
        </div>
      ) : null}
      {/* <div className="grid grid-cols-3 gap-4 ">
        <div className="w-20 h-20 rounded-full bg-green-300 ">
          <img className= 'w-full h-full' alt='profileImg' />
        </div>
        <div className="col-span-2">
          <input
            className={inputFileStyle}
            aria-describedby="file_input_help"
            type="file"
          />
        </div>
      </div> */}

      <div className="w-full absolute bottom-0 left-0 right-0 z-50">
        <button
          type="button"
          onClick={onSignup}
          className="text-white bg-brandBlue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium bottom-0 w-full h-[3rem] text-sm px-5 py-2.5 text-center"
        >
          회원가입
        </button>
      </div>
    </div>
  );
};
