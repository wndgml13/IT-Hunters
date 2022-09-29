import {
  ReactIcon,
  JsIcon,
  TsIcon,
  NextIcon,
  VueIcon,
  AngularIcon,
  JavaIcon,
  SpringIcon,
  NodeIcon,
  PythonIcon,
  DjangoIcon,
  CsIcon,
  CpIcon,
  MySqlIcon,
  OracleIcon,
  FigmaIcon,
  AdobeIcon,
  SketchIcon,
  AdobeIlIcon,
  AdobePoIcon,
} from "../../../assets/icons/stack";

export const MonsterStack = ({
  stack,
  index,
}: {
  stack: string;
  index: number;
}) => {
  const iConCss = "w-[29px] h-[29px] rounded-[50%] border";
  interface IStackList {
    [key: string]: number | JSX.Element;
  }
  const stackList: IStackList = {
    Typescript: <TsIcon className={iConCss} />,
    Javascript: <JsIcon className={iConCss} />,
    React: <ReactIcon className={iConCss} />,
    "Vue Js": <VueIcon className={iConCss} />,
    "Next Js": <NextIcon className={iConCss} />,
    "Angular Js": <AngularIcon className={iConCss} />,
    Java: <JavaIcon className={iConCss} />,
    "Spring Boot": <SpringIcon className={iConCss} />,
    "Node Js": <NodeIcon className={iConCss} />,
    Python: <PythonIcon className={iConCss} />,
    Django: <DjangoIcon className={iConCss} />,
    "C++": <CsIcon className={iConCss} />,
    "C#": <CpIcon className={iConCss} />,
    MYSQL: <MySqlIcon className={iConCss} />,
    Oracle: <OracleIcon className={iConCss} />,
    Figma: <FigmaIcon className={iConCss} />,
    "Adobe XD": <AdobeIcon className={iConCss} />,
    Sketch: <SketchIcon className={iConCss} />,
    Illustrator: <AdobeIlIcon className={iConCss} />,
    Photoshop: <AdobePoIcon className={iConCss} />,
  };
  return (
    <li className="bg-white mr-[-13px]" style={{ zIndex: `${20 - index}` }}>
      {stackList[stack]}
    </li>
  );
};
