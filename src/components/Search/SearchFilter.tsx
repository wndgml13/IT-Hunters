import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { filterState } from "../../store/filterState";
import { modalState } from "../../store/modalState";

export const SearchFilter = () => {
  const setModal = useSetRecoilState(modalState);

  const [classes, setClasses] = useState<string[]>([]);
  const [stacks, setStacks] = useState<string[]>([]);
  const [duration, setDuration] = useState<number>(20);
  const setFilter = useSetRecoilState(filterState);

  const frontStackData = [
    { stack: "React" },
    { stack: "Vue Js" },
    { stack: "Javascript" },
    { stack: "TypeScript" },
    { stack: "Next Js" },
    { stack: "Angular Js" },
  ];

  const onClassesHandelr = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setClasses(prev => [...prev, e.target.value]);
    } else {
      setClasses(classes.filter(el => el !== e.target.value));
    }
  };

  const onStacksHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setStacks(prev => [...prev, e.target.value]);
    } else {
      setStacks(stacks.filter(el => el !== e.target.value));
    }
  };

  const onDurationHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (parseInt(e.target.value) > 0) {
      setDuration(parseInt(e.target.value));
    }
  };

  const onSubmitFilter = () => {
    const classQuery = classes.map(c => "classType=" + c);
    const stackQuery = stacks.map(s => "stack=" + s);
    const durationQuery = "duration=" + duration;
    const queryString = [...classQuery, ...stackQuery, durationQuery].join("&");

    console.log(queryString);
    setFilter(queryString);
    setModal(false);
  };

  const classStyle =
    "inline-flex justify-between items-center p-3 w-full  rounded-lg border border-gray-200 cursor-pointer peer-checked:ring-blue-500 peer-checked:ring-2 peer-checked:border-transparent";

  const stackStyle =
    "inline-flex justify-between items-center p-2 w-full  rounded-lg border border-gray-200 cursor-pointer peer-checked:ring-blue-500 peer-checked:ring-2 peer-checked:border-transparent";

  return (
    <div className="h-screen w-full fixed top-0 right-0 left-0 z-50 flex justify-center items-center bg-black bg-opacity-70">
      <div className="fixed inset-x-0 bottom-0 bg-white h-4/5 z-50 rounded-t-2xl">
        <div className="fixed right-6 w-3">
          <button
            type="button"
            className=" hover:bg-gray-200 text-2xl pt-6"
            onClick={() => setModal(false)}
          >
            <span>X</span>
          </button>
        </div>

        <div className="p-6 space-y-6">
          <h1 className="text-3xl">직업군</h1>
          <ul className="grid gap-2 w-ful grid-cols-2">
            <li>
              <input
                type="checkbox"
                className="sr-only peer"
                value="frontend"
                id="Frontend"
                checked={classes.includes("frontend") ? true : false}
                onChange={e => onClassesHandelr(e)}
              />
              <label className={classStyle} htmlFor="Frontend">
                <p>Frontend</p>
              </label>
            </li>
            <li>
              <input
                type="checkbox"
                className="sr-only peer"
                value="backend"
                id="Backend"
                checked={classes.includes("backend") ? true : false}
                onChange={e => onClassesHandelr(e)}
              />
              <label className={classStyle} htmlFor="Backend">
                <p>Backend</p>
              </label>
            </li>
            <li>
              <input
                type="checkbox"
                className="sr-only peer"
                value="designer"
                id="Designer"
                checked={classes.includes("designer") ? true : false}
                onChange={e => onClassesHandelr(e)}
              />
              <label className={classStyle} htmlFor="Designer">
                <p>Designer</p>
              </label>
            </li>
            <li>
              <input
                type="checkbox"
                className="sr-only peer"
                value="fullstack"
                id="Fullstack"
                checked={classes.includes("fullstack") ? true : false}
                onChange={e => onClassesHandelr(e)}
              />
              <label className={classStyle} htmlFor="Fullstack">
                <p>FullStack</p>
              </label>
            </li>
          </ul>
        </div>
        <div className="p-6 pt-1 space-y-6">
          <h1 className="text-3xl">스택</h1>
          <ul className="grid gap-1 w-ful grid-cols-3">
            {frontStackData?.map(fsd => (
              <li>
                <input
                  type="checkbox"
                  className="sr-only peer"
                  value={fsd.stack}
                  id={fsd.stack}
                  checked={stacks.includes(fsd.stack) ? true : false}
                  onChange={e => onStacksHandler(e)}
                />
                <label className={stackStyle} htmlFor={fsd.stack}>
                  <p>{fsd.stack}</p>
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-6 pt-1 space-y-6">
          <h1 className="text-3xl">기간</h1>
          <input
            type="number"
            min="0"
            max="20"
            value={duration}
            onChange={onDurationHandler}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
          />
        </div>

        <div className="flex  items-center w-100  space-x-2 text-gray-200">
          <button
            type="button"
            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium fixed bottom-0 w-full h-[3rem] text-sm px-5 py-2.5 text-center"
            onClick={onSubmitFilter}
          >
            필터적용
          </button>
        </div>
      </div>
    </div>
  );
};
