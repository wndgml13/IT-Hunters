import { IMonthMonster } from "../../types/mainpageType";

export const MonthMonster = ({ monster }: { monster: IMonthMonster }) => {
  const { folioTitle, followCnt, nickname, profileImage, stacks } = monster;
  return (
    <li className="flex">
      <div>
        <img src={profileImage} alt="" />
      </div>
      <div>
        <p>
          {folioTitle}
          {followCnt} {stacks}
        </p>
        <p>{nickname}</p>
      </div>
    </li>
  );
};
