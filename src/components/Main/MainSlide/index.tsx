import { useEffect, useState } from "react";

import { useSetSlide } from "../../../hooks/useSetSlide";
import { useInterval } from "../../../hooks/useInterval";
import { Slides } from "./Slides";
import { Pagination } from "./Pagination";

export const MainSlide = () => {
  const [currentSlideIdx, setCurrentSlideIdx] = useState(1);
  const [isSlideStop, setIsSlideStop] = useState(false);
  const [isTransition, setIstransition] = useState(false);
  const slideConfig = {
    slideItems: useSetSlide(["#33a", "#8c9", "#f3e074"]),
    delay: 2000,
    transition: 1000,
  };

  const handleSlide = (index: number) => {
    if (currentSlideIdx >= slideConfig.slideItems.length - 1) {
      setIstransition(true);
      setCurrentSlideIdx(1);
      setTimeout(() => {
        setIsSlideStop(false);
        setIstransition(false);
      }, 10);
      return;
    }
    setCurrentSlideIdx(index);
  };

  useInterval(
    () => {
      handleSlide(currentSlideIdx + 1);
    },
    !isSlideStop && !isTransition ? slideConfig.delay : null,
  );

  const handleSlideStop = () => {
    setIsSlideStop(true);
  };

  const handleSlideOn = () => {
    setIsSlideStop(false);
  };

  return (
    <>
      <Slides
        slideItems={slideConfig.slideItems}
        currentSlideIdx={currentSlideIdx}
        transition={!isTransition ? slideConfig.transition : 0}
        handleSlideStop={handleSlideStop}
        handleSlideOn={handleSlideOn}
      />
      <Pagination
        currentSlideIdx={currentSlideIdx}
        transition={slideConfig.transition}
        slideLength={slideConfig.slideItems.length}
        handleSlideStop={handleSlideStop}
        handleSlideOn={handleSlideOn}
        handleCurrentSlide={handleSlide}
      />
    </>
  );
};
