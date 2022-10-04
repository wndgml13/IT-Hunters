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
    <div className="h-full w-full absolute top-0 right-0 left-0 z-50 flex justify-center items-center bg-[#c2c2c2] bg-opacity-80">
      <div className="bg-white px-4 py-3 rounded-lg relative" ref={node}>
        <div className="flex my-10 gap-3 px-10">
          {/* <span className="bg-red-400 text-white px-4 py-1 font-bold text-lg rounded-full">
            !
          </span> */}
          <p className="text-xl font-normal font-cookie">{alertContent}</p>
        </div>
        <button
          className="absolute right-2 top-2 font-cookie"
          onClick={() => tg(!tgVal)}
        >
          X
        </button>
      </div>
    </div>
  );
};
