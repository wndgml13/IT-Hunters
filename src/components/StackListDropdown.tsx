import React, { useState } from "react";

interface props {
  stacks: string[];
  setStacks: React.Dispatch<React.SetStateAction<string[]>>;
}
// 여기도 컴포넌트 정리 필요할듯
export const StackListDropdwon = ({ stacks, setStacks }: props) => {
  const [FStoggle, setFStoggle] = useState(false);
  const [BStoggle, setBStoggle] = useState(false);
  const [DStoggle, setDStoggle] = useState(false);

  const frontStackData = [
    "React",
    "Vue Js",
    "Javascript",
    "TypeScript",
    "Next Js",
    "Angular Js",
  ];
  const backStackData = [
    "Java",
    "Spring Boot",
    "Node Js",
    "Python",
    "Django",
    "C++",
    "C#",
    "MYSQL",
    "Oracle",
  ];
  const designStackData = [
    "Figma",
    "Adobe XD",
    "Sketch",
    "Illustrator",
    "Photoshop",
  ];

  const onStacksHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setStacks(prev => [...prev, e.target.value]);
    } else {
      setStacks(stacks.filter(el => el !== e.target.value));
    }
  };
  return (
    <div className="my-8 pt-1 space-y-6">
      <>
        <h2
          className="text-[14px] cursor-pointer"
          onClick={() => setFStoggle(!FStoggle)}
        >
          프론트엔드 &gt;
        </h2>
        {FStoggle ? (
          <ul className="grid gap-1 w-full grid-cols-3">
            {frontStackData?.map((fsd, idx) => (
              <li key={idx}>
                <input
                  type="checkbox"
                  className="sr-only peer"
                  value={fsd}
                  id={fsd}
                  checked={stacks.includes(fsd) ? true : false}
                  onChange={e => onStacksHandler(e)}
                />
                <label
                  htmlFor={fsd}
                  className="inline-flex p-2 w-full text-[14px] text-gray-300 border border-gray-300 cursor-pointer peer-checked:text-blue-500 peer-checked:ring-blue-500 peer-checked:ring-1 peer-checked:border-transparent"
                >
                  <p>{fsd}</p>
                </label>
              </li>
            ))}
          </ul>
        ) : null}
      </>
      <>
        <h2
          className="text-[14px] cursor-pointer"
          onClick={() => setBStoggle(!BStoggle)}
        >
          백엔드 &gt;
        </h2>
        {BStoggle ? (
          <ul className="grid gap-1 w-full grid-cols-3">
            {backStackData?.map((bsd, idx) => (
              <li key={idx}>
                <input
                  type="checkbox"
                  className="sr-only peer"
                  value={bsd}
                  id={bsd}
                  checked={stacks.includes(bsd) ? true : false}
                  onChange={e => onStacksHandler(e)}
                />
                <label
                  htmlFor={bsd}
                  className="inline-flex p-2 w-full text-[14px] text-gray-300 border border-gray-300 cursor-pointer peer-checked:text-blue-500 peer-checked:ring-blue-500 peer-checked:ring-1 peer-checked:border-transparent"
                >
                  <p>{bsd}</p>
                </label>
              </li>
            ))}
          </ul>
        ) : null}
      </>
      <>
        <h2
          className="text-[14px] cursor-pointer"
          onClick={() => setDStoggle(!DStoggle)}
        >
          디자이너 &gt;
        </h2>
        {DStoggle ? (
          <ul className="grid gap-1 w-full grid-cols-3">
            {designStackData?.map((dsd, idx) => (
              <li key={idx}>
                <input
                  type="checkbox"
                  className="sr-only peer"
                  value={dsd}
                  id={dsd}
                  checked={stacks.includes(dsd) ? true : false}
                  onChange={e => onStacksHandler(e)}
                />
                <label
                  htmlFor={dsd}
                  className="inline-flex p-2 w-full text-[14px] text-gray-300 border border-gray-300 cursor-pointer peer-checked:text-blue-500 peer-checked:ring-blue-500 peer-checked:ring-1 peer-checked:border-transparent"
                >
                  <p>{dsd}</p>
                </label>
              </li>
            ))}
          </ul>
        ) : null}
      </>
    </div>
  );
};
