import slide1 from "../images/slide1.png";
import slide2 from "../images/slide2.png";
import slide3 from "../images/slide3.png";
import slide4 from "../images/slide4.png";
import slide5 from "../images/slide5.png";
import slide6 from "../images/slide6.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useRef } from "react";

function SlideHome() {
  const sliderRef = useRef(null);
  const settings = {
    infinite: true,
    speed: 400,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className="slider">
        <div className="text-center">
          <Slider ref={sliderRef} {...settings}>
            <div>
              <img src={slide1} className=" img-fluid" alt={slide1} />
            </div>
            <div>
              <img src={slide2} className=" img-fluid" alt={slide2} />
            </div>
            <div>
              <img src={slide3} className=" img-fluid" alt={slide3} />
            </div>
            <div>
              <img src={slide4} className=" img-fluid" alt={slide4} />
            </div>
            <div>
              <img src={slide5} className=" img-fluid" alt={slide5} />
            </div>
            <div>
              <img src={slide6} className=" img-fluid" alt={slide6} />
            </div>
          </Slider>
        </div>
      </div>
    </>
  );
}
export default SlideHome;
