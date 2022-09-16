import { useState } from "react";
import { useRecoilValue } from "recoil";
import { loginInfoState } from "../store/loginInfoState";

export const EditUserInfoPage = () => {
  const userProfile = useRecoilValue(loginInfoState);
  const [nickname] = useState<string>(userProfile.nickname);
  const [profileImage] = useState<string>(userProfile.profileImage);

  return (
    <div className="p-4">
      <div className="pb-10">
        <p className="text-2xl">회원정보수정</p>
      </div>{" "}
      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="w-20 h-20 rounded-full bg-green-300 ">
          <img
            className="w-full h-full rounded-full"
            src={profileImage}
            alt="profileImg"
          />
        </div>
        <div className="col-span-2">
          <input aria-describedby="file_input_help" type="file" />
        </div>
      </div>
      <div className="pb-10">
        <label>닉네임</label>
        <input
          value={nickname}
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
          required
        />
      </div>
      <button className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium bottom-0 w-full h-[3rem] text-sm px-5 py-2.5 text-center">
        수정완료
      </button>
    </div>
  );
};
