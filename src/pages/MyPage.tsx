import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { notificationApi } from "../APIs/NotificationApi";
import { PortfolioApi } from "../APIs/PortfolioAPI";
import { editedInfoType, UserInfoApi } from "../APIs/UserInfoApi";
import { AlbumIcon, PencilIcon, PlusIcon } from "../assets/icons";
import { YesOrNoModal } from "../components/Modals/YesOrNoModal";
import { PageHeader } from "../components/PageHeader";
import { removeCookieToken } from "../config/cookies";
import { useUploadImg } from "../hooks/useUploadImg";
import { loginInfoState } from "../store/loginInfoState";
import { LoginInfoType } from "../types/loginInfoType";
import { EditPortFolio } from "./EditPortfoilio";
import { EditStackPage } from "./EditStackPage";
import { bookMarkState } from "../store/bookMarkState";

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
  const queryClient = useQueryClient();
  const [profileImg, profileImgHandler, setProfileImg] = useUploadImg("");
  const [editedNickname, setEditedNickname] = useState<string | undefined>();
  const { data: mysquad } = notificationApi.getMySquads();
  const [logoutTg, setLogoutTg] = useState(false);

  const userinfo = useRecoilValue(loginInfoState);

  const classes = ["프론트엔드", "백엔드", "디자이너", "풀스택"];
  const [myClasses, setMyClasses] = useState("");

  const { mutateAsync: editInfo } = UserInfoApi.editUserInfo();
  const editedInfo: editedInfoType = { editedNickname, myClasses, profileImg };

  const { data: myfolio } = PortfolioApi.getPortfolio(userinfo.id);

  const myBookmarks = useRecoilValue(bookMarkState);

  const onSubmitUserInfo = () => {
    const editedData = { ...editedInfo };
    if (editedData.profileImg === userProfile?.profileImage) {
      editedData.profileImg = null;
    }

    if (myClasses !== "") {
      editInfo(editedData).then(() => {
        queryClient.invalidateQueries(["userinfo"]);
      });
      setEUItoggle(!EUItoggle);
    } else {
      alert("직군을 선택해주세요!");
    }
  };

  const onLogout = () => {
    removeCookieToken();
    window.location.href = "/";
  };

  useEffect(() => {
    setUserProfile(userinfo);
    setProfileImg(userinfo.profileImage);
    setMyClasses(userinfo.className);
    setEditedNickname(userinfo.nickname);
  }, [userinfo]);

  return (
    <>
      <div className="w-full overflow-y-scroll h-full pb-[4rem] overflow-x-hidden bg-[#F8F8FA]">
        <div className="px-4">
          <PageHeader pgTitle={"마이페이지"} />
        </div>
        <div className="my-10">
          {!EUItoggle ? (
            <>
              <div className="relative flex justify-center">
                <img
                  className="w-[70px] h-[70px] rounded-full overflow-hidden"
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
              {!myClasses ? (
                <p className="text-sm font-medium text-center">
                  직군을 선택해주세요
                </p>
              ) : null}
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
                    <AlbumIcon />
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
                  className="pl-2.5 py-2 mb-1 border-b-[2px] text-center bg-[#f8f8fa] outline-none focus:border-brandBlue"
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
                      className="text-center text-mg text-gray-400 cursor-pointer peer-checked:text-black "
                    >
                      <p>{c}</p>
                    </label>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className="pt-4 w-full rounded-t-[40px] px-6 pb-10 bg-white drop-shadow-2xl">
          <div className="mt-8">
            <h2 className="text-lg font-bold">
              한줄 소개{" "}
              <button
                className="text-blue-600 ml-2"
                onClick={() => setFolioToggle(!folioToggle)}
              >
                <PencilIcon />
              </button>
            </h2>
            <p className="my-4 ">
              "<span className="break-all font-bold">{myfolio?.title}</span>"
            </p>
          </div>
          <div className="mt-8">
            <h2 className="text-lg font-bold mb-6">보유 스택</h2>
            {myfolio?.stackList.length === 0 ? (
              <>
                <p>
                  스택이 없습니다 추가 하시겠습니까?
                  <button
                    className="text-brandBlue ml-3 font-semibold"
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
                    <PlusIcon />
                  </button>{" "}
                </li>
              </ul>
            )}
          </div>

          <div className="mt-8">
            <p className="text-lg font-bold">
              포트폴리오{" "}
              <button
                className="text-blue-600 ml-2"
                onClick={() => setFolioToggle(!folioToggle)}
              >
                <PencilIcon />
              </button>
            </p>{" "}
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
              ) : (
                <div className="mx-auto relative">
                  <img
                    className="w-14 h-14 border rounded-full"
                    src="https://static.twig.money/images/company/21/wTlJpLE2"
                  />
                  <button
                    onClick={() => setFolioToggle(!folioToggle)}
                    className="bg-black flex justify-center py-5 opacity-60 absolute w-14 h-14 rounded-full top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
                  >
                    <PlusIcon />
                  </button>
                </div>
              )}

              {myfolio?.githubUrl !== "" && myfolio?.githubUrl !== null ? (
                <a
                  className="mx-auto w-14 h-14 bg-gray-300 rounded-full"
                  href={myfolio?.githubUrl}
                >
                  <img
                    className="w-full h-full border rounded-full"
                    src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                  />
                </a>
              ) : (
                <div className="mx-auto relative">
                  <img
                    className="w-14 h-14 border rounded-full"
                    src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                  />
                  <button
                    onClick={() => setFolioToggle(!folioToggle)}
                    className="bg-black flex justify-center py-5 opacity-60 absolute w-14 h-14 rounded-full top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
                  >
                    <PlusIcon />
                  </button>
                </div>
              )}

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
              ) : (
                <div className="mx-auto relative">
                  <img
                    className="w-14 h-14 border rounded-full"
                    src="https://as2.ftcdn.net/v2/jpg/02/44/68/97/1000_F_244689725_wCaHdOOJohF5fDtXvhj4Hid1JvZYqwJc.jpg"
                  />
                  <button
                    onClick={() => setFolioToggle(!folioToggle)}
                    className="bg-black flex justify-center py-5 opacity-60 absolute w-14 h-14 rounded-full top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
                  >
                    <PlusIcon />
                  </button>
                </div>
              )}
            </div>
          </div>

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
          <div className="mt-8 mb-6 py-2">
            <h2 className="text-lg font-bold">나의 북마크</h2>
            {myBookmarks?.map(b => (
              <div className="py-2" key={b.questId}>
                <h3 className="text-xl text-brandBlue">
                  <Link to={`/posts/${b.questId}`}>{b.questTitle}</Link>
                </h3>
              </div>
            ))}
          </div>
        </div>
        <button
          className="text-white font-cookie bg-brandBlue text-lg w-full mt-4 py-6"
          onClick={() => setLogoutTg(!logoutTg)}
        >
          LOGOUT
        </button>
      </div>
      {logoutTg && (
        <YesOrNoModal
          tg={setLogoutTg}
          tgVal={logoutTg}
          onAction={onLogout}
          modalTitle={"벌써 로그아웃하시나요? ㅠㅠ"}
        />
      )}
      {myfolio && (
        <EditPortFolio
          myfolio={myfolio}
          tgVal={folioToggle}
          tg={setFolioToggle}
        />
      )}
      {myfolio && (
        <EditStackPage
          myfolio={myfolio}
          tgVal={stacksToggle}
          tg={setStacksToggle}
        />
      )}
    </>
  );
};
