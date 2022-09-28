import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
          <div className="px-[5px]">
            <a
              className="block"
              href="https://forms.gle/YtXASLtocaJmGFRj7"
              target={"_blank"}
            >
              <img src="/imgs/slides.png" alt="슬라이드 이벤트" />
            </a>
          </div>
        </div>
        <div>
          <div className="px-[5px]">
            <img src="/imgs/slides.png" alt="슬라이드 이벤트" />
          </div>
        </div>
        <div>
          <div className="px-[5px]">
            <img src="/imgs/slides.png" alt="슬라이드 이벤트" />
          </div>
        </div>
      </Slider>
    </>
  );
};
