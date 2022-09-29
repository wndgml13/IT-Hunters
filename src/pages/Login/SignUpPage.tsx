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
      <div className="mt-[44px]">
        <p className="text-sm mb-4">약관동의 - 아직안됨</p>
        <div className="border">
          <div className="flex border-b p-4">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="12" fill="#D9D9D9" />
              <path
                d="M6.17431 11.7551C6.08111 11.6486 5.96784 11.5615 5.84098 11.4988C5.71412 11.4361 5.57615 11.3989 5.43494 11.3896C5.29374 11.3802 5.15206 11.3987 5.01801 11.444C4.88396 11.4894 4.76015 11.5607 4.65366 11.6539C4.54716 11.7471 4.46007 11.8603 4.39735 11.9872C4.33463 12.1141 4.29751 12.252 4.28812 12.3932C4.27872 12.5345 4.29722 12.6761 4.34258 12.8102C4.38793 12.9442 4.45925 13.068 4.55245 13.1745L8.32421 17.4857C8.42309 17.599 8.54462 17.6904 8.68097 17.754C8.81732 17.8176 8.96547 17.8519 9.11588 17.8547C9.26629 17.8576 9.41563 17.8289 9.55428 17.7705C9.69294 17.7121 9.81783 17.6254 9.92093 17.5158L19.0813 7.81737C19.2775 7.60963 19.3832 7.33245 19.3751 7.04681C19.3669 6.76116 19.2456 6.49044 19.0379 6.29421C18.8302 6.09797 18.553 5.9923 18.2673 6.00044C17.9817 6.00857 17.711 6.12985 17.5147 6.33758L9.16783 15.1773L6.17431 11.7551Z"
                fill="white"
              />
            </svg>
            <p className="ml-2 text-sm">전체동의</p>
          </div>
          <div className="flex border-b p-4">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="11.5" fill="white" stroke="#C2C2C2" />
              <path
                d="M6.17431 11.7551C6.08111 11.6486 5.96784 11.5615 5.84098 11.4988C5.71412 11.4361 5.57615 11.3989 5.43494 11.3896C5.29374 11.3802 5.15206 11.3987 5.01801 11.444C4.88396 11.4894 4.76015 11.5607 4.65366 11.6539C4.54716 11.7471 4.46007 11.8603 4.39735 11.9872C4.33463 12.1141 4.29751 12.252 4.28812 12.3932C4.27872 12.5345 4.29722 12.6761 4.34258 12.8102C4.38793 12.9442 4.45925 13.068 4.55245 13.1745L8.32421 17.4857C8.42309 17.599 8.54462 17.6904 8.68097 17.754C8.81732 17.8176 8.96547 17.8519 9.11588 17.8547C9.26629 17.8576 9.41563 17.8289 9.55428 17.7705C9.69294 17.7121 9.81783 17.6254 9.92093 17.5158L19.0813 7.81737C19.2775 7.60963 19.3832 7.33245 19.3751 7.04681C19.3669 6.76116 19.2456 6.49044 19.0379 6.29421C18.8302 6.09797 18.553 5.9923 18.2673 6.00044C17.9817 6.00857 17.711 6.12985 17.5147 6.33758L9.16783 15.1773L6.17431 11.7551Z"
                fill="#C2C2C2"
              />
            </svg>
            <p className="ml-2 text-sm">웹회원 이용약관 동의</p>
          </div>
          <div className="flex p-4">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="11.5" fill="white" stroke="#C2C2C2" />
              <path
                d="M6.17431 11.7551C6.08111 11.6486 5.96784 11.5615 5.84098 11.4988C5.71412 11.4361 5.57615 11.3989 5.43494 11.3896C5.29374 11.3802 5.15206 11.3987 5.01801 11.444C4.88396 11.4894 4.76015 11.5607 4.65366 11.6539C4.54716 11.7471 4.46007 11.8603 4.39735 11.9872C4.33463 12.1141 4.29751 12.252 4.28812 12.3932C4.27872 12.5345 4.29722 12.6761 4.34258 12.8102C4.38793 12.9442 4.45925 13.068 4.55245 13.1745L8.32421 17.4857C8.42309 17.599 8.54462 17.6904 8.68097 17.754C8.81732 17.8176 8.96547 17.8519 9.11588 17.8547C9.26629 17.8576 9.41563 17.8289 9.55428 17.7705C9.69294 17.7121 9.81783 17.6254 9.92093 17.5158L19.0813 7.81737C19.2775 7.60963 19.3832 7.33245 19.3751 7.04681C19.3669 6.76116 19.2456 6.49044 19.0379 6.29421C18.8302 6.09797 18.553 5.9923 18.2673 6.00044C17.9817 6.00857 17.711 6.12985 17.5147 6.33758L9.16783 15.1773L6.17431 11.7551Z"
                fill="#C2C2C2"
              />
            </svg>
            <p className="ml-2 text-sm">선택이용약관</p>
          </div>
        </div>
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
