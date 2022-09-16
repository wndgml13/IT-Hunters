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
    <main className="w-full m-auto overflow-y-scroll h-full pb-[4rem] overflow-x-hidden">
      <section className="mb-[30px]">
        <ul className="flex border-1 border relative w-[400%]">
          <li className="w-full border h-[150px]">1</li>
          <li className="w-full border h-[150px]">2</li>
          <li className="w-full border h-[150px]">3</li>
          <li className="w-full border h-[150px]">4</li>
        </ul>
      </section>
      <div className="px-6 flex gap-y-[45px] flex-col">
        <section>
          <div className="mb-[20px]">
            <h3 className="mb-[10px] text-xl font-normal font-cookie">
              함께 하고픈{" "}
              <span className="text-brandBlue font-cookie">동료</span>를
              골라봐라!
            </h3>
            <p>검색하고픈 직업을 선택하세요.</p>
          </div>
          <ul className="flex gap-[2.666%]">
            <li className="w-[23%] text-center h-[150px] border">고백</li>
            <li className="w-[23%] text-center h-[150px] border">퓨</li>
            <li className="w-[23%] text-center h-[150px] border">디아</li>
            <li className="w-[23%] text-center h-[150px] border">풀스</li>
          </ul>
        </section>
        <section>
          <div className="flex justify-between">
            <h3 className="mb-[10px] text-xl font-normal font-cookie">
              지금 가장{" "}
              <span className="text-brandBlue font-cookie">인기있는</span>{" "}
              파티다!
            </h3>
            <button className="text-xs">더보기</button>
          </div>
          <ul>
            {popularQuests?.map((quest: IQuest) => (
              <Quest key={quest.mainQuestId} quest={quest} />
            ))}
          </ul>
        </section>
        <section>
          <div className="flex justify-between">
            <h3 className="mb-[10px] text-xl font-normal font-cookie">
              지금 모집하는{" "}
              <span className="text-brandBlue font-cookie">최신 파티</span>다!
            </h3>
            <button className="text-xs">더보기</button>
          </div>
          <ul>
            {recentQuests?.map((quest: IQuest) => (
              <Quest key={quest.recentQuestId} quest={quest} />
            ))}
          </ul>
        </section>
        <section className="mb-[54px]">
          <div className="flex justify-between">
            <h3 className="mb-[18px] text-xl font-normal font-cookie">
              <span className="text-brandBlue font-cookie">이달의 몬스터</span>
              다! 잘 확인하도록.
            </h3>
            <button className="text-xs">더보기</button>
          </div>
          <ul className="flex gap-x-[21px]">
            {monthMonster?.map((monster: IMonthMonster) => (
              <MonthMonster key={monster.nickname} monster={monster} />
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
};
