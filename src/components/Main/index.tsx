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
      <section className="pb-[30px]">
        <MainSlide />
      </section>
      <section className="p-6">
        <div className="mb-[20px]">
          <h3 className="mb-[10px] text-xl font-normal font-cookie">
            함께 하고픈 <span className="text-brandBlue font-cookie">동료</span>
            를 골라봐라!
          </h3>
          <p>검색하고픈 직업을 선택하세요.</p>
        </div>
        <ul className="flex gap-[6.666%] pt-[20px]">
          <li className="w-[20%] text-center">
            <div
              className="p-[56%] bg-center"
              style={{
                background: "center / 100% no-repeat url(/imgs/goBack.png)",
              }}
            ></div>
            <p>고백</p>
          </li>
          <li className="w-[20%] text-center">
            <div
              className="p-[56%] bg-center"
              style={{
                background: "left / 100% no-repeat url(/imgs/puu.png)",
              }}
            ></div>
            <p>퓨</p>
          </li>
          <li className="w-[20%] text-center">
            <div
              className="p-[56%] bg-center"
              style={{
                background: "center / 100% no-repeat url(/imgs/dia.png)",
              }}
            ></div>
            <p>디아</p>
          </li>
          <li className="w-[20%] text-center">
            <div
              className="p-[56%] bg-center"
              style={{
                background: "left / 100% no-repeat url(/imgs/pulls.png)",
              }}
            ></div>
            <p>풀스</p>
          </li>
        </ul>
      </section>
      <section className="bg-[#EFD770] p-6">
        <div className="flex justify-between mb-[10px] items-end">
          <h3 className=" text-xl font-normal font-cookie">
            지금 가장{" "}
            <span className="text-brandBlue font-cookie">인기있는</span> 파티다!
          </h3>
          <button className="text-xs">더보기</button>
        </div>
        <ul className="flex flex-col gap-y-3">
          {popularQuests?.map((quest: IQuest) => (
            <Quest key={quest.mainQuestId} quest={quest} />
          ))}
        </ul>
      </section>
      <section className="p-6 mb-[45px]">
        <div className="flex justify-between mb-[10px] items-end">
          <h3 className=" text-xl font-normal font-cookie">
            지금 모집하는{" "}
            <span className="text-brandBlue font-cookie">최신 파티</span>다!
          </h3>
          <button className="text-xs">더보기</button>
        </div>
        <ul className="flex flex-col gap-y-3">
          {recentQuests?.map((quest: IQuest) => (
            <Quest key={quest.recentQuestId} quest={quest} />
          ))}
        </ul>
      </section>
      <section className=" px-6">
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
