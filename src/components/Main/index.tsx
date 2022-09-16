import { MonthMonster } from "./MonthMonster";
import { Quest } from "../Quest";

import { mainPageAPis } from "../../APIs/mainPageApis";

import { IMonthMonster } from "../../types/mainpageType";
import { IQuest } from "../../types/questType";

export const Main = () => {
  const { data: recentQuests }: { data: undefined | IQuest[] } =
    mainPageAPis.getRecentQuests();

  const { data: monthMonster }: { data: undefined | IMonthMonster[] } =
    mainPageAPis.getMonthMonter();

  const { data: popularQuests }: { data: undefined | IQuest[] } =
    mainPageAPis.getPopularQuests();

  return (
    <main className="w-full m-auto overflow-y-scroll h-full pb-[3.5rem] overflow-x-hidden">
      <ul className="flex border-1 border relative w-[400%]">
        <li className="w-full border h-[150px]">1</li>
        <li className="w-full border h-[150px]">2</li>
        <li className="w-full border h-[150px]">3</li>
        <li className="w-full border h-[150px]">4</li>
      </ul>
      <div className="px-6 flex gap-y-[45px] flex-col">
        <ul className="flex gap-[2.666%]">
          <li className="w-[23%] text-center h-[150px] border">프론트엔드</li>
          <li className="w-[23%] text-center h-[150px] border">백엔드</li>
          <li className="w-[23%] text-center h-[150px] border">디자이너</li>
          <li className="w-[23%] text-center h-[150px] border">기획자</li>
        </ul>
        <div>
          <div>
            <h3 className="mb-[10px] text-xl font-normal">
              지금 가장 <span className="text-brandBlue">인기있는</span> 파티다!
            </h3>
          </div>
          <ul>
            {popularQuests?.map((quest: IQuest) => (
              <Quest key={quest.mainQuestId} quest={quest} />
            ))}
          </ul>
        </div>
        <div>
          <div>
            <h3 className="mb-[10px] text-xl font-normal">
              지금 모집하는 <span className="text-brandBlue">최신 파티</span>다!
            </h3>
          </div>
          <ul>
            {recentQuests?.map((quest: IQuest) => (
              <Quest key={quest.recentQuestId} quest={quest} />
            ))}
          </ul>
        </div>
        <div>
          <div>
            <h3 className="mb-[10px] text-xl font-normal">
              <span className="text-brandBlue">이달의 몬스터</span>다! 잘
              확인하도록.
            </h3>
          </div>
          <ul>
            {monthMonster?.map((monster: IMonthMonster) => (
              <MonthMonster key={monster.nickname} monster={monster} />
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
};
