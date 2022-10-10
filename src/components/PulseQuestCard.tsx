export const PulseQuestCard = () => {
  return (
    <li
      className={`flex gap-x-[15px]  p-6 my-3 border-b border-[#ebebeb] animate-pulse`}
    >
      <div className="w-[66px]">
        <div className="rounded-[7px] mb-[6px] w-[66px] h-[66px] bg-slate-300"></div>
        <div className="w-[66px] h-3 rounded-xl bg-slate-300"></div>
      </div>
      <div className="flex-1  flex flex-col gap-y-[3px] relative w-[60%]">
        <div className="h-5 w-full bg-slate-300 rounded-xl"></div>
        <div className="h-5 w-20 bg-slate-300 rounded-xl"></div>
        <div className="flex gap-x-1">
          <div className="w-8 h-8 bg-slate-300 rounded-full"></div>
          <div className="w-8 h-8 bg-slate-300 rounded-full"></div>
          <div className="w-8 h-8 bg-slate-300 rounded-full"></div>
        </div>
      </div>{" "}
    </li>
  );
};
