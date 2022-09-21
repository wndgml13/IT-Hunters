import classNames from "classnames";

export const Pagination = ({
  slidesLength,
  currentSlideIdx,
  targetSlide,
}: {
  slidesLength: number;
  currentSlideIdx: number;
  targetSlide: (targetIdx: number) => void;
}) => {
  const handleTargetSlideIdx = (idx: number) => () => {
    targetSlide(idx + 1);
  };

  const pageLength = Array.from({ length: slidesLength - 2 }, (_v, i) => i);

  return (
    <ul className="flex justify-end gap-x-[6px] px-[20px]">
      {pageLength.map(idx => (
        <li
          key={idx}
          className={classNames(
            "h-[10px] border border-brandBlue duration-700 transition-all cursor-pointer hover:bg-brandBlue",
            {
              "bg-brandBlue": idx + 1 === currentSlideIdx,
            },
          )}
          style={{
            width: `${idx + 1 === currentSlideIdx ? "20px" : "10px"}`,
            borderRadius: `${idx + 1 === currentSlideIdx ? "5px" : "50%"}`,
          }}
          onClick={handleTargetSlideIdx(idx)}
        ></li>
      ))}
    </ul>
  );
};
