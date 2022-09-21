import { useState } from "react";

import { useSetSlide } from "../../../hooks/useSetSlide";
import { useInterval } from "../../../hooks/useInterval";
import { Slides } from "./Slides";
import { Pagination } from "./Pagination";

export const MainSlide = () => {
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const [handleSlideInterval, setHandleSlideInterval] =
    useState<boolean>(false);
  const slides = useSetSlide(["#33a", "#8c9", "#f3e074"]);
  const delay = 2000;

  const handleMoveTargetSlide = (idx: number) => {
    console.log(idx);
    setCurrentSlideIdx(idx);
    setHandleSlideInterval(true);
    setTimeout(() => {
      setHandleSlideInterval(false);
    }, 1);
  };
  useInterval(
    () => {
      if (currentSlideIdx === slides.length - 1) {
        setCurrentSlideIdx(0);
        return;
      }
      setCurrentSlideIdx(currentSlideIdx => currentSlideIdx + 1);
    },
    delay,
    handleSlideInterval,
  );
  const handeSlideInterval = (interval: boolean) => {
    setHandleSlideInterval(interval);
  };
  return (
    <>
      <Slides
        slides={slides}
        currentSlideIdx={currentSlideIdx}
        handeSlideInterval={handeSlideInterval}
      />
      <Pagination
        slidesLength={slides.length}
        currentSlideIdx={currentSlideIdx}
        targetSlide={handleMoveTargetSlide}
      />
    </>
  );
};
