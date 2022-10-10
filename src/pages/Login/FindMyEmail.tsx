import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { instance } from "../../config/axios";
import { alertState, onAlertState } from "../../store/alertState";

const FindMyEmail = () => {
  const navigate = useNavigate();
  const [phoneNum, setPhoneNum] = useState("");
  const [phoneNumValidToggle, setPhoneNumValidToggle] = useState(false);
  const [authPhoneNum, setAuthPhoneNum] = useState("");
  const [myemail, setMyemail] = useState("");
  const [error, setError] = useState("");

  const [tgVal, tg] = useRecoilState(onAlertState); // 알러트 true/false
  const setAlertContent = useSetRecoilState(alertState); // 알러트 내용

  const checkPhoneNum = async () => {
    try {
      const { data } = await instance.post("/api/members/sendAuth", {
        phoneNumber: phoneNum,
      });
      setPhoneNumValidToggle(true);
      return data;
    } catch (err) {
      setAlertContent("인증번호 발송에 실패하였습니다. 다시 시도해주세요");
      tg(!tgVal);
      return err;
    }
  };
  const findMyID = async () => {
    try {
      const { data } = await instance.post("/api/members/findUsername", {
        phoneNumber: phoneNum,
        authNumber: authPhoneNum,
      });
      setMyemail(data.data);
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data.message);
      }
    }
  };

  return (
    <div className="w-full h-full overflow-y-scroll pb-[3.5rem] px-6 ">
      <div className="flex mt-3">
        <button
          className="text-brandBlue text-2xl"
          onClick={() => navigate(-1)}
        >
          <svg
            width="23"
            height="14"
            viewBox="0 0 23 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.19169 13.5976L0.3245 7.73045L0.305432 7.71138L0.295164 7.70258L0.286363 7.69231L0.276096 7.68058L0.268762 7.67177L0.257027 7.65857L0.245293 7.64391L0.223291 7.6131L0.207156 7.59257L0.192488 7.57203L0.17782 7.55003V7.54123L0.164619 7.52803V7.51776V7.50603L0.148484 7.49283V7.48403L0.129416 7.46642C0.0157149 7.25305 -0.0246311 7.0082 0.0146003 6.76964C0.0538317 6.53107 0.170461 6.31203 0.346502 6.14631L6.19169 0.308455C6.39926 0.108159 6.6772 -0.00259538 6.96564 4.61893e-05C7.25409 0.00268775 7.52995 0.118514 7.73382 0.322578C7.93769 0.526642 8.05326 0.802616 8.05563 1.09106C8.058 1.37951 7.94698 1.65734 7.74649 1.86473L3.75827 5.85295H21.6371C21.9288 5.85295 22.2086 5.96885 22.4149 6.17516C22.6213 6.38147 22.7372 6.66128 22.7372 6.95304C22.7372 7.24481 22.6213 7.52462 22.4149 7.73093C22.2086 7.93724 21.9288 8.05314 21.6371 8.05314H3.75827L7.74649 12.0428C7.85458 12.1435 7.94127 12.265 8.00139 12.3999C8.06152 12.5349 8.09385 12.6806 8.09646 12.8283C8.09906 12.976 8.07189 13.1227 8.01656 13.2597C7.96123 13.3967 7.87888 13.5211 7.77442 13.6256C7.66995 13.73 7.54552 13.8124 7.40854 13.8677C7.27156 13.923 7.12483 13.9502 6.97712 13.9476C6.82941 13.945 6.68374 13.9127 6.5488 13.8525C6.41385 13.7924 6.2924 13.7057 6.19169 13.5976Z"
              fill="black"
            />
          </svg>
        </button>
        <p className="ml-4 text-lg">아이디 찾기</p>
      </div>
      <div className="flex justify-center mt-16">
        <img src="/imgs/puu.png" className="w-[60%] h-[60%]" />
      </div>
      <div className="mt-14 flex justify-center">
        <p className="w-4/5 text-sm text-center">
          회원가입시 등록한
          <br /> 전화번호로 아이디를 확인할수 있습니다.
        </p>
      </div>
      <div className="my-[100px] mb-[24px] flex-col space-y-1">
        <input
          type="tel"
          className="text-gray-900 text-sm bg-[#f1f2f5] h-[52px] rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
          placeholder="휴대폰 번호를 입력해주세요 '-'는 제외"
          value={phoneNum}
          onChange={e => setPhoneNum(e.target.value)}
        />
        <button className="text-sm float-right" onClick={checkPhoneNum}>
          인증번호 발송
        </button>
      </div>
      {phoneNumValidToggle ? (
        <div className="mt-10">
          <div className="flex justify-between">
            <input
              type="text"
              placeholder="인증번호를 입력해주세요"
              value={authPhoneNum}
              onChange={e => setAuthPhoneNum(e.target.value)}
              className="w-3/5 pl-2.5 py-2 mr-8 outline-none text-sm border-b-[2px] focus-within:border-b-brandBlue"
              required
            />
            <div className="pt-2">
              <svg
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22.7969 0H0V22.7969H22.7969V0Z" fill="#F7F9FC" />
                <path
                  d="M11.2969 17.7969C10.391 17.7977 9.49397 17.6204 8.65811 17.2753C7.82226 16.9301 7.06426 16.424 6.42829 15.7865C5.12744 14.4951 4.38457 12.7551 4.3562 10.9331L4.01148 11.2831C3.87954 11.4151 3.7 11.4899 3.51229 11.4911C3.32458 11.4924 3.14406 11.4199 3.01037 11.2897C2.94408 11.2269 2.89107 11.1518 2.85442 11.0687C2.81778 10.9855 2.79824 10.896 2.79693 10.8053C2.79464 10.6194 2.86698 10.4402 2.99809 10.3069L4.55736 8.73234C4.62339 8.66586 4.70216 8.61304 4.78908 8.57699C4.876 8.54094 4.96932 8.52237 5.06358 8.52237C5.15784 8.52237 5.25116 8.54094 5.33808 8.57699C5.425 8.61304 5.50377 8.66586 5.5698 8.73234L7.12812 10.3069C7.19373 10.3736 7.24529 10.4524 7.27983 10.5389C7.31436 10.6255 7.33117 10.7179 7.32929 10.8109C7.32778 10.9013 7.30814 10.9905 7.2715 11.0733C7.23486 11.1561 7.18196 11.2309 7.11585 11.2934C6.98216 11.4236 6.80163 11.4961 6.61392 11.4949C6.42622 11.4936 6.24667 11.4188 6.11474 11.2869L5.77285 10.9434C5.80025 12.3823 6.39121 13.7545 7.42145 14.7716C8.45168 15.7887 9.84088 16.3713 11.2969 16.3969C12.0776 16.3941 12.8486 16.226 13.5581 15.9041C14.2676 15.5821 14.899 15.1136 15.4099 14.5302C15.477 14.4555 15.5593 14.3957 15.6514 14.3546C15.7435 14.3136 15.8434 14.2923 15.9445 14.2922C16.1157 14.2922 16.2811 14.3543 16.4091 14.4667C16.5498 14.5892 16.6358 14.7617 16.6482 14.9465C16.6606 15.1314 16.5984 15.3136 16.4752 15.4533C15.8305 16.1855 15.0351 16.7734 14.1421 17.1776C13.2491 17.5817 12.2791 17.7929 11.2969 17.7969ZM17.5302 13.0714C17.4361 13.0709 17.3431 13.0521 17.2564 13.0161C17.1697 12.9801 17.091 12.9275 17.0249 12.8614L15.4656 11.2869C15.3999 11.2199 15.3482 11.1407 15.3137 11.0539C15.2792 10.967 15.2624 10.8743 15.2645 10.781C15.266 10.6908 15.2856 10.6017 15.3223 10.519C15.3589 10.4364 15.4118 10.3617 15.4779 10.2994C15.6116 10.1692 15.7921 10.0967 15.9798 10.098C16.1675 10.0992 16.3471 10.174 16.479 10.3059L16.8209 10.6485C16.793 9.20996 16.2018 7.83816 15.1717 6.82148C14.1415 5.80481 12.7525 5.22246 11.2969 5.19688C10.5165 5.1992 9.74577 5.36657 9.03633 5.68774C8.3269 6.0089 7.69525 6.47642 7.18384 7.05888C7.11683 7.13363 7.03453 7.1935 6.94239 7.23452C6.85025 7.27554 6.75035 7.2968 6.64929 7.29688C6.47755 7.29691 6.3118 7.23445 6.18368 7.12141C6.11331 7.06073 6.05577 6.98691 6.01434 6.90419C5.97291 6.82147 5.94843 6.73148 5.94228 6.63938C5.93614 6.54729 5.94846 6.4549 5.97855 6.36752C6.00863 6.28014 6.05587 6.1995 6.11757 6.13021C6.76335 5.39969 7.55936 4.8137 8.45249 4.41133C9.34562 4.00897 10.3153 3.79949 11.2969 3.79688C12.2027 3.7959 13.0997 3.97307 13.9355 4.31806C14.7714 4.66305 15.5294 5.16897 16.1655 5.80634C17.4663 7.09774 18.2092 8.8377 18.2376 10.6597L18.5823 10.3097C18.7142 10.1777 18.8937 10.1029 19.0815 10.1017C19.2692 10.1005 19.4497 10.1729 19.5834 10.3031C19.6498 10.3658 19.7028 10.4409 19.7395 10.5241C19.7761 10.6073 19.7956 10.6968 19.7968 10.7875C19.7992 10.9737 19.7268 11.1532 19.5957 11.2869L18.0364 12.8623C17.9701 12.9285 17.8913 12.9811 17.8044 13.0171C17.7176 13.0532 17.6244 13.0719 17.5302 13.0723V13.0714Z"
                  fill="black"
                />
              </svg>
            </div>
          </div>
        </div>
      ) : null}
      {error && <p className="text-red-500 mt-2 ml-2 text-sm">{error}</p>}
      {myemail && <p className="text-center mt-10">{myemail}</p>}
      <button
        type="button"
        onClick={findMyID}
        className={
          "text-white w-full h-[57px] bg-brandBlue font-bold rounded-lg text-lg px-5 py-2.5 mr-2 my-[70px] focus:outline-none shadow-[5px_5px_0_0_rgb(244,200,40)]"
        }
      >
        확인
      </button>
    </div>
  );
};

export default FindMyEmail;
