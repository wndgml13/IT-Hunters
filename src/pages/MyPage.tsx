export const MyPage = () => {
  function 내함수(a: "가위" | "바위" | "보"): ("가위" | "바위" | "보")[] {
    return ["가위"];
  }

  type Member = {
    name: string;
    age: number;
    plusOne: (x: number) => number;
    changeName: () => void;
  };

  let 회원정보: Member = {
    name: "kim",
    age: 30,
    plusOne(x) {
      return x + 1;
    },
    changeName: () => {
      console.log("안녕");
    },
  };
  회원정보.plusOne(1);
  회원정보.changeName();

  return (
    <div className="w-auto max-w-md bg-orange-200 w-auto">
      <h1>마이페이지</h1>
      <p className="m-6 mt-10">프로필 수정</p>
      <div className="flex justify-start">
        <div className="m-5 overflow-hidden relative w-24 h-24 bg-gray-100 rounded-full dark:bg-gray-600">
          <svg
            className="absolute -left-1 w-28 h-28 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <div className="grid justify-items-start ">
          <p>닉네임</p>
          <p>직업</p>
          <p>누적건수</p>
        </div>
      </div>
      <p className="m-10 -mt-10">⭐⭐⭐</p>
      <p className="m-5">스테이터스</p>

      <div className="flex justify-start -mt-6">
        <div className="m-5 overflow-hidden relative w-16 h-16 bg-gray-100 rounded-full dark:bg-gray-600"></div>
        <div className="m-5 overflow-hidden relative w-16 h-16 bg-gray-100 rounded-full dark:bg-gray-600"></div>
        <div className="m-5 overflow-hidden relative w-16 h-16 bg-gray-100 rounded-full dark:bg-gray-600"></div>
        <div className="m-5 overflow-hidden relative w-16 h-16 bg-gray-100 rounded-full dark:bg-gray-600"></div>
      </div>
      <div className="flex justify-start">
        <div className="m-5 overflow-hidden relative w-16 h-16 bg-gray-100 rounded-full dark:bg-gray-600"></div>
        <div className="m-5 overflow-hidden relative w-16 h-16 bg-gray-100 rounded-full dark:bg-gray-600"></div>
        <div className="m-5 overflow-hidden relative w-16 h-16 bg-gray-100 rounded-full dark:bg-gray-600"></div>
        <div className="m-5 overflow-hidden relative w-16 h-16 bg-gray-100 rounded-full dark:bg-gray-600"></div>
      </div>
      <div className="m-5">
        <p>나의 포트폴리오 관리</p>
        <p>내가 찜한 외주회사들</p>
        <p>내가 작성한 글</p>
        <p>계약된 외주 목록</p>
        <p>공지사항/이벤트</p>
        <p>About Us</p>
      </div>
    </div>
  );
};
