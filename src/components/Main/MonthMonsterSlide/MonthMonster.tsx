import { MonsterStack } from "./MonsterStack";
import { IMonthMonster } from "../../../types/mainpageType";

export const MonthMonster = ({ monster }: { monster: IMonthMonster }) => {
  const { profileImage, nickname, stacks, folioTitle } = monster;

  return (
    <div className="w-[220px] px-[10px] py-[10px]">
      <div className="w-full flex flex-col items-center rounded-[16px] shadow-[4px_4px_4px_0_rgba(0,0,0,0.1)] px-[20px]">
        <div
          className="w-[100px] h-[100px] mt-[30px]"
          style={{
            background: `center / contain no-repeat url(${profileImage})`,
          }}
        ></div>
        <div className="w-full mt-[20px] mb-[8px]">
          <p className="w-[70%] m-auto text-sm text-center border border-black rounded-[10px] leading-4 px-[13px] line-clamp-1 py-[1px]">
            {nickname}
          </p>
        </div>
        <h3 className="text-center font-cookie">{folioTitle}</h3>
        <ul className="mb-[14px]">
          {stacks.length !== 0
            ? stacks?.map(stack => (
                <MonsterStack key={stack.stackName} stack={stack.stackName} />
              ))
            : null}
        </ul>
      </div>
    </div>
  );
};
