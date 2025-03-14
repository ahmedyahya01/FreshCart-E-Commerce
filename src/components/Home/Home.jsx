import React, { useEffect } from "react";
import banner from "../../assets/images/banner2.jpg";
import { Link } from "react-router-dom";
import CategoriesSlider from "./../CategorySlider/CategorySlider";
import { Helmet } from "react-helmet";

export default function Home() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <>
      <Helmet>
        <title>Home | FreshCart</title>
        <meta
          name="description"
          content="Discover the best products at unbeatable prices on FreshCart. Shop now for exclusive deals and fast delivery!"
        />
        <meta
          name="keywords"
          content="FreshCart, ecommerce, online shopping, best deals, discounts, electronics, fashion, grocery"
        />
        <meta property="og:title" content="Home | FreshCart" />
        <meta
          property="og:description"
          content="Discover the best products at unbeatable prices on FreshCart. Shop now for exclusive deals and fast delivery!"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <section id="home" className="py-16">
        <div className="container">
          <div className="lg:flex items-center">
            <div className="lg:w-1/2 text-center lg:text-start">
              <h1 className="font-bold text-2xl md:text-4xl xl:text-5xl md:leading-normal xl:leading-normal tracking-wide mb-3">
                Shop now & save big! <br /> Up to 35% OFF!
              </h1>
              <p className="mb-7 font-bold opacity-60">
                Don't Wait - Limited Stock at unbeatable Price!
              </p>
              <Link
                to="/products"
                className="px-6 py-3 lg:px-14 lg:py-4 rounded-md md:text-lg text-white bg-[#36BB36] hover:bg-[#4fc74f] hover:scale-105 duration-300 "
              >
                <i className="fa-solid fa-cart-shopping me-2"></i>
                Shop Now
              </Link>
            </div>
            <div className="lg:w-1/2 text-center mt-5 lg:mt-0">
              <img
                src={banner}
                className="mx-auto w-full rounded-lg"
                alt="ecommerce"
              />
            </div>
          </div>
          <CategoriesSlider />
        </div>
      </section>
    </>
  );
}
