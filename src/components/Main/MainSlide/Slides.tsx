export const Slides = ({
  slides,
  currentSlideIdx,
  handeSlideInterval,
}: {
  slides: Array<string>;
  currentSlideIdx: number;
  handeSlideInterval: (e: boolean) => void;
}) => {
  return (
    <ul
      className="flex border-1 border relative transition duration-1000"
      style={{
        width: `${slides.length * 100}%`,
        transform: `translateX(-${(100 / slides.length) * currentSlideIdx}%)`,
      }}
      onMouseEnter={() => {
        handeSlideInterval(true);
      }}
      onMouseLeave={() => {
        handeSlideInterval(false);
      }}
    >
      {slides.map((color, idx) => (
        <li
          className="text-white h-[150px]"
          key={idx}
          style={{ background: color, width: `${100 / slides.length}%` }}
        >
          {color}
          {currentSlideIdx}
        </li>
      ))}
    </ul>
  );
};
