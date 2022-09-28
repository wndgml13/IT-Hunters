import { RefObject, useEffect } from "react";

export const useModal = ({
  node,
  tgVal,
  tg,
}: {
  node: RefObject<HTMLElement>;
  tgVal: boolean;
  tg: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  useEffect(() => {
    const clickOutside = (e: MouseEvent): void => {
      if (
        e.target instanceof HTMLElement &&
        !node.current?.contains(e.target as Node)
      ) {
        tg(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [tgVal]);
};
