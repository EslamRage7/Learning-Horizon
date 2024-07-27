import lesson from "../images/lesson.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useRef } from "react";

function SlideMaterial() {
  const sliderRef = useRef(null);
  const settings = {
    infinite: true,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className="slider">
        <div className="text-center">
          <Slider ref={sliderRef} {...settings}>
            <div className="p-2">
              <img src={lesson} className=" img-fluid" alt={lesson} />
            </div>
            <div className="p-2">
              <img src={lesson} className=" img-fluid" alt={lesson} />
            </div>
            <div className="p-2">
              <img src={lesson} className=" img-fluid" alt={lesson} />
            </div>
            <div className="p-2">
              <img src={lesson} className=" img-fluid" alt={lesson} />
            </div>
          </Slider>
        </div>
      </div>
    </>
  );
}
export default SlideMaterial;
