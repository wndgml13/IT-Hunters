import Slider from "react-slick";
import { MonthMonster } from "./MonthMonster";

import { IMonthMonster } from "../../../types/mainpageType";

export const MonthMonsterList = ({
  monthMonster,
}: {
  monthMonster: IMonthMonster[] | undefined;
}) => {
  const settings = {
    className: "center",
    infinite: true,
    centerMode: true,
    centerPadding: "15%",
    slidesToShow: 1,
    speed: 1000,
    // autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    swipe: true,
  };
  return (
    <>
      <Slider {...settings}>
        {monthMonster?.map((monster: IMonthMonster) => (
          <MonthMonster key={monster.nickname} monster={monster} />
        ))}
      </Slider>
    </>
  );
};
