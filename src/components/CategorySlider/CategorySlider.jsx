import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useAllCategories from "../../CustomHooks/useAllCategories";
import { Link } from "react-router-dom";

function Responsive() {
  const { data, isLoading, isError } = useAllCategories();
  if (isLoading) {
    return <></>;
  }
  if (isError) {
    return <></>;
  }
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 10,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  const allData = data?.data?.data;
  return (
    <div className="slider-container pb-12 pt-6">
      {data ? (
        <h3 className="text-2xl text-[#555] font-semibold mb-3">
          Shop Popular Categories
        </h3>
      ) : null}
      <Slider {...settings} arrows={false}>
        {allData?.map((category) => {
          return (
            <Link key={category._id} to={`/SpecificCategory/${category._id}`}>
              <div
                key={category._id}
                className="px-1 mb-7 flex flex-col items-center justify-center outline-none"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-40 h-40"
                />
                <p className="mt-2 text-center text-sm">{category.name}</p>
              </div>
            </Link>
          );
        })}
      </Slider>
    </div>
  );
}
export default Responsive;
