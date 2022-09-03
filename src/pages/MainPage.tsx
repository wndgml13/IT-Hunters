interface mainPage {
  questId: number;
  avatarImage: string;
  title: string;
  position: string;
  minPrice: number;
  maxPrice: number;
  expiredDate: Date;
  type: string;
}

export const MainPage = () => {
  return (
    <section className="w-[375px] m-auto overflow-hidden">
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
        <h3>현재 올라온 퀘스트</h3>
        <ul>
          <li></li>
        </ul>
      </div>
      <div>
        <h3>이달의 용병단</h3>
      </div>
    </section>
  );
};
