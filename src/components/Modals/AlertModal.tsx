import { useRef } from "react";
import { useModal } from "../../hooks/useModal";

type alertPropsType = {
  alertContent: string;
  tg: React.Dispatch<React.SetStateAction<boolean>>;
  tgVal: boolean;
};

export const AlertModal = ({ alertContent, tg, tgVal }: alertPropsType) => {
  const node = useRef<null | HTMLDivElement>(null);

  useModal({ node, tgVal, tg });
  return (
    <div className="h-full w-full absolute top-0 right-0 left-0 z-[9999] flex justify-center bg-[#c2c2c2] bg-opacity-50">
      <div
        className="bg-[#ffffff] mt-5 px-6 w-[90%]  border rounded-xl absolute shadow-2xl "
        ref={node}
      >
        <p className="text-[18px] font-normal font-cookie mt-5 ">
          {alertContent}
        </p>

        <div className="flex justify-end">
          <button
            className="font-cookie text-brandBlue my-3"
            onClick={() => tg(!tgVal)}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};
