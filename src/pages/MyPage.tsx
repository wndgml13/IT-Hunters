import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { notificationApi } from "../APIs/NotificationApi";
import { PortfolioApi } from "../APIs/PortfolioAPI";
import { UserInfoApi } from "../APIs/UserInfoApi";
import { PageHeader } from "../components/PageHeader";
// import { PortfolioApi } from "../APIs/PortfolioAPI";
import { getCookieToken, removeCookieToken } from "../config/cookies";
import { useUploadImg } from "../hooks/useUploadImg";
import { loginInfoState } from "../store/loginInfoState";
import { LoginInfoType } from "../types/loginInfoType";
import { EditPortFolio } from "./EditPortfoilio";
import { EditStackPage } from "./EditStackPage";
import { NoLoginError } from "./ErrorPage/NoLoginError";

interface squad {
  memberId: number;
  questId: number;
  questTitle: string;
  squadId: number;
}

export const MyPage = () => {
  const [userProfile, setUserProfile] = useState<LoginInfoType>();
  const [EUItoggle, setEUItoggle] = useState(false);
  const [folioToggle, setFolioToggle] = useState(false);
  const [stacksToggle, setStacksToggle] = useState(false);
  const usertoken = getCookieToken();
  const queryClient = useQueryClient();
  const [profileImg, profileImgHandler] = useUploadImg(
    userProfile?.profileImage,
  );

  const { data: mysquad } = notificationApi.getMySquads();

  const userinfo = useRecoilValue(loginInfoState);

  const [editedNickname, setEditedNickname] = useState<string | undefined>();
  const classes = ["프론트엔드", "백엔드", "디자이너", "풀스택"];
  const [myClasses, setMyClasses] = useState(userinfo.className);

  const { mutateAsync: editInfo } = UserInfoApi.editUserInfo();

  const onSubmitUserInfo = () => {
    const editedInfo = { editedNickname, myClasses, profileImg };
    editInfo(editedInfo).then(() => {
      queryClient.invalidateQueries(["userinfo"]);
    });
    setEUItoggle(!EUItoggle);
  };

  useEffect(() => {
    setUserProfile(userinfo);
  }, [userinfo]);

  const { data: myfolio } = PortfolioApi.getPortfolio(userinfo.id);

  if (!usertoken) {
    return <NoLoginError />;
  }

  return (
    <div className="w-full overflow-y-scroll h-full pb-[4rem] overflow-x-hidden bg-[#F8F8FA]">
      <PageHeader pgTitle={"마이페이지"} />

      <div className="my-10">
        {!EUItoggle ? (
          <>
            <div className="relative flex justify-center">
              <img
                className="w-[70px] h-[70px] rounded-full"
                src={userProfile?.profileImage}
              />

              <button
                className="text-sm absolute bottom-8 right-5"
                onClick={() => setEUItoggle(!EUItoggle)}
              >
                프로필 수정
              </button>
            </div>
            <p className="text-2xl font-bold text-center">
              {userProfile?.nickname}
            </p>

            <p className="text-sm font-medium text-center">
              {userProfile?.className}
            </p>
          </>
        ) : (
          <>
            <div className="relative flex justify-center">
              <img
                className="w-[70px] h-[70px] rounded-full flex justify-center"
                src={profileImg}
              />{" "}
              <button className="absolute bottom-[-10px] pl-14">
                <label htmlFor="uploadImg" className="cursor-pointer">
                  <svg
                    width="31"
                    height="31"
                    viewBox="0 0 31 31"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="15.5" cy="15.5" r="15.5" fill="white" />
                    <path
                      d="M9.18926 23.0284H21.8107C22.3684 23.0276 22.903 22.8034 23.2973 22.4049C23.6917 22.0064 23.9135 21.4662 23.9143 20.9026V10.9826C23.9135 10.4191 23.6917 9.87886 23.2973 9.48037C22.903 9.08188 22.3684 8.85768 21.8107 8.85693H9.18926C8.63159 8.85768 8.09697 9.08188 7.70264 9.48037C7.3083 9.87886 7.08644 10.4191 7.08569 10.9826V20.9026C7.08644 21.4662 7.3083 22.0064 7.70264 22.4049C8.09697 22.8034 8.63159 23.0276 9.18926 23.0284V23.0284ZM19.7071 14.1098L22.5119 16.9441V20.9026C22.5116 21.0905 22.4377 21.2706 22.3062 21.4034C22.1748 21.5362 21.9966 21.611 21.8107 21.6112H9.18926C9.047 21.6101 8.90839 21.5656 8.79161 21.4835C8.67482 21.4014 8.58532 21.2855 8.53482 21.1511L12.6952 16.945L14.7988 19.0708L19.7071 14.1098ZM12.6952 15.527C12.5109 15.5264 12.3284 15.5627 12.1581 15.6339C11.9878 15.7051 11.8332 15.8097 11.7033 15.9417L8.48807 19.1917V10.9826C8.48832 10.7948 8.56228 10.6147 8.69372 10.4819C8.82517 10.3491 9.00337 10.2743 9.18926 10.2741H21.8107C21.9966 10.2743 22.1748 10.3491 22.3062 10.4819C22.4377 10.6147 22.5116 10.7948 22.5119 10.9826V14.9412L20.6981 13.1084C20.5683 12.9764 20.4139 12.8718 20.2438 12.8006C20.0737 12.7294 19.8912 12.693 19.7071 12.6936C19.523 12.6931 19.3406 12.7295 19.1705 12.8007C19.0004 12.8719 18.846 12.9765 18.7161 13.1084L14.7988 17.066L13.6862 15.9417C13.5564 15.8098 13.4019 15.7053 13.2318 15.6341C13.0617 15.5629 12.8793 15.5265 12.6952 15.527V15.527ZM11.2928 14.5255C11.6648 14.5255 12.0215 14.3762 12.2845 14.1104C12.5475 13.8447 12.6952 13.4842 12.6952 13.1084C12.6952 12.7325 12.5475 12.3721 12.2845 12.1063C12.0215 11.8405 11.6648 11.6912 11.2928 11.6912C10.9209 11.6912 10.5642 11.8405 10.3012 12.1063C10.0382 12.3721 9.89046 12.7325 9.89046 13.1084C9.89046 13.4842 10.0382 13.8447 10.3012 14.1104C10.5642 14.3762 10.9209 14.5255 11.2928 14.5255Z"
                      fill="black"
                    />
                  </svg>
                </label>
                <input
                  type="file"
                  className="hidden"
                  id="uploadImg"
                  onChange={profileImgHandler}
                />
              </button>{" "}
              <button
                className="absolute text-sm bottom-5 right-5"
                onClick={onSubmitUserInfo}
              >
                적용하기
              </button>
            </div>

            <div className="flex justify-center">
              <input
                placeholder="닉네임을 입력해주세요"
                value={editedNickname}
                onChange={e => setEditedNickname(e.target.value)}
                className="pl-2.5 py-2 border-b-[2px] text-center bg-[#f8f8fa] outline-none focus:border-brandBlue"
              />
            </div>
            <ul className="flex justify-center gap-x-2">
              {classes.map((c, idx) => (
                <li key={idx}>
                  <input
                    type="radio"
                    className="sr-only peer"
                    value={c}
                    id={c}
                    checked={myClasses === c ? true : false}
                    onChange={e => setMyClasses(e.target.value)}
                  />
                  <label
                    htmlFor={c}
                    className="text-center text-sm text-gray-300 cursor-pointer peer-checked:text-black "
                  >
                    <p>{c}</p>
                  </label>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <div className="pt-4 w-full rounded-t-[40px] px-6 pb-10 bg-white">
        <div className="mt-8">
          <h2 className="text-lg font-bold">
            한줄 소개{" "}
            <button
              className="text-blue-600 ml-2"
              onClick={() => setFolioToggle(!folioToggle)}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.19739 18H0.812264C0.596933 17.9997 0.390507 17.914 0.238245 17.7617C0.0859831 17.6094 0.000311476 17.403 1.38518e-05 17.1876V13.8006C-0.00106965 13.4806 0.0614222 13.1634 0.183862 12.8677C0.306302 12.572 0.486251 12.3035 0.713264 12.0779L12.0758 0.713089C12.5325 0.256494 13.1518 0 13.7976 0C14.4433 0 15.0627 0.256494 15.5194 0.713089L17.2879 2.47182C17.7439 2.92913 18 3.54866 18 4.19455C18 4.84044 17.7439 5.45997 17.2879 5.91728L5.92539 17.2821C5.69927 17.5103 5.43007 17.6913 5.13342 17.8145C4.83678 17.9377 4.51861 18.0008 4.19739 18ZM10.5548 4.53099L1.86189 13.2268C1.78638 13.302 1.72653 13.3914 1.68578 13.4899C1.64504 13.5884 1.62422 13.694 1.62451 13.8006V16.3763H4.19739C4.30414 16.3767 4.40991 16.3559 4.50859 16.3151C4.60726 16.2744 4.69688 16.2145 4.77226 16.1389L13.4651 7.44421L10.5548 4.53099ZM13.8026 1.62002C13.6959 1.6197 13.5901 1.64051 13.4915 1.68126C13.3928 1.72201 13.3032 1.78189 13.2278 1.85745L11.7 3.38326L14.6138 6.2976L16.1393 4.77179C16.2907 4.61919 16.3756 4.41292 16.3756 4.19793C16.3756 3.98293 16.2907 3.77666 16.1393 3.62406L14.3753 1.85745C14.3001 1.78187 14.2107 1.72197 14.1122 1.68122C14.0137 1.64046 13.9081 1.61966 13.8015 1.62002H13.8026Z"
                  fill="black"
                />
              </svg>
            </button>
          </h2>
          <p className="my-4 break-all">"{myfolio?.title}"</p>
        </div>
        <div className="mt-8">
          <h2 className="text-lg font-bold mb-6">보유 스택</h2>
          {myfolio?.stackList.length === 0 ? (
            <>
              <p>
                스택이 없습니다 추가 하시겠습니까?
                <button
                  className="text-brandBlue"
                  onClick={() => setStacksToggle(!stacksToggle)}
                >
                  스택추가하기
                </button>
              </p>
            </>
          ) : (
            <ul className="grid gap-1 w-full grid-cols-3">
              {myfolio?.stackList.map((stack, idx) => (
                <li key={idx}>
                  <p className="flex justify-center p-2 w-full text-[14px] border-2 rounded-lg border-black">
                    {stack.stackName}
                  </p>
                </li>
              ))}
              <li>
                {" "}
                <button
                  onClick={() => setStacksToggle(!stacksToggle)}
                  className="flex justify-center p-2 w-full text-[14px] rounded-lg bg-[#EBEBEB] border-2 border-[#EBEBEB]"
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.33398 15.7681V9.53418H1.1001C0.808334 9.53418 0.52852 9.41828 0.322211 9.21197C0.115903 9.00566 0 8.72585 0 8.43408C0 8.14232 0.115903 7.8625 0.322211 7.6562C0.52852 7.44989 0.808334 7.33398 1.1001 7.33398H7.33398V1.1001C7.33398 0.808334 7.44989 0.52852 7.6562 0.322211C7.8625 0.115903 8.14232 0 8.43408 0C8.72585 0 9.00566 0.115903 9.21197 0.322211C9.41828 0.52852 9.53418 0.808334 9.53418 1.1001V7.33398H15.7681C16.0598 7.33398 16.3396 7.44989 16.546 7.6562C16.7523 7.8625 16.8682 8.14232 16.8682 8.43408C16.8682 8.72585 16.7523 9.00566 16.546 9.21197C16.3396 9.41828 16.0598 9.53418 15.7681 9.53418H9.53418V15.7681C9.53418 16.0598 9.41828 16.3396 9.21197 16.546C9.00566 16.7523 8.72585 16.8682 8.43408 16.8682C8.14232 16.8682 7.8625 16.7523 7.6562 16.546C7.44989 16.3396 7.33398 16.0598 7.33398 15.7681Z"
                      fill="#C2C2C2"
                    />
                  </svg>
                </button>{" "}
              </li>
            </ul>
          )}
        </div>

        <div className="mt-8">
          <p className="text-lg font-bold">포트폴리오</p>{" "}
          <div className="flex justify-between mt-6">
            {myfolio?.notionUrl !== "" && myfolio?.notionUrl !== null ? (
              <a
                className="mx-auto relative w-14 h-14 bg-gray-300 rounded-full"
                href={myfolio?.notionUrl}
                target="_blank"
              >
                <img
                  className="w-full h-full border rounded-full"
                  src="https://static.twig.money/images/company/21/wTlJpLE2"
                />
              </a>
            ) : null}

            {myfolio?.githubUrl !== "" && myfolio?.githubUrl !== null ? (
              <a
                className="mx-auto relative w-14 h-14 bg-gray-300 rounded-full"
                href={myfolio?.githubUrl}
              >
                <img
                  className="w-full h-full border rounded-full"
                  src="data:image/png;base64,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"
                />
              </a>
            ) : null}

            {myfolio?.blogUrl !== "" && myfolio?.blogUrl !== null ? (
              <a
                className="mx-auto relative w-14 h-14 bg-gray-300 rounded-full"
                href={myfolio?.blogUrl}
              >
                <img
                  className="w-full h-full border rounded-full"
                  src="https://as2.ftcdn.net/v2/jpg/02/44/68/97/1000_F_244689725_wCaHdOOJohF5fDtXvhj4Hid1JvZYqwJc.jpg"
                />
              </a>
            ) : null}
          </div>
        </div>

        {myfolio && folioToggle ? (
          <EditPortFolio myfolio={myfolio} tg={setFolioToggle} />
        ) : null}
        {myfolio && stacksToggle ? (
          <EditStackPage myfolio={myfolio} tg={setStacksToggle} />
        ) : null}

        <div className="mt-8 mb-6 py-2">
          <h2 className="text-lg font-bold">진행중인 퀘스트</h2>
          {mysquad?.map((m: squad) => (
            <div className="py-2" key={m.squadId}>
              <h3 className="text-xl text-brandBlue">
                <Link to={`/posts/${m.questId}`}>{m.questTitle}</Link>
              </h3>
            </div>
          ))}
        </div>
      </div>
      <button
        className="text-red-600 bg-white w-full mt-4 py-6"
        onClick={() => {
          removeCookieToken();
          window.location.href = "/";
        }}
      >
        logout
      </button>
    </div>
  );
};
