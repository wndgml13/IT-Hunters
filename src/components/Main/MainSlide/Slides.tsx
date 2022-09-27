export const Slides = ({
  slideItems,
  currentSlideIdx,
  transition,
  handleSlideStop,
  handleSlideOn,
}: {
  slideItems: Array<string>;
  currentSlideIdx: number;
  transition: number;
  handleSlideStop: () => void;
  handleSlideOn: () => void;
}) => {
  const stopSlideMove = () => {
    handleSlideStop();
  };

  const onSlideMove = () => {
    handleSlideOn();
  };

  return (
    <ul
      className="flex border-1 border relative transition"
      style={{
        width: `${slideItems.length * 100}%`,
        transition: `${transition}ms`,
        transform: `translateX(-${
          (100 / slideItems.length) * currentSlideIdx
        }%)`,
      }}
      onMouseEnter={() => {
        stopSlideMove();
      }}
      onMouseLeave={() => {
        onSlideMove();
      }}
    >
      {slideItems.map((color, idx) => (
        <li
          className="text-white h-[150px]"
          key={idx}
          style={{
            background: color,
            width: `${100 / slideItems.length}%`,
          }}
        >
          {color}
          {currentSlideIdx}
        </li>
      ))}
    </ul>
  );
};
