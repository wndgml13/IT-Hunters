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
    <section className="w-full m-auto overflow-y-scroll h-full pb-[3.5rem] overflow-x-hidden">
      <ul className="flex border-1 border relative w-[400%]">
        <li className="w-full border h-[150px]">1</li>
        <li className="w-full border h-[150px]">2</li>
        <li className="w-full border h-[150px]">3</li>
        <li className="w-full border h-[150px]">4</li>
      </ul>
      <ul className="flex gap-[2.666%]">
        <li className="w-[23%] text-center h-[150px] border">프론트엔드</li>
        <li className="w-[23%] text-center h-[150px] border">백엔드</li>
        <li className="w-[23%] text-center h-[150px] border">디자이너</li>
        <li className="w-[23%] text-center h-[150px] border">기획자</li>
      </ul>
      <div>
        <div>
          <h3 className="mb-2 mt-5">현재 인기 퀘스트</h3>
        </div>
        <ul>
          {popularQuests?.map((quest: IQuest) => (
            <Quest
              key={quest.questId}
              quest={quest}
              // bookmarkCnt={quest.bookmarkCnt}
              // classes={quest.classes}
              // commentCnt={quest.commentCnt}
              // content={quest.content}
              // createdAt={quest.createdAt}
              // duration={quest.duration}
              // modifiedAt={quest.modifiedAt}
              // nickname={quest.nickname}
              // questId={quest.questId}
              // stacks={quest.stacks}
              // status={quest.status}
              // title={quest.title}
            />
          ))}
        </ul>
      </div>
      <div>
        <div>
          <h3 className="mb-2 mt-5">현재 올라온 퀘스트</h3>
        </div>
        <ul>
          {recentQuests?.map((quest: IQuest) => (
            <Quest
              key={quest.questId}
              quest={quest}
              // bookmarkCnt={quest.bookmarkCnt}
              // classes={quest.classes}
              // commentCnt={quest.commentCnt}
              // content={quest.content}
              // createdAt={quest.createdAt}
              // duration={quest.duration}
              // modifiedAt={quest.modifiedAt}
              // nickname={quest.nickname}
              // questId={quest.questId}
              // stacks={quest.stacks}
              // status={quest.status}
              // title={quest.title}
            />
          ))}
        </ul>
      </div>
      <div>
        <div>
          <h3 className="mb-2 mt-5">이달의 몬스터</h3>
        </div>
        <ul>
          {monthMonster?.map((monster: IMonthMonster) => (
            <MonthMonster key={monster.nickname} monster={monster} />
          ))}
        </ul>
      </div>
    </section>
  );
};
