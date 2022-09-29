import { AxiosError } from "axios";
import { useRef, useState } from "react";
import { instance } from "../config/axios";
import { useModal } from "../hooks/useModal";
import { OffersPost } from "../types/postsDetailType";

export const OffersClassesModal = ({
  tgVal,
  tg,
  questId,
}: {
  tgVal: boolean;
  tg: React.Dispatch<React.SetStateAction<boolean>>;
  questId: number | undefined;
}) => {
  const node = useRef<null | HTMLDivElement>(null);

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
      alert("합류요청 완료!!");
      return data;
    } catch (err) {
      if (err instanceof AxiosError) {
        alert(err.response?.data.message);
      }
    }
  };

  const onOfferHandler = () => {
    if (myClasses) {
      offerPost();
    } else {
      alert("직군을 선택해 주세요.");
    }
  };

  useModal({ node, tgVal, tg });
  return (
    <div className="h-full w-full absolute top-0 right-0 left-0 z-50 flex justify-center items-center bg-[#c2c2c2] bg-opacity-80">
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
          <button type="button" className="px-10 " onClick={() => tg(!tgVal)}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};
