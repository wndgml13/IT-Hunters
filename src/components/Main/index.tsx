import { Quest } from "../Quest";
import { MainSlide } from "./MainSlide";
import { MonthMonsterList } from "./MonthMonsterSlide/MonthMonsterList";

import { mainPageAPis } from "../../APIs/mainPageApis";

import { IMonthMonster } from "../../types/mainpageType";
import { IQuest } from "../../types/questType";
import { getCookieToken } from "../../config/cookies";
import { Link } from "react-router-dom";

export const Main = () => {
  const { data: recentQuests }: { data: undefined | IQuest[] } =
    mainPageAPis.getRecentQuests();

  const { data: popularQuests }: { data: undefined | IQuest[] } =
    mainPageAPis.getPopularQuests();

  const { data: monthMonster }: { data: undefined | IMonthMonster[] } =
    mainPageAPis.getMonthMonter();

  return (
    <main className="w-full m-auto overflow-y-scroll h-[calc(100%-100px)] overflow-x-hidden">
      <section className="pb-[30px]">
        <MainSlide />
      </section>
      {!getCookieToken() ? (
        <div className="bg-brandBlue mx-6 py-6 rounded-lg">
          <p className="text-white text-center font-cookie text-xl px-12">
            함께 IT괴물을 무찌를 용맹한 <br />
            몬스터를 모집한다! 지원하겠는가?{" "}
          </p>
          <div className="flex justify-center mt-4">
            <Link
              to="/signin"
              className="bg-white text-xl font-cookie rounded-3xl text-brandBlue py-2 px-12 "
            >
              로그인하기
            </Link>
          </div>
        </div>
      ) : null}
      <section></section>
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
            <p>백엔드</p>
          </li>
          <li className="w-[20%] text-center">
            <div
              className="p-[56%] bg-center"
              style={{
                background: "left / 100% no-repeat url(/imgs/puu.png)",
              }}
            ></div>
            <p>프론트</p>
          </li>
          <li className="w-[20%] text-center">
            <div
              className="p-[56%] bg-center"
              style={{
                background: "center / 100% no-repeat url(/imgs/dia.png)",
              }}
            ></div>
            <p>디자이너</p>
          </li>
          <li className="w-[20%] text-center">
            <div
              className="p-[56%] bg-center"
              style={{
                background: "left / 100% no-repeat url(/imgs/pulls.png)",
              }}
            ></div>
            <p>풀스택</p>
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
        <MonthMonsterList monthMonster={monthMonster} />
      </section>
    </main>
  );
};
