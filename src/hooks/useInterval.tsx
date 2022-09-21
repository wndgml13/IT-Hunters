import { useEffect, useRef } from "react";

export const useInterval = (
  callback: () => void,
  delay: number,
  stop: boolean,
) => {
  const savedCallBack = useRef<(() => void) | null>(null);
  useEffect(() => {
    savedCallBack.current = callback;
  }, [callback]);

  function moveNextSlide() {
    savedCallBack.current && savedCallBack.current();
  }

  useEffect(() => {
    if (stop) {
      const interval = setInterval(moveNextSlide, delay);
      clearInterval(interval);
      return;
    }
    if (delay !== null) {
      const interval = setInterval(moveNextSlide, delay);
      return () => {
        clearInterval(interval);
      };
    }
  }, [delay, stop]);
};
