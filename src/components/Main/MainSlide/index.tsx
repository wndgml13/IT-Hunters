import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

export const MainSlide = () => {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "25px",
    slidesToShow: 1,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    dots: true,
    arrows: false,
    touchMove: true,
  };
  return (
    <>
      <Slider {...settings}>
        <div>
          <div className="px-[5px] ">
            <Link to="/event">
              <img src="/imgs/event_3.png" alt="슬라이드 이벤트" />
            </Link>
          </div>
        </div>
        <div>
          <div className="px-[5px] h-[230px]">
            <Link to="/event">
              <img src="/imgs/event_2.png" alt="슬라이드 이벤트" />
            </Link>
          </div>
        </div>
      </Slider>
    </>
  );
};
