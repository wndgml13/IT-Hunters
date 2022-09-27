import { useEffect, useRef } from "react";

export const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallBack = useRef<(() => void) | null>(null);
  useEffect(() => {
    savedCallBack.current = callback;
  }, [callback]);

  const handleMoveSlide = () => {
    savedCallBack.current?.();
  };
  useEffect(() => {
    if (delay !== null) {
      const interval = setInterval(handleMoveSlide, delay);
      return () => {
        clearInterval(interval);
      };
    }
  }, [delay]);
};
