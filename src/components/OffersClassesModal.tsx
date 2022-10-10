import { AxiosError } from "axios";
import { useRef, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { instance } from "../config/axios";
import { useModal } from "../hooks/useModal";
import { alertState, onAlertState } from "../store/alertState";
import { OffersPost } from "../types/postsDetailType";

export const OffersClassesModal = ({
  cmTg,
  setCmTg,
  questId,
}: {
  cmTg: boolean;
  setCmTg: React.Dispatch<React.SetStateAction<boolean>>;
  questId: number | undefined;
}) => {
  const node = useRef<null | HTMLDivElement>(null);

  const [tgVal, tg] = useRecoilState(onAlertState); // 알러트 true/false
  const setAlertContent = useSetRecoilState(alertState); // 알러트 내용

  interface IClassList {
    [key: string]: string;
  }

  const classStyle =
    "place-content-center inline-flex px-3 py-2 rounded-lg text-[14px] text-gray-400 w-full border border-gray-400 cursor-pointer peer-checked:font-semibold peer-checked:text-brandBlue peer-checked:ring-brandBlue peer-checked:ring-2 peer-checked:border-transparent";

  const classesList: IClassList = {
    프론트엔드: "FRONTEND",
    백엔드: "BACKEND",
    디자이너: "DESIGNER",
    풀스택: "FULLSTACK",
  };

  const classes = ["프론트엔드", "백엔드", "디자이너", "풀스택"];
  const [myClasses, setMyClasses] = useState("");

  const offerPost = async () => {
    try {
      const { data } = await instance.post<OffersPost>(
        `api/quests/${questId}/offers`,
        { classType: classesList[myClasses] },
      );
      setCmTg(!cmTg); // 합류요청 시 모달창 닫기
      tg(!tgVal);
      setAlertContent("합류요청 완료!!");
      return data;
    } catch (err) {
      if (err instanceof AxiosError) {
        setCmTg(!cmTg); // 합류요청 시 모달창 닫기
        tg(!tgVal);
        setAlertContent(err.response?.data.message);
      }
    }
  };

  const onOfferHandler = () => {
    if (myClasses) {
      offerPost();
    } else {
      setCmTg(!cmTg);
      tg(!tgVal);
      setAlertContent("직군을 선택해 주세요.");
    }
  };

  useModal({ node, tgVal: cmTg, tg: setCmTg });
  return (
    <div className="absolute top-0 right-0 left-0 h-full w-full z-50 flex justify-center items-center bg-[#c2c2c2] bg-opacity-80">
      <div className="bg-white px-8 py-3 rounded-lg shadow-lg" ref={node}>
        <p className="text-xl font-normal font-cookie text-center mt-4">
          직군 선택
        </p>
        <ul className="grid grid-cols-2 gap-x-2 mt-5 gap-y-2">
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
              <label htmlFor={c} className={classStyle}>
                <p>{c}</p>
              </label>
            </li>
          ))}
        </ul>
        <div className="flex justify-between mt-6 mb-[10px] ">
          <button
            type="button"
            className="px-10 text-brandBlue"
            onClick={onOfferHandler}
          >
            선택
          </button>
          <button
            type="button"
            className="px-10 "
            onClick={() => setCmTg(!cmTg)}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};
