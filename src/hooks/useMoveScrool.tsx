import { useRef } from "react";

export const useMoveScroolLocation = () => {
  const elementLocation = useRef<HTMLDivElement>(null);
  const onMoveToElementLocation = () => {
    elementLocation.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  return { elementLocation, onMoveToElementLocation };
};
export const useMoveScroolStack = () => {
  const elementStack = useRef<HTMLDivElement>(null);
  const onMoveToElementStack = () => {
    elementStack.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  return { elementStack, onMoveToElementStack };
};
export const useMoveScroolInfo = () => {
  const elementInfo = useRef<HTMLDivElement>(null);
  const onMoveToElementInfo = () => {
    elementInfo.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return { elementInfo, onMoveToElementInfo };
};
