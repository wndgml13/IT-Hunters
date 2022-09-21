import { FeIcon } from "../assets/icons";

interface Props {
  num: number;
  setNum: React.Dispatch<React.SetStateAction<number>>;
  title: string;
}

export const NumMemberGet = ({ num, setNum, title }: Props) => {
  return (
    <>
      <li className="w-[74px] h-[94px] border flex-col align-center justify-center border-black rounded-lg">
        <div className="flex justify-center py-3">
          <FeIcon />
        </div>
        <p className="text-center text-[12px]">{title}</p>
        <div className="flex justify-center">
          <button
            className="text-center text-[16px]"
            onClick={() => {
              if (num > 0) setNum(num - 1);
            }}
          >
            -
          </button>
          <p className="mx-2 text-[12px]">{num}</p>
          <button
            className="text-center text-[16px]"
            onClick={() => {
              if (num < 20) setNum(num + 1);
            }}
          >
            +
          </button>
        </div>
      </li>
    </>
  );
};
