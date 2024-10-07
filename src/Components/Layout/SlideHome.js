import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { Link } from "react-router-dom";

function SlideHome() {
  const [images, setImages] = useState([]);
  const getImage = `https://learning-horizon-server.premiumasp.net/Api/Lesson/GetLessonFile?path=`;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `https://learning-horizon-server.premiumasp.net/Api/Slider`
        );
        const data = await res.json();
        if (Array.isArray(data)) {
          setImages(data);
        } else {
          console.error("Unexpected data format:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const sliderRef = useRef(null);

  const settings = useMemo(() => {
    if (images.length <= 1) {
      return {
        infinite: false,
        speed: 1000,
        dots: false,
        autoplay: false,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
    }

    return {
      infinite: true,
      speed: 1000,
      dots: false,
      autoplaySpeed: 4000,
      autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
  }, [images.length]);

  const renderSlides = () => {
    if (images.length === 0) {
      return <p className="text-center fw-bold">No images available</p>;
    }

    return images.map((image) => (
      <div key={image.imagePath}>
        {image.link ? (
          <Link to={image.link} target="blank">
            <img
              className="img-fluid"
              src={`${getImage}${image.imagePath}`}
              alt="Slide_image"
              style={{ cursor: "pointer" }}
            />
          </Link>
        ) : (
          <img
            className="img-fluid"
            src={`${getImage}${image.imagePath}`}
            alt="Slide_image"
            style={{ cursor: "default" }}
          />
        )}
      </div>
    ));
  };

  return (
    <div className="slider mt-3">
      <div className="text-center">
        {images.length > 0 ? (
          <Slider ref={sliderRef} {...settings}>
            {renderSlides()}
          </Slider>
        ) : (
          <p className="text-center fw-bold">No images to display</p>
        )}
      </div>
    </div>
  );
}

export default SlideHome;
