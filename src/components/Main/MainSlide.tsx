import { useState } from "react";
import classNames from "classnames";

export const MainSlide = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = ["#33a", "#8c9", "#f3e074"];

  const onMoveTargetSlide = (idx: number) => () => {
    setCurrentSlide(idx);
  };
  return (
    <>
      <ul
        className="flex border-1 border relative transition"
        style={{
          width: `${slides.length * 100}%`,
          transform: `translateX(-${(100 / slides.length) * currentSlide}%)`,
        }}
        onClick={() => {
          setCurrentSlide(prev => prev + 1);
        }}
      >
        {slides.map((color, idx) => (
          <li
            className="text-white"
            key={color}
            style={{ background: color, width: `${100 / slides.length}%` }}
          >
            {idx}
            {currentSlide}
          </li>
        ))}
      </ul>
      <ul className="flex justify-end gap-x-[6px] px-[20px]">
        {slides.map((color, idx) => (
          <li
            key={color}
            className={classNames(
              "h-[10px] border border-brandBlue duration-700 transition-all",
              {
                "bg-brandBlue": idx === currentSlide,
              },
            )}
            style={{
              width: `${idx === currentSlide ? "20px" : "10px"}`,
              borderRadius: `${idx === currentSlide ? "5px" : "50%"}`,
            }}
            onClick={onMoveTargetSlide(idx)}
          ></li>
        ))}
      </ul>
    </>
  );
};
