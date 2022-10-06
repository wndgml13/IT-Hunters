import { MonsterStack } from "./MonsterStack";
import { IMonthMonster } from "../../../types/mainpageType";

import { useNavigate } from "react-router-dom";

export const MonthMonster = ({ monster }: { monster: IMonthMonster }) => {
  const navigate = useNavigate();
  const { profileImage, nickname, stacks, folioTitle, id } = monster;

  return (
    <div
      className="w-[220px] px-[10px] py-[10px] cursor-pointer"
      onClick={() => {
        navigate(`/user/${id}`);
      }}
    >
      <div className="w-full flex flex-col items-center rounded-[16px] shadow-[4px_4px_4px_4px_rgba(0,0,0,0.1)] px-[20px]">
        <div
          className="w-[100px] h-[100px] mt-[30px] rounded-2xl border "
          style={{
            background: `center / contain no-repeat url(${profileImage})`,
          }}
        ></div>
        <div className="w-full mt-[20px] mb-[8px]">
          <p className="w-[70%] m-auto text-sm text-center border border-black rounded-[10px] leading-4 px-[13px] line-clamp-1 py-[1px]">
            {nickname}
          </p>
        </div>
        <h3 className="text-center font-cookie line-clamp-1">{folioTitle}</h3>
        <ul className="mb-[14px] flex mt-[12px]">
          {stacks.length !== 0
            ? stacks?.map((stack, idx) => (
                <MonsterStack
                  key={stack.stackName}
                  stack={stack.stackName}
                  index={idx}
                />
              ))
            : null}
        </ul>
      </div>
    </div>
  );
};
