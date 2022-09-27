import { MonthMonster } from "./MonthMonster";
import { Quest } from "../Quest";
import { MainSlide } from "./MainSlide";

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
    <main className="w-full m-auto overflow-y-scroll h-[calc(100%-100px)] overflow-x-hidden">
      <section className="mb-[30px]">
        <MainSlide />
      </section>
      <section className="px-6 mb-[45px]">
        <div className="mb-[20px]">
          <h3 className="mb-[10px] text-xl font-normal font-cookie">
            함께 하고픈 <span className="text-brandBlue font-cookie">동료</span>
            를 골라봐라!
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
      <section className="bg-[#EFD770] p-6  mb-[45px]">
        <div className="flex justify-between mb-[10px] items-end">
          <h3 className=" text-xl font-normal font-cookie">
            지금 가장{" "}
            <span className="text-brandBlue font-cookie">인기있는</span> 파티다!
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
        <div className="flex justify-between mb-[10px] items-end">
          <h3 className=" text-xl font-normal font-cookie">
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
      <section className="mb-[54px] px-6">
        <div className="flex justify-between mb-[18px] items-end">
          <h3 className="text-xl font-normal font-cookie">
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
    </main>
  );
};
