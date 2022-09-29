import { useRef } from "react";
import { useModal } from "../hooks/useModal";

export const DeletePostModal = ({
  tgVal,
  tg,
  onDelete,
}: {
  tgVal: boolean;
  tg: React.Dispatch<React.SetStateAction<boolean>>;
  onDelete: () => void;
}) => {
  const node = useRef<null | HTMLDivElement>(null);

  useModal({ node, tgVal, tg });
  return (
    <div className="h-full w-full absolute top-0 right-0 left-0 z-50 flex justify-center items-center bg-[#c2c2c2] bg-opacity-80">
      <div className="bg-white px-4 py-3 rounded-lg" ref={node}>
        <p className="text-xl font-normal font-cookie px-16 mt-4">
          삭제하겠는가?
        </p>
        <div className="flex justify-between mt-6 ">
          <button
            type="button"
            className="px-10 text-red-600"
            onClick={onDelete}
          >
            확인
          </button>
          <button type="button" className="px-10 " onClick={() => tg(!tgVal)}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};
