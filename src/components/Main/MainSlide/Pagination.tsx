import classNames from "classnames";

export const Pagination = ({
  currentSlideIdx,
  transition,
  slideLength,
  handleSlideStop,
  handleSlideOn,
  handleCurrentSlide,
}: {
  currentSlideIdx: number;
  transition: number;
  slideLength: number;
  handleSlideStop: () => void;
  handleSlideOn: () => void;
  handleCurrentSlide: (idx: number) => void;
}) => {
  const handleTargetSlideIdx = (idx: number) => () => {
    console.log(idx);
    handleCurrentSlide(idx + 1);
  };

  const pageLength = Array.from({ length: slideLength - 2 }, (_, idx) => idx);

  const stopSlideMove = () => {
    handleSlideStop();
  };

  const onSlideMove = () => {
    handleSlideOn();
  };

  return (
    <ul
      className="flex justify-end gap-x-[6px] px-[20px]"
      onMouseEnter={stopSlideMove}
      onMouseLeave={onSlideMove}
    >
      {pageLength.map(idx => (
        <li
          key={idx}
          className={classNames(
            "h-[10px] border border-brandBlue duration-700 transition-all cursor-pointer hover:bg-brandBlue",
            {
              "bg-brandBlue": idx + 1 === currentSlideIdx,
            },
            {
              "bg-brandBlue":
                idx + 1 === 1 && currentSlideIdx === slideLength - 1,
            },
          )}
          style={{
            width: `${
              idx + 1 === currentSlideIdx ||
              (idx + 1 === 1 && currentSlideIdx === slideLength - 1)
                ? "28px"
                : "10px"
            }`,
            borderRadius: `${
              idx + 1 === currentSlideIdx ||
              (idx + 1 === 1 && currentSlideIdx === slideLength - 1)
                ? "5px"
                : "50%"
            }`,
            transition: `${transition}ms`,
          }}
          onClick={handleTargetSlideIdx(idx)}
        ></li>
      ))}
    </ul>
  );
};
