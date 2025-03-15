import React, { useContext, useEffect, useState } from "react";
import { addressProvider } from "../../context/AddressContext";
import Loader from "../LoadingScreen/Loader";
import { cartContext } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authContextProvider } from "../../context/AuthContextProvider";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
export default function CheckOut() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const navigate = useNavigate();
  const { name } = useContext(authContextProvider);
  const { allAddresses } = useContext(addressProvider);
  const [changeAddressColor, setChangeAddressColor] = useState(false);
  const [loading, setLoding] = useState(false);
  const [onlineLoading, setOnlineLoding] = useState(false);
  const { allProducts, totalCartPrice, cartId, getUserCart, setCartProducts } =
    useContext(cartContext);
  const [selectedAddress, setSelectedAddress] = useState(false);

  async function createCashOrder() {
    setLoding(true);
    try {
      const res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        {
          shippingAddress: {
            details: selectedAddress.details,
            phone: selectedAddress.phone,
            city: selectedAddress.city,
          },
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      localStorage.removeItem("Cart");
      setCartProducts([]);
      toast.success("Purchased successfully", {
        position: "bottom-right",
        duration: 3000,
        className: "md:text-xl",
      });
      setTimeout(() => {
        navigate("/allOrders");
        getUserCart();
      }, 1000);
    } catch (error) {
      console.log(error);
    }
    setLoding(false);
  }
  async function createOnlinePayment() {
    setOnlineLoding(true);
    try {
      const res = await axios.post(
        // `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
        // `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://fresh-cart-e-commerce-beta.vercel.app/`,
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://freshcart-ecommerce1.netlify.app/#/`,
        {
          shippingAddress: {
            details: selectedAddress.details,
            phone: selectedAddress.phone,
            city: selectedAddress.city,
          },
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      window.open(res.data.session.url);
      localStorage.removeItem("Cart");
      setCartProducts([]);
    } catch (error) {
      console.log(error);
    }
    setOnlineLoding(false);
  }

  return (
    <>
      <Helmet>
        <title>Checkout | FreshCart</title>
        <meta
          name="description"
          content="Securely complete your purchase on FreshCart with multiple payment options."
        />
        <meta
          name="keywords"
          content="checkout, payment, FreshCart, online shopping"
        />
        <meta property="og:title" content="Checkout | FreshCart" />
        <meta
          property="og:description"
          content="Securely complete your purchase on FreshCart with multiple payment options."
        />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      {allProducts ? (
        <section id="OrderSummary" className="py-8">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-xl lg:text-2xl text-center pb-3 font-semibold border-b">
                Review Your Order and Complete Payment
              </h1>
              <h2 className="md:text-lg text-center font-semibold mt-5 lg:mt-3 mb-2 lg:mb-1">
                Choose your delivery location
              </h2>
              {allAddresses.length == 0 ? (
                <div className="text-center">
                  <p className="mb-5 text-lg md:text-xl font-semibold ">
                    Dont't Have Addresses Yet
                  </p>
                  <Link
                    to={"/AddUserAddress"}
                    className="text-white disabled:opacity-70 bg-[#4FC74F] focus:outline-none font-medium rounded-lg text-sm md:text-base px-5 py-2.5 text-center"
                  >
                    Add Address
                  </Link>
                </div>
              ) : (
                ""
              )}
              <div className="grid md:grid-cols-3 gap-3 border-b pb-3">
                {allAddresses.map((address) => (
                  <div
                    key={address._id}
                    onClick={() => {
                      setChangeAddressColor(address),
                        setSelectedAddress(address);
                    }}
                    className={`${
                      changeAddressColor == address
                        ? "bg-[#248224] text-white"
                        : "bg-[#F0F3F2]"
                    } rounded-md border py-2 px-5 text-opacity-100 lg:text-lg text-center cursor-pointer hover:border-[#248224] duration-200`}
                  >
                    <span className="font-semibold">{name}</span> {address.city}
                    , {address.name}, {address.phone}, {address.details}
                  </div>
                ))}
              </div>
              {allProducts ? (
                <div className="relative overflow-auto shadow-md rounded-lg">
                  <table className="w-full text-sm md:text-base lg:text-lg xl:text-xl text-left rtl:text-right text-gray-500">
                    <thead className="text-sm md:text-base lg:text-lg text-gray-700 uppercase dark:bg-gray-700"></thead>
                    <tbody>
                      {allProducts?.map((product) => {
                        return (
                          <tr
                            key={product._id}
                            className="bg-white flex justify-around items-center border-b border-gray-200"
                          >
                            <td>
                              <img
                                src={product.product.imageCover}
                                className="w-24 lg:w-16 max-w-full max-h-full"
                                alt={product.product.title}
                              />
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                              <div className="opacity-70 text-xs lg:text-sm">
                                {product.product.brand.name}
                              </div>
                              {product.product.title
                                .split(" ")
                                .slice(0, 3)
                                .join(" ")}
                            </td>
                            <td className="px-6 py-4 text-base text-gray-900 dark:text-white">
                              X{product.count}
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                              EGP {product.price * product.count}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <span>Loading...</span>
              )}
              <div className="py-3 px-3 flex justify-between">
                <span className="text-lg font-semibold md:text-lg lg:text-2xl">
                  Total
                </span>
                <span className="text-lg font-semibold md:text-lg lg:text-2xl">
                  EGP {totalCartPrice}
                </span>
              </div>
              {selectedAddress == null ? (
                <div
                  className="mb-2 lg:mb-5 text-base lg:text-xl text-center text-red-800 rounded-lg"
                  role="alert"
                >
                  <span className="font-medium">
                    Please Choose your delivery location
                  </span>
                </div>
              ) : (
                ""
              )}
              <div className="flex flex-col md:flex-row gap-2">
                <Link
                  to={"/Products"}
                  className="px-2 flex justify-center items-center gap-1 text-[rgba(0,0,0,80%)] py-2 md:text-lg lg:text-xl bg-[#F0F3F2] border rounded-md duration-300 md:w-1/3"
                >
                  <i className="fa-solid fa-arrow-left"></i> Back to shopping
                </Link>
                <button
                  onClick={() => {
                    selectedAddress == false
                      ? setSelectedAddress(null)
                      : createCashOrder();
                  }}
                  className="px-2 py-2 md:text-lg lg:text-xl bg-[#36BB36] hover:bg-[#4FC74F] text-[rgba(255,255,255,90%)] rounded-md duration-300 md:w-1/3"
                >
                  {loading ? "Loading..." : " Buy In Cash"}
                </button>
                <button
                  onClick={() => {
                    selectedAddress == false
                      ? setSelectedAddress(null)
                      : createOnlinePayment();
                  }}
                  className="px-2 py-2 md:text-lg lg:text-xl bg-[#36BB36] hover:bg-[#4FC74F] text-[rgba(255,255,255,90%)] rounded-md duration-300 md:w-1/3"
                >
                  {onlineLoading ? "Loading..." : "Buy with Visa"}
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <Loader />
      )}
    </>
  );
}
