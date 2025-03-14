import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loader from "../LoadingScreen/Loader";
import InternetAlert from "../InternetAlert/InternetAlert";
import { cartContext } from "../../context/CartContext";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";
import RelatedProducts from "./Component/RelatedProducts";
import { authContextProvider } from "../../context/AuthContextProvider";
import saleImage from "../../assets/images/sale.png";
import { Helmet } from "react-helmet";

export default function ProductDetails() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  let navigate = useNavigate();
  const { addProductToCart, cartProducts } = useContext(cartContext);
  const [loading, setLoading] = useState(null);
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  const { id, categoryId } = useParams();
  const { token } = useContext(authContextProvider);

  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
  const { data, isError, isLoading } = useQuery({
    queryKey: ["ProductDetails", id],
    queryFn: getProductDetails,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <InternetAlert />;
  }
  const allData = data?.data?.data;

  async function handleAddToCart(id) {
    setLoading(true);
    let flag = null;
    if (token) {
      flag = await addProductToCart(id);
    }
    if (flag) {
      toast.success("Added to cart successfully", {
        position: "top-center",
        duration: 3000,
        className: "md:text-xl",
      });
    } else if (!token) {
      navigate("/login");
    } else {
      toast.error("Add to cart failed, Check intenet", {
        position: "top-center",
        duration: 3000,
        className: "md:text-xl",
      });
    }
    setLoading(false);
  }
  return (
    <>
      <section id="productDetails" className="py-6 lg:py-12">
        <div className="container">
          <div className="lg:flex justify-between items-center lg:gap-10">
            <div className="mb-4 lg:hidden">
              <div className="flex justify-between mb-2 text-sm">
                <span className="bg-[#e6e9e8] px-4 py-1 rounded-lg">
                  {allData.category.name}
                </span>
                <span className="bg-[#F0F3F2] px-4 py-1 rounded-lg">
                  {allData.brand.name}
                </span>
              </div>
              <h2 className="font-semibold leading-snug text-xl md:text-2xl">
                {allData.title}
              </h2>
              <div className="text-xs flex gap-1">
                <span className="bg-[#238123] text-white px-2 rounded-md">
                  {allData.ratingsAverage}
                  <i className="fa-solid fa-star text-yellow-400"></i>
                </span>
                <span>({allData.ratingsQuantity} reviews)</span>
              </div>
            </div>
            <div
              className="slider-contain relative mb-8 mx-auto lg:mb-0 w-[90%]
            sm:w-[70%] md:w-[60%] lg:w-[40%] xl:w-[35%] 2xl:w-[30%]"
            >
              <Slider {...settings} key={id}>
                <div className="outline-none">
                  <img
                    src={allData.images[0]}
                    alt={allData.title}
                    className="w-full px-1 rounded-lg"
                  />
                </div>
                <div className="outline-none">
                  <img
                    src={allData.images[1]}
                    alt={allData.title}
                    className="w-full px-1 rounded-lg"
                  />
                </div>
                <div className="outline-none">
                  <img
                    src={allData.images[2]}
                    alt={allData.title}
                    className="w-full px-1 rounded-lg"
                  />
                </div>
                <div className="outline-none">
                  <img
                    src={allData.images[3]}
                    alt={allData.title}
                    className="w-full px-1 rounded-lg"
                  />
                </div>
              </Slider>
              {allData.priceAfterDiscount ? (
                <img
                  src={saleImage}
                  className="w-12 absolute -top-3 left-1"
                  alt="Sale"
                />
              ) : (
                ""
              )}
            </div>
            <div className="lg:w-1/2">
              <div className="mb-4 hidden lg:block">
                <div className="flex justify-between lg:justify-start lg:gap-3 text-sm">
                  <span className="bg-[#e6e9e8] px-4 py-1 rounded-lg">
                    {allData.category.name}
                  </span>
                  <span className="bg-[#F0F3F2] px-4 py-1 rounded-lg">
                    {allData.brand.name}
                  </span>
                </div>
                <h2 className="font-semibold leading-snug my-3 md:text-lg lg:text-4xl">
                  {allData.title}
                </h2>
                <div className="text-sm flex gap-1">
                  <span className="bg-[#238123] text-white px-2 rounded-md">
                    {allData.ratingsAverage}
                    <i className="fa-solid fa-star text-yellow-400"></i>
                  </span>
                  <span>({allData.ratingsQuantity} reviews)</span>
                </div>
              </div>
              <p className="leading-tight opacity-75 mb-4 md:text-lg">
                {allData.description}
              </p>
              <Helmet>
                <title>{`${allData.title} | FreshCart`}</title>
                <meta name="description" content={allData.description} />
                <meta
                  name="keywords"
                  content={`${allData.category.name}, ${allData.brand.name}, FreshCart, best prices`}
                />
                <meta
                  property="og:title"
                  content={`${allData.title} | FreshCart`}
                />
                <meta property="og:description" content={allData.description} />
                <meta name="robots" content="index, follow" />
              </Helmet>
              <div className="flex my-2 justify-between items-center">
                <div className="flex flex-col">
                  <div className="font-semibold mb-3 text-base md:text-lg">
                    <span>
                      Available:{" "}
                      <span className="font-normal text-[#36BB36]">
                        {allData.quantity} in stock
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mb-5 text-base md:text-lg">
                    <span className="w-8 h-6 bg-[#E6F0FC] rounded-md flex justify-center items-center p-4">
                      <i
                        className="fa-solid fa-truck-fast"
                        style={{ color: "#6888C1" }}
                      ></i>
                    </span>
                    <span>Free Shipping</span>
                  </div>
                  <div className="flex items-center gap-1 text-base md:text-lg">
                    <span className="w-8 h-6 bg-[#E6F0FC] rounded-md flex justify-center items-center p-4">
                      <i
                        className="fa-solid fa-rotate-left bg-[#E6F0FC] rounded-md"
                        style={{ color: "#238123" }}
                      ></i>
                    </span>
                    <span>30 Days return</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold mb-3 text-base md:text-lg">
                    Sold:{" "}
                    <span className="font-normal text-[#36BB36]">
                      {allData.sold} Items
                    </span>
                  </span>
                  <div className="flex items-center gap-1 mb-5 text-base md:text-lg">
                    <span className="w-8 h-6 bg-[#E6F0FC] rounded-md flex justify-center items-center p-4">
                      <i
                        className="fa-solid fa-cube"
                        style={{ color: "#AF95C4" }}
                      ></i>
                    </span>
                    <span>Secure packaging</span>
                  </div>
                  <div className="flex items-center gap-1 text-base md:text-lg">
                    <span className="w-8 h-6 bg-[#E6F0FC] rounded-md flex justify-center items-center p-4">
                      <i
                        className="fa-solid fa-cart-shopping"
                        style={{ color: "#FFD43B" }}
                      ></i>
                    </span>
                    <span>Secure checkout</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 my-3">
                <p
                  className={`font-bold ${
                    allData.priceAfterDiscount
                      ? "line-through opacity-60 text-base lg:text-lg"
                      : "text-xl lg:text-2xl"
                  }`}
                >
                  EGP {allData.price}
                </p>
                {allData.priceAfterDiscount ? (
                  <p className="font-bold text-xl lg:text-2xl">
                    EGP {allData.priceAfterDiscount}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <button
                onClick={() => handleAddToCart(allData.id)}
                disabled={cartProducts.includes(allData.id)}
                className="w-full"
              >
                {cartProducts.includes(allData.id) ? (
                  <div className="flex items-center justify-center gap-2 px-2 py-2 md:px-4 md:py-3 rounded-lg text-white bg-gradient-to-r from-[#333] to-[#777]">
                    <span>Product in cart</span>
                    <i className="fa-solid fa-check"></i>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 px-2 py-2 md:px-4 md:py-3 rounded-lg text-white bg-gradient-to-r from-[#238123] to-[#4FC74F] hover:scale-[1.02] duration-300">
                    {loading ? (
                      <ClipLoader color="white" size={25} />
                    ) : (
                      <i className="fa-solid fa-cart-shopping text-xl"></i>
                    )}
                    <span>Add to cart</span>
                  </div>
                )}
              </button>
            </div>
          </div>
          <div className="mt-16" id="simlarProducts">
            <h2 className="text-xl lg:text-3xl mb-5 font-semibold">
              Similar Products You Might Love!
            </h2>
            <RelatedProducts categoryId={categoryId} />
          </div>
        </div>
      </section>
    </>
  );
}
