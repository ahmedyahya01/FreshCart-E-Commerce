import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../LoadingScreen/Loader";
import CreditIcon from "../../assets/images/creditCard.png";
import CashIcon from "../../assets/images/CashIcon.png";
import checkMark from "../../assets/images/checkMark.png";
import InternetAlert from "../InternetAlert/InternetAlert";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
export default function AllOrders() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  function getUserOrders() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${localStorage.getItem(
        "userId"
      )}`
    );
  }
  const { data, isLoading, error } = useQuery({
    queryKey: ["allOrders"],
    queryFn: getUserOrders,
  });

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <InternetAlert />;
  }
  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const allOrders = data?.data;
  return (
    <>
      <Helmet>
        <title>My Orders | FreshCart</title>
        <meta name="description" content="Check your orders on FreshCart." />
        <meta
          name="keywords"
          content="orders, FreshCart, purchase history, track order"
        />
        <meta property="og:title" content="My Orders | FreshCart" />
        <meta
          property="og:description"
          content="Check your orders on FreshCart."
        />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <section id="allOrders" className="py-10">
        <div className="container">
          {allOrders?.length == 0 ? (
            <div className="text-center">
              <h1 className="mb-6 text-xl lg:text-2xl text-center font-semibold">
                Dont't Have Orders Yet, <br /> Start shopping now and enjoy a seamless
                experience!
              </h1>
              <Link
                to="/products"
                className="px-6 py-3 lg:px-8 lg:py-4 text-center rounded-md md:text-lg text-white bg-[#36BB36] hover:bg-[#4fc74f] hover:scale-105 duration-300 "
              >
                <i className="fa-solid fa-cart-shopping me-2"></i>
                Shop Now
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-xl text-center xl:text-2xl font-semibold mb-6">
                All purchased orders
              </h1>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm md:text-base lg:text-lg text-left">
                  <thead className="text-sm lg:text-base uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Order Id
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Products
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Total
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Method
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Shipping Address
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allOrders?.map((order) => (
                      <tr key={order._id} className="bg-white border-b">
                        <td className="px-6 py-2">#{order.id}</td>
                        <td className="px-6 py-2">
                          <div className="w-20">
                            <Slider {...settings}>
                              {order.cartItems.map((product) => (
                                <div className="text-center" key={product._id}>
                                  <img
                                    src={product.product.imageCover}
                                    className="w-full rounded-md"
                                    alt=""
                                  />
                                  <span className="opacity-70 text-base">
                                    Count: {product.count}
                                  </span>
                                </div>
                              ))}
                            </Slider>
                          </div>
                        </td>
                        <td className="px-6 py-2">
                          <div className="flex flex-col">
                            {order.createdAt.slice(0, 10)}
                            <div>{order.createdAt.slice(11, 19)}</div>
                          </div>
                        </td>
                        <td className="px-6 py-2">
                          EGP {order.totalOrderPrice}.00
                        </td>
                        <td className="px-6 py-2">
                          <div className="flex gap-2 items-center">
                            Delivered
                            <img
                              src={checkMark}
                              alt="Delivered"
                              className="w-7"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-2">
                          <div className="flex gap-2">
                            {order.paymentMethodType}
                            {order.paymentMethodType == "cash" ? (
                              <img
                                src={CashIcon}
                                alt="Credit Card"
                                className="w-8"
                              />
                            ) : (
                              <img
                                src={CreditIcon}
                                alt="Credit Card"
                                className="w-7"
                              />
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-2">
                          {order.shippingAddress?.city}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
