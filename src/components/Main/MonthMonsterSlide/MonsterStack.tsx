import {
  ReactIcon,
  TsIcon,
  JsIcon,
  NextIcon,
} from "../../../assets/icons/stack";

export const MonsterStack = ({ stack }: { stack: string }) => {
  const iConCss = "w-[29px] h-[29px] rounded-[50%] border";
  interface IStackList {
    [key: string]: number | JSX.Element;
  }
  const stackList: IStackList = {
    Typescript: <TsIcon className={iConCss} />,
    Javascript: <JsIcon className={iConCss} />,
    React: <ReactIcon className={iConCss} />,
    "Vue Js": 1,
    "Next Js": <NextIcon className={iConCss} />,
    "Angular Js": 1,
    Java: 1,
    "Spring Boot": 1,
    "Node Js": 1,
    Python: 1,
    Django: 1,
    "C++": 1,
    "C#": 1,
    MYSQL: 1,
    Oracle: 1,
    Figma: 1,
    "Adobe XD": 1,
    Sketch: 1,
    Illustrator: 1,
    Photoshop: 1,
  };
  console.log(stackList["TypeScript"]);
  return <li>{stackList[stack]}</li>;
};
