import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../../assets/images/slider-image-1.jpeg";
import img2 from "../../assets/images/slider-image-2.jpeg";
import img3 from "../../assets/images/slider-image-3.jpeg";
import img4 from "../../assets/images/blog-img-1.jpeg";
import img5 from "../../assets/images/blog-img-2.jpeg";
import img6 from "../../assets/images/banner-4.jpeg";
import img7 from "../../assets/images/grocery-banner.png";
import img8 from "../../assets/images/grocery-banner-2.jpeg";
import img9 from "../../assets/images/slider-2.jpeg";

function Fade() {
  const settings = {
    dots: true,
    fade: true,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 1500,
    cssEase: "linear",
  };
  return (
    <div className="slider-container mb-12">
      <Slider {...settings} arrows={false}>
        <div className="outline-none">
          <img
            className="w-full rounded-xl h-[200px] md:h-[300px] lg:h-[420px]"
            src={img1}
          />
        </div>
        <div className="outline-none">
          <img
            className="w-full rounded-xl h-[200px] md:h-[300px] lg:h-[420px]"
            src={img2}
          />
        </div>
        <div className="outline-none">
          <img
            className="w-full rounded-xl h-[200px] md:h-[300px] lg:h-[420px]"
            src={img3}
          />
        </div>
        <div className="outline-none">
          <img
            className="w-full rounded-xl h-[200px] md:h-[300px] lg:h-[420px]"
            src={img4}
          />
        </div>
        <div className="outline-none">
          <img
            className="w-full rounded-xl h-[200px] md:h-[300px] lg:h-[420px]"
            src={img5}
          />
        </div>
        <div className="outline-none">
          <img
            className="w-full rounded-xl h-[200px] md:h-[300px] lg:h-[420px]"
            src={img6}
          />
        </div>
        <div className="outline-none">
          <img
            className="w-full rounded-xl h-[200px] md:h-[300px] lg:h-[420px]"
            src={img7}
          />
        </div>
        <div className="outline-none">
          <img
            className="w-full rounded-xl h-[200px] md:h-[300px] lg:h-[420px]"
            src={img8}
          />
        </div>
        <div className="outline-none">
          <img
            className="w-full rounded-xl h-[200px] md:h-[300px] lg:h-[420px]"
            src={img9}
          />
        </div>
      </Slider>
    </div>
  );
}

export default Fade;
